# TECHNICAL ARCHITECTURE SPECIFICATION: MODUL AJAR PRO

**Document Version:** 2.0.0  
**Status:** Approved for Implementation  
**Author:** Technical Architecture & System Planning Agent  
**Last Updated:** August 10, 2026  
**Reference Specification:** [MASTER_SPECIFICATION.md](file:///C:/Projects/Modulajarpro/MASTER_SPECIFICATION.md) (v2.0.0)

---

## 1. System Overview

**Modul Ajar Pro** is an AI-powered SaaS web application engineered for teachers to generate, edit, version, and print curriculum-agnostic educational documents. The architecture combines Next.js App Router (UI & Client-facing application layer), Supabase (PostgreSQL, Auth, RLS, and Edge Functions for asynchronous worker queues), and the Gemini API (Structured Output mode). 

The application strictly separates presentation from execution, treats LLM responses as untrusted data requiring Zod normalization and server sanitization, and implements multi-tenant isolation at the database level.

---

## 2. End-to-End V1 Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           BROWSER / CLIENT UI                           │
│                                                                         │
│  - React Server Components (RSC): Fast metadata listing & Read views    │
│  - Client Components (CSR): Form Wizard, Structured Block Editor        │
│  - Local Draft Recovery Cache: Unsubmitted inputs cached in localStorage │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                       NEXT.JS APPLICATION LAYER                         │
│                                                                         │
│  - Route Handlers & Server Actions: Authed Session Guard, Input Limits   │
│  - API Endpoint: POST /api/generate ──► Validates User, Checks Active Job│
│    Creates `generation_jobs` Row ──► Invokes Supabase Edge Function     │
│    Returns HTTP 202 + `jobId` immediately to Client                     │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (Async HTTP Webhook / Invocation)
┌────────────────────────────────────▼────────────────────────────────────┐
│                  SUPABASE EDGE FUNCTION (AI WORKER)                     │
│                                                                         │
│  - State Machine Transition: Moves job `pending` ──► `processing`       │
│  - Call IAIService Adapter (Gemini API with `responseSchema`)           │
│  - Output Validation: Zod Schema Parse & Default Normalization          │
│  - Server Sanitization: HTML & Text Safety Purify                       │
│  - Persistence: Writes `document_versions` snapshot                     │
│  - Completion: Moves job `processing` ──► `completed` / `failed`        │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    │                                 │
┌───────────────────▼──────────────┐       ┌──────────▼───────────────────┐
│     SUPABASE POSTGRES (RLS)      │       │     EXTERNAL AI PROVIDER      │
│                                  │       │                              │
│  - RLS Policies (Parent Check)   │       │  - Gemini API                │
│  - `documents`, `versions`       │       │    (Structured JSON Mode)    │
│  - `generation_jobs` State Store │       │                              │
└──────────────────────────────────┘       └──────────────────────────────┘
```

---

## 3. Asynchronous AI Generation Architecture

### 3.1 Edge Function Delegation Model

To eliminate execution container freeze timeouts inherent in Vercel Serverless Function HTTP handlers during long-running LLM API calls (15–30s latency), the asynchronous generation pipeline delegates execution to **Supabase Edge Functions**.

#### Execution Lifecycle
1. **Client Submission:** Client POSTs educational input payload to `POST /api/generate`.
2. **Next.js API Handler Validation:**
   - Validates user authentication via `@supabase/ssr`.
   - Validates input size against maximum limits (e.g., max 2,000 characters).
   - Queries `generation_jobs` to verify the user has no currently active jobs (`pending` or `processing`).
3. **Job Registration:** Inserts a record in `generation_jobs` (`status = 'pending'`, `idempotency_key`, `stale_after`).
4. **Edge Function Invocation:** Next.js invokes the Supabase Edge Function asynchronously (`supabase.functions.invoke('generate-document', { body: { jobId } })`) and returns `HTTP 202 Accepted` with `{ jobId }` immediately.
5. **Edge Function Execution:**
   - Updates `generation_jobs` status to `processing` and sets `started_at = NOW()`.
   - Calls the Gemini API via the `IAIService` abstraction layer.
   - Parses LLM output through the Zod schema and server sanitization layer.
   - Writes the new document version to `document_versions`.
   - Updates `generation_jobs` status to `completed`, attaching `response_payload` and telemetry metrics (`execution_time_ms`, `completion_tokens_est`).
6. **Client Status Polling:** Client polls `GET /api/jobs/[id]` or listens via Supabase Realtime until `completed` or `failed`.

---

## 4. Generation Job State Machine & Telemetry

### 4.1 State Transition Graph

```
           ┌──────────┐
           │ pending  │
           └────┬─────┘
                │
         ┌──────┴──────┐
         │             │
         ▼             ▼
  ┌────────────┐  ┌──────────┐
  │ processing │  │  failed  │
  └──────┬─────┘  └──────────┘
         │             ▲
         ├─────────────┘
         ▼
  ┌────────────┐
  │ completed  │
  └────────────┘
```

#### Transition Rules
- `pending → processing`: Set when the Edge Function begins execution.
- `processing → completed`: Terminal state set when validation, sanitization, and DB save succeed.
- `processing → failed`: Terminal state set upon LLM timeout, Zod failure, or unhandled exception.
- `pending → failed`: Set if the job is stale or rejected before processing starts.
- **Strict Rule:** Terminal states (`completed`, `failed`) are immutable and cannot transition back to `processing`.

---

## 5. Idempotency & Rate Limiting Controls

### 5.1 Single Active Job Enforcement
To prevent cost explosion, resource exhaustion, and race conditions, the database schema and API layer enforce that **a single user may have at most ONE active generation job (`pending` or `processing`) at any time**.

- **API Layer Guard:** Before inserting into `generation_jobs`, the route handler checks:
  ```sql
  SELECT COUNT(id) FROM generation_jobs 
  WHERE user_id = auth.uid() AND status IN ('pending', 'processing') AND stale_after > NOW();
  ```
  If count > 0, the request is rejected immediately with `429 Too Many Requests` (`failure_code = 'DUPLICATE_REQUEST'`).
- **Database Level Guard:** A PostgreSQL partial unique index prevents duplicate active jobs per user:
  ```sql
  CREATE UNIQUE INDEX idx_single_active_job_per_user 
  ON generation_jobs (user_id) 
  WHERE status IN ('pending', 'processing');
  ```

### 5.2 Application Input Limits
- **Max Input Length:** 2,000 characters per text input field.
- **Max Input Sections:** 10 target sections per document generation request.
- **Max Job Execution Time:** `stale_after` set to `NOW() + INTERVAL '120 seconds'`.

---

## 6. Standardized Application Failure Codes

When a job enters the `failed` state, the `failure_code` column is populated with a standardized enum so the UI can render actionable context:

| Failure Code | Description | User Action / UI Guidance |
| :--- | :--- | :--- |
| `DUPLICATE_REQUEST` | An active generation job is already running. | "Please wait for your current document generation to complete." |
| `RATE_LIMITED` | User/IP has exceeded generation quota limits. | "Generation quota reached. Please try again later." |
| `INVALID_INPUT` | Input payload failed initial validation. | "Please check your inputs and ensure they meet criteria." |
| `PROMPT_TOO_LARGE` | Input text exceeds maximum character caps. | "Your input is too long. Please shorten your topic description." |
| `AI_API_ERROR` | Upstream Gemini API returned an error or 5xx code. | "AI Service unavailable. Retrying recommended." |
| `AI_TIMEOUT` | Upstream Gemini API call timed out. | "AI Service took too long to respond. Please try again." |
| `SCHEMA_VALIDATION_FAILED`| AI generated an invalid document structure. | "AI generated an invalid document structure. Retrying..." |
| `SANITIZATION_FAILED` | Generated content failed security XSS sanitization checks. | "Security validation failed on generated content." |
| `JOB_TIMEOUT` | Job exceeded `stale_after` threshold without completion. | "Generation timed out. Inputs preserved in local draft." |
| `UNKNOWN_ERROR` | Unhandled system exception during processing. | "An unexpected error occurred. Please try again." |

---

## 7. Database Security & Relational Architecture

### 7.1 Entity Relational Diagram

```
  ┌───────────────┐               ┌───────────────────┐
  │  auth.users   │ 1 ───────── 1 │     profiles      │
  └───────┬───────┘               └───────────────────┘
          │
          │ 1
          │
          ├───────────────────────┐
          │ N                     │ N
  ┌───────▼───────┐       ┌───────▼──────────┐
  │   documents   │       │ generation_jobs  │
  └───────┬───────┘       └──────────────────┘
          │ 1
          │
          │ N
  ┌───────▼──────────┐
  │document_versions │
  └──────────────────┘
```

### 7.2 Conceptual SQL Schema & Cascade Deletions

```sql
-- 1. PROFILES TABLE
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  school_name TEXT,
  role TEXT DEFAULT 'teacher',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles self access" ON profiles FOR ALL USING (auth.uid() = id);

-- 2. DOCUMENTS TABLE
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  curriculum_template_id TEXT NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('modul_ajar', 'lkpd', 'assessment')),
  title TEXT NOT NULL,
  educational_metadata JSONB NOT NULL,
  content JSONB NOT NULL, -- Current active DocumentSection[]
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own documents" ON documents FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_documents_user_list ON documents (user_id, updated_at DESC);

-- 3. DOCUMENT VERSIONS TABLE (WITH PARENT OWNERSHIP CHAIN)
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('ai_initial', 'user_save', 'auto_save')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;

-- Parent Ownership Chain RLS Policy: Ensures user owns both version AND parent document
CREATE POLICY "Users can read own document versions" ON document_versions 
  FOR SELECT USING (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM documents WHERE id = document_versions.document_id AND user_id = auth.uid())
  );

CREATE POLICY "Users can insert own document versions" ON document_versions 
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM documents WHERE id = document_versions.document_id AND user_id = auth.uid())
  );

-- 4. GENERATION JOBS TABLE (SINGLE ACTIVE JOB & TELEMETRY)
CREATE TABLE generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  request_payload JSONB NOT NULL,
  response_payload JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  failure_code TEXT,
  failure_message TEXT,
  attempt_count INT DEFAULT 0,
  prompt_tokens_est INT,
  completion_tokens_est INT,
  execution_time_ms INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  stale_after TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '120 seconds'),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own generation jobs" ON generation_jobs FOR ALL USING (auth.uid() = user_id);

-- Enforce Single Active Job per User
CREATE UNIQUE INDEX idx_single_active_job_per_user 
ON generation_jobs (user_id) 
WHERE status IN ('pending', 'processing');
```

---

## 8. Version Numbering Concurrency Strategy

To eliminate client-side race conditions when incrementing `version_number`, the application relies on a **Database Trigger** that automatically calculates the next version number atomically upon insertion:

```sql
CREATE OR REPLACE FUNCTION set_next_version_number()
RETURNS TRIGGER AS $$
BEGIN
  SELECT COALESCE(MAX(version_number), 0) + 1 
  INTO NEW.version_number
  FROM document_versions
  WHERE document_id = NEW.document_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_version_number
BEFORE INSERT ON document_versions
FOR EACH ROW EXECUTE FUNCTION set_next_version_number();
```

---

## 9. Server-Side HTML & Text Sanitization

AI-generated content and user-edited content blocks must be sanitized on the server before database insertion or HTML rendering.

- **V1 Recommended Package:** `isomorphic-dompurify` (works seamlessly across Serverless Edge Functions, Next.js Server Components, and client browser environments).
- **Sanitization Rule:** Plain text input fields strip all HTML tags; rich-text sections allow strictly safe markup (`<b>`, `<i>`, `<ul>`, `<ol>`, `<li>`, `<p>`, `<h3>`, `<table>`, `<tr>`, `<td>`, `<th>`).

---

## 10. Open Technical Decisions (`DECISION REQUIRED`)

Only implementation dependency choices remain:

| ID | Topic | Description | Status |
| :--- | :--- | :--- | :--- |
| **DEC-01** | **Client Polling Interval** | Set status polling frequency (e.g., 2000ms intervals vs. Supabase Realtime subscription). | `DECISION REQUIRED` |
| **DEC-02** | **Sanitization Library Verification** | Validate `isomorphic-dompurify` bundler compatibility inside Deno-based Supabase Edge Functions. | `DECISION REQUIRED` |

---

## 11. Final V1 Architecture Decisions

1. **Next.js App Router:** Presentation & Server Action authentication layer.
2. **Supabase Auth:** HTTP-only secure cookie session management.
3. **Supabase PostgreSQL & RLS:** Multi-tenant isolation with parent-child ownership validation chains.
4. **Supabase Edge Functions:** Dedicated background worker execution to bypass serverless timeouts.
5. **Gemini API:** V1 LLM provider via `IAIService` adapter interface using JSON Structured Output.
6. **Zod & `isomorphic-dompurify`:** Untrusted AI output schema parsing and server HTML sanitization.
7. **Single Active Job Guard:** Database index enforcing maximum 1 pending/processing job per user.
8. **Automated DB Versioning:** Postgres trigger calculating atomic `version_number` increments.
9. **Native Browser Print View:** Print export handled via `@media print` print stylesheets.
10. **Client Draft Recovery:** Caching unsubmitted user forms in `localStorage`.
11. **Unified Telemetry:** Single `generation_jobs` table storing status, state machine timestamps, and token usage (no separate `generation_logs` table in V1).

---
*End of Technical Architecture Specification.*
