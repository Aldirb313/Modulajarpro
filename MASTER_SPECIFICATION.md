# MASTER SPECIFICATION: MODUL AJAR PRO

**Document Version:** 2.0.0  
**Status:** Architecture & Specification Phase (Revised)  
**Author:** Product Architect & Technical Planning Agent  
**Last Updated:** August 10, 2026  

---

## 1. Product Overview

**Modul Ajar Pro** is an AI-powered SaaS web application engineered to empower teachers and educators by automating the creation of standardized, high-quality educational documents. By adopting the philosophy **"Guru Mengajar, AI Menyiapkan Semuanya"** (Teachers Teach, AI Prepares Everything), Modul Ajar Pro streamlines administrative overhead, reducing document preparation time by up to 90% while ensuring pedagogical rigor.

---

## 2. Product Vision

To become the indispensable digital copilot for educators, offering an end-to-end workspace where lesson plans, student worksheets, assessments, and presentation materials can be generated via structured AI prompts, seamlessly edited in a structured interface, saved securely, and printed or exported.

---

## 3. Target Users

### Primary Users
- **K-12 Teachers & Educators** (Primary, Junior High, Senior High, Vocational Schools / SD, SMP, SMA, SMK).
- **Instructional Designers & School Coordinators**.

### User Attributes & Expectations
- Varying levels of digital literacy; requires clean, intuitive UI with minimal cognitive load.
- Operates under national curriculum guidelines or institution-specific standards.
- Requires full control and editability over AI-generated content before deployment in classrooms.

---

## 4. Goals

1. **Automation with Control:** Provide fast AI generation while treating all AI outputs as editable drafts.
2. **Modular Architecture:** Build an extensible, curriculum-agnostic system that supports new document types, AI models, and curriculum changes without foundational refactoring.
3. **Data Security & Privacy:** Ensure strict multi-tenant user data isolation via Supabase Auth and Row Level Security (RLS).
4. **Structured AI Generation:** Enforce strict JSON schema responses and Zod validation from the AI engine to guarantee consistent, renderable document structures.
5. **High Ergonomics:** Offer a streamlined workflow from prompt input to preview, editing, persistence, and print views.

---

## 5. Non-Goals (Out of Scope for Initial Releases)

1. **Automated Grading & LMS Integration:** Modul Ajar Pro will not automatically grade student submissions or sync directly with Google Classroom/Canvas in V1.
2. **Live Classroom Collaboration:** Real-time multi-user co-editing (WebSocket CRDTs/Yjs) is out of scope for V1.
3. **Unchecked Fully Autonomous Publishing:** Content will never be published or finalized without explicit teacher review and manual confirmation.
4. **Custom Fine-Tuned Local LLMs:** V1 relies on managed cloud API services (Gemini API) rather than self-hosted model infrastructure.
5. **Section-Level AI Regeneration:** In-line micro-regeneration of isolated paragraphs is deferred past V1.
6. **Direct DOCX Server-Side Export:** Server-side Word document generation is deferred to V2.

---

## 6. V1 Scope (First Development Milestone)

The first operational vertical slice for V1 will focus strictly on delivering an end-to-end workflow for:

1. **Modul Ajar (Lesson Plans)** using a default curriculum template.

Architectural support will be in place for **LKPD** and **Questions / Assessment**, but full implementation for these two document types will follow directly after the initial *Modul Ajar* slice is verified.

### Supporting V1 Capabilities
- Supabase-based Email & Password authentication.
- Workspace Dashboard & Document Management (My Documents).
- Structured prompt input form with local draft persistence (recovery).
- Asynchronous AI generation workflow (Job Status pattern).
- Gemini-powered backend draft generation using structured JSON schemas.
- Untrusted AI output validation & schema normalization.
- Structured section/block editor for reviewing and editing content.
- Document persistence (Save, Read, Update, Delete) per user.
- Document versioning & snapshot history (`document_versions`).
- Read-only print view with CSS print stylesheets (`window.print()`).
- Basic account deletion & document purging (data privacy control).

---

## 7. Future Scope (V2+)

- **Expansion of Document Types:** LKPD/LKP and Assessment/Questions generators fully integrated into UI workflows.
- **Presentation Materials Generator:** Automated generation of slide decks (Markdown / PPTX format).
- **Interactive Learning Media:** Dynamic quizzes, flashcards, or interactive web widgets.
- **Advanced Server-Side Export Engines:** Server-side export to formatted `.docx` and styled `.pdf`.
- **Dynamic Database Curriculum Preset Library:** Database-backed CP/ATP lookup tables for automatic form completion.
- **Institutional / School Accounts:** School-wide licensing, document sharing within departments, and principal approval workflows.
- **Section-Level In-Line AI Re-prompting:** Granular regeneration of specific document subsections.

---

## 8. User Journey

### 8.1 Core V1 User Journey

```
[ Landing Page ]
       │
       ▼
[ Register / Login ] ──► (Supabase Auth)
       │
       ▼
[ Dashboard ] ──► (View recent document cards - metadata only)
       │
       ▼
[ Create Modul Ajar ] ──► (Select Curriculum Template)
       │
       ▼
[ Input Form ] ──► (Enter Subject, Grade, Topic, Duration; inputs saved locally)
       │
       ▼
[ Submit Generation Job ] ──► (Creates generation_job record, status = pending)
       │
       ▼
[ Asynchronous AI Pipeline ] ──► (Prompt Adapter ──► Gemini ──► Zod Validation ──► Job Completed)
       │
       ▼
[ Progress & Status Polling ] ──► (Client checks job status; shows progress indicator)
       │
       ▼
[ Structured Editor ] ──► (Review validated AI draft; edit structured blocks)
       │
       ▼
[ Save Document ] ──► (Persist document state & create document_versions snapshot)
       │
       ▼
[ Print / Preview Mode ] ──► (Trigger browser print view for physical / PDF saving)
```

---

## 9. Core Features

### 9.1 Authentication & Profile Management
- User signup, login, logout, and password recovery via Supabase Auth.
- User profile metadata (`profiles` table: Name, School Name, Role).
- Account deletion & user data purging capability.

### 9.2 Workspace & Dashboard
- Overview of user-owned documents using lightweight metadata queries (skipping heavy content payloads for fast loading).
- Simple title keyword search and document type filter.
- Quick action buttons to launch new document creation.

### 9.3 Dynamic Document Generator Form
- Context-aware input fields tailored per document type.
- Local client-side input recovery (storing unsubmitted form inputs to withstand accidental reloads).
- Request validation capping maximum prompt input length.

### 9.4 Asynchronous Draft Generation Engine
- Non-blocking job submission pattern (`generation_jobs`).
- Real-time or polling status updates (`pending`, `processing`, `completed`, `failed`).
- Serverless-compatible timeout handling.

### 9.5 Structured Block Editor
- Modular section-by-section structured field editing (avoiding complex raw HTML WYSIWYG overhead for V1).
- Prepared architecture for integrating rich text libraries (e.g., Tiptap, Lexical) in V2.

### 9.6 Document Versioning & History
- Multi-version snapshot saving (`document_versions` entity).
- Ability to view prior version states and revert/recover saved revisions.

---

## 10. Curriculum-Agnostic Document Architecture

To ensure the application is adaptable to changing educational regulations and international frameworks, the core document engine is strictly **curriculum-agnostic**.

### 10.1 Curriculum Templates (`curriculum_templates`)
Rather than hardcoding curriculum terms directly into database schemas or codebase logic, documents reference a `curriculum_template`.

- **Core Document Structure:** Generic container holding metadata (Title, Subject, Grade, Duration, Author) and a collection of dynamic content sections.
- **Curriculum-Specific Sections:** Defined by static template configuration files in V1 (e.g., `templates/kurikulum-merdeka-v1.json`).

### 10.2 Default V1 Curriculum Preset: Kurikulum Merdeka
While the underlying schema uses generic block structures, the default preset supplied for V1 will map to *Kurikulum Merdeka* guidelines:

- **Metadata Header:** School, Subject, Grade/Phase, Time Allocation.
- **General Components:** Initial Competencies, Target Character Traits (*Profil Pelajar Pancasila*), Learning Media.
- **Core Components:** Learning Objectives (*Tujuan Pembelajaran*), Meaningful Understanding (*Pemahaman Bermakna*), Triggering Questions (*Pertanyaan Pemantik*), Step-by-Step Learning Activities (*Kegiatan Pembelajaran*).
- **Assessment & Extensions:** Formative/Summative strategy notes, Remedial and Enrichment protocols.

---

## 11. AI Engine & Provider Abstraction

### 11.1 Conceptual Pipeline & Output Sanitization

AI generation outputs are treated as **untrusted third-party inputs**. Raw LLM text is never rendered directly in the DOM or saved to the database without schema validation and HTML sanitization.

```
[ User Input ]
       │
       ▼
[ Input Sanitization & Length Check ]
       │
       ▼
[ Prompt Builder Module ]
       │
       ▼
[ AI Provider Adapter (IAIService Interface) ]
       │
       ▼
[ Gemini API (Structured JSON Mode) ]
       │
       ▼
[ Raw AI JSON Response ]
       │
       ▼
[ Zod Schema Validation & Default Normalization ]
       │
       ▼
[ HTML / Text XSS Sanitization Layer ]
       │
       ▼
[ Persist Job Result & Expose Structured Draft ]
```

### 11.2 Provider Abstraction Layer (`IAIService`)
The AI engine is decoupled behind an abstraction interface:
- **V1 Implementation:** `GeminiAIAdapter` leveraging the Gemini API with enforced structured JSON output (`responseSchema`).
- **Extensibility:** Future adapters (`ClaudeAIAdapter`, `OpenAIAdapter`) can be introduced without modifying application business logic or UI components.

---

## 12. Asynchronous AI Generation Architecture

To accommodate Gemini API generation latencies (which may reach 15–30+ seconds) and remain compliant with Vercel serverless execution limits (15s default), generation is executed asynchronously.

### 12.1 Job Execution Lifecycle

1. **Job Submission:** Client POSTs request parameters to `/api/generate`.
2. **Job Registration:** Server creates a record in `generation_jobs` with `status = 'pending'` and returns `job_id` immediately.
3. **Background Execution:** The server initiates background processing.
   - *Implementation Strategy Options:* Evaluated during implementation (e.g., Next.js background execution, streaming SSE responses, Supabase Edge Functions, or an external job queue).
4. **Status Polling / Streaming:** Client monitors job progress via `GET /api/jobs/[id]` or Realtime subscription.
5. **Completion & Validation:** Upon successful AI execution and Zod validation, `status` becomes `'completed'`, and the payload is attached to the job record.
6. **Error Handling:** If execution times out or validation fails, `status` becomes `'failed'` with a user-friendly error message, preserving user inputs.

---

## 13. Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                   │
│         (Next.js App Router, React Components,          │
│            Tailwind CSS UI, State Management)           │
└────────────────────────────┬────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│                    Application Layer                    │
│     (Server Actions, Route Handlers, Controllers,       │
│         Input Validation & Output Sanitization)         │
└───────┬────────────────────┬────────────────────┬───────┘
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
│  AI Abstraction│  │ Database Layer  │  │  Auth Service   │
│  (IAIService / │  │ (Supabase Client│  │ (Supabase Auth  │
│ Gemini Adapter)│  │ Repositories)   │  │ Session Handler)│
└────────────────┘  └─────────────────┘  └────────────────┘
```

---

## 14. Authentication, Authorization, & Security

### 14.1 Authentication & Authorization
- **Auth Provider:** Supabase Auth (Email/Password).
- **Session Security:** HTTP-Only Secure Cookies via `@supabase/ssr`.
- **Database Authorization:** PostgreSQL Row Level Security (RLS) enabled on all user-owned tables enforcing `auth.uid() = user_id`.

### 14.2 Security Guards
1. **Zero Client Secret Exposure:** API keys (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are accessible solely on the server.
2. **HTML / XSS Protection:** Any rich text or rendered content blocks must be sanitized before DOM injection to eliminate stored XSS vulnerabilities.
3. **Input Sanitization:** User-submitted prompts are capped by character limits to prevent prompt injection and buffer inflation.

---

## 15. AI Rate Limiting & Usage Cost Controls

To prevent API abuse and control operational costs, the architecture includes telemetry and rate-limiting hooks:

1. **Usage Tracking (`generation_logs`):** Every generation attempt logs `user_id`, `document_type`, estimated token count, execution duration, and outcome status.
2. **Rate Limiting Middleware:** Requests per user/IP are throttled via application middleware.
3. **Development Quota Mode:** For initial V1 internal testing, generation quotas remain generous, but tracking mechanisms operate continuously so production quotas can be enforced without code refactoring.
4. **Payload Caps:** Strict character bounds on input form fields and maximum response token caps on AI model calls.

---

## 16. Database Architecture Concept

*Note: Conceptual entity design only. No SQL DDL script is executed during this specification phase.*

### 16.1 Core Conceptual Entities

#### 1. `profiles`
- **Purpose:** Extended user profile metadata linked to `auth.users`.
- **Fields:** `id` (FK to auth.users), `full_name`, `school_name`, `role`, `created_at`, `updated_at`.

#### 2. `documents`
- **Purpose:** Primary document registry holding current active state.
- **Fields:** `id`, `user_id` (FK), `curriculum_template_id` (String), `document_type` (`modul_ajar`, `lkpd`, `assessment`), `title`, `educational_metadata` (JSONB), `content` (JSONB structured blocks), `status` (`draft`, `completed`, `archived`), `created_at`, `updated_at`.

#### 3. `document_versions`
- **Purpose:** Historical snapshots for version history and recovery.
- **Fields:** `id`, `document_id` (FK to documents), `version_number` (Integer), `title`, `content` (JSONB), `source` (`ai_initial`, `user_save`, `auto_save`), `created_by` (FK to users), `created_at`.

#### 4. `generation_jobs`
- **Purpose:** Tracks asynchronous AI job execution and transient status.
- **Fields:** `id`, `user_id` (FK), `document_type`, `request_payload` (JSONB), `response_payload` (JSONB nullable), `status` (`pending`, `processing`, `completed`, `failed`), `error_message` (Text nullable), `created_at`, `updated_at`.

#### 5. `generation_logs`
- **Purpose:** Audit telemetry for AI cost control and rate-limiting diagnostics.
- **Fields:** `id`, `user_id` (FK), `job_id` (FK), `document_type`, `prompt_tokens_est`, `completion_tokens_est`, `execution_time_ms`, `status`, `created_at`.

### 16.2 Database Query Optimization
- **List Query Optimization:** Workspace list queries (`/documents`) MUST select only lightweight metadata fields (`id`, `title`, `document_type`, `status`, `updated_at`), strictly omitting the heavy `content` JSONB column. Full document content is fetched only when opening the editor or viewer.

---

## 17. UI/UX Structure

### 17.1 Sitemap & Route Hierarchy
- `/` - Landing Page
- `/login` - Authentication Login Page
- `/register` - Account Signup Page
- `/dashboard` - User Workspace Overview (Lightweight document metadata list)
- `/documents/create` - Document Wizard & Curriculum Template Selector
- `/documents/create/[type]` - Step-by-Step Educational Input Form (with draft recovery)
- `/documents/editor/[id]` - Structured Block Editor & Version History
- `/documents/view/[id]` - Clean Print-Ready Read-Only View (`@media print`)
- `/settings` - User Profile & Account Data Control (Account Deletion)

---

## 18. Document Lifecycle

```
[ 1. FORM FILLING ] ──► Form inputs automatically cached in client local storage.
         │
         ▼
[ 2. ASYNC JOB ] ──► API creates `generation_job`; status polled by client UI.
         │
         ▼
[ 3. VALIDATION ] ──► AI output checked against Zod schema & sanitized for HTML.
         │
         ▼
[ 4. STRUCTURED EDITING ] ──► Teacher edits structured section blocks in Editor.
         │
         ▼
[ 5. SAVE & SNAPSHOT ] ──► Document saved to DB; new `document_versions` record logged.
         │
         ▼
[ 6. PRINT / EXPORT ] ──► Teacher switches to Print View for browser PDF/paper output.
```

---

## 19. Export Strategy

- **V1 Export Strategy:** Client-side print stylesheet (`@media print`) and clean read-only view (`/documents/view/[id]`). Teachers export to PDF or paper using native browser print capability (`window.print()`).
- **V2 Export Strategy:** Server-side Microsoft Word (`.docx`) file generation parsing structured JSON block data into styled Word templates.

---

## 20. Error Handling & Resilience

- **AI Timeout / Job Failure:** If generation fails, the job state marks `failed` with a clear explanation. The user's input form state remains intact in local storage for easy resubmission.
- **Zod Schema Mismatch:** If AI output omits optional structured fields, Zod applies default fallback structures rather than failing or crashing the editor.
- **Authentication Timeout:** Unsaved client form inputs are preserved in local storage even if the user's session expires, allowing seamless recovery after re-login.

---

## 21. Testing Strategy

- **Unit Testing:** Form validation schemas (Zod), prompt adapter transformation logic, and HTML sanitization routines.
- **Integration Testing:** Supabase RLS policies ensuring users cannot access or edit other users' documents or versions.
- **End-to-End Testing (Playwright/Cypress):** Testing the core vertical slice: Signup → Login → Create Modul Ajar Form → Mock Async Job → Structured Editor → Save → Version Log → Print View.

---

## 22. Environment Variables Strategy

```env
# Server-side Secrets (NEVER expose to browser)
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Public / Client-accessible Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 23. Development Roadmap

```
Milestone 1: Architecture & Specification (CURRENT PHASE - COMPLETED)
  └── Finalize MASTER_SPECIFICATION.md and confirmed decisions.

Milestone 2: Foundation & Authentication
  └── Setup Next.js, Tailwind CSS, Supabase Auth, and basic layout shell.

Milestone 3: Database & RLS Enforcement
  └── Apply schema concepts (`profiles`, `documents`, `document_versions`, `generation_jobs`, `generation_logs`) with strict RLS policies.

Milestone 4: Async AI Engine & Modul Ajar Slice
  └── Implement AI Provider Adapter, Zod validation, job polling, structured editor, version snapshots, and print view.

Milestone 5: Document Expansion (LKPD & Assessments)
  └── Add templates and prompt adapters for LKPD and Bank Soal.

Milestone 6: Polish, Data Controls & QA
  └── Add local draft recovery, account deletion capabilities, and end-to-end verification.
```

---

## 24. Open Technical Decisions (`DECISION REQUIRED`)

The following specific implementation details are intentionally left for evaluation during initial code implementation:

| ID | Topic | Description | Status |
| :--- | :--- | :--- | :--- |
| **DEC-01** | **Async Job Infrastructure** | Select exact background execution engine (e.g., Vercel background functions, Serverless Edge workers, or streaming SSE). | `DECISION REQUIRED` |
| **DEC-02** | **HTML Sanitizer Package** | Select specific npm library for client/server HTML sanitization (e.g., `isomorphic-dompurify`). | `DECISION REQUIRED` |
| **DEC-03** | **Draft Storage Strategy** | Confirm whether client local storage (`localStorage`) or browser IndexedDB is used for unsubmitted form caching. | `DECISION REQUIRED` |
| **DEC-04** | **Rate Limiting Store** | Select rate-limiting storage mechanism for production (e.g., Upstash Redis vs Supabase table rate limits). | `DECISION REQUIRED` |

---

## 25. Architecture Decisions Confirmed

The following architectural foundation decisions have been established and codified in this specification:

1. **Asynchronous Generation Engine:** Replaced long-running synchronous HTTP calls with a job-based status pattern (`generation_jobs`) to bypass serverless execution timeouts.
2. **Document Versioning:** Introduced a dedicated `document_versions` entity to capture full snapshot histories and allow document revision recovery.
3. **Curriculum-Agnostic Core:** Decoupled document models from hardcoded *Kurikulum Merdeka* terms, adopting a template-driven (`curriculum_templates`) architecture.
4. **AI Rate Limiting & Telemetry:** Integrated `generation_logs` tracking and input/output bounds to control API costs and prepare for production quotas.
5. **Untrusted AI Output Validation:** Enforced strict Zod schema validation, default normalization, and HTML/XSS sanitization on all raw LLM payloads prior to rendering or storage.
6. **V1 Structured Editor:** Selected a modular section block editor for V1, deferring heavy WYSIWYG editor dependencies (Tiptap/Lexical) to future updates.
7. **Static V1 Presets:** Configured V1 curriculum presets as version-controlled JSON assets rather than complex dynamic DB lookup tables.
8. **Native Browser Print Export:** Standardized V1 export on print-ready views (`@media print` / `window.print()`), deferring server-side `.docx` generation to V2.
9. **Single Vertical Slice Focus:** Prioritized an end-to-end working slice for *Modul Ajar* before enabling *LKPD* and *Assessment* generators.
10. **Draft Input Recovery:** Required client-side draft caching so unsubmitted user form entries survive unexpected page reloads.
11. **User Data Privacy Controls:** Mandated account deletion and user document purging capabilities.
12. **Database Query Optimization:** Restricted document list queries to fetch lightweight metadata, leaving heavy JSONB content payloads for single-document editor views.
13. **AI Provider Abstraction:** Wrapped LLM operations behind a generic interface (`IAIService`) to allow swapping providers without touching application logic.

---
*End of Master Specification Document.*
