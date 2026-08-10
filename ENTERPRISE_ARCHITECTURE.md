# MODULAJARPRO (GURUAI OS) - ENTERPRISE SAAS ARCHITECTURE SPECIFICATION

**Tagline:** *"Guru Mengajar. AI Menyiapkan Semuanya."*  
**Visi Produk:** Mengubah waktu persiapan mengajar guru dari 5–10 jam menjadi hanya 5 menit menggunakan AI.  
**Tech Stack:** Next.js (App Router, TS, Tailwind CSS, Shadcn UI), Supabase (PostgreSQL, Auth, RLS, Storage), Multi-LLM Support (Gemini, OpenAI, Claude).

---

## 1. Multi-Tenant Database & Relational Schema (Supabase PostgreSQL)

Berikut adalah skema database enterprise yang mencakup Multi-Tenancy (Sekolah/Yayasan), User Roles, Audit Logs, Usage Tracking, dan Subscriptions.

```sql
-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TENANTS & SCHOOL MANAGEMENT (YAYASAN & SEKOLAH)
-- ============================================================================
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('school', 'foundation', 'individual')),
  custom_domain TEXT UNIQUE,
  white_label_settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. USER PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
-- ============================================================================
-- Roles: superadmin, foundation_admin, school_principal, teacher, tutor
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone_number TEXT,
  role TEXT NOT NULL DEFAULT 'teacher' CHECK (role IN ('superadmin', 'foundation_admin', 'school_principal', 'teacher', 'tutor')),
  institution_name TEXT,
  grade_levels TEXT[] DEFAULT '{}',
  subjects TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. SUBSCRIPTIONS & MONETIZATION
-- ============================================================================
-- Plans: free (10 gen/bln), pro_teacher, school, foundation
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_tier TEXT NOT NULL DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro_teacher', 'school', 'foundation')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'past_due', 'canceled', 'expired')),
  monthly_quota INT NOT NULL DEFAULT 10,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. USAGE TRACKING & GENERATION LOGS
-- ============================================================================
CREATE TABLE usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  feature_type TEXT NOT NULL, -- e.g., 'modul_ajar', 'lkpd', 'game_quiz', 'ai_assistant'
  provider TEXT NOT NULL CHECK (provider IN ('gemini', 'openai', 'claude')),
  prompt_tokens INT DEFAULT 0,
  completion_tokens INT DEFAULT 0,
  execution_time_ms INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. DOCUMENTS (MODUL AJAR, LKPD, ASSESSMENT, ETC)
-- ============================================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('modul_ajar', 'atp', 'tp', 'cp', 'rpp', 'materi', 'ringkasan', 'ppt', 'lkpd', 'worksheet', 'assessment', 'game', 'story', 'comic', 'flashcard', 'media')),
  curriculum TEXT NOT NULL DEFAULT 'Kurikulum Merdeka',
  grade TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  template_type TEXT DEFAULT 'national' CHECK (template_type IN ('national', 'islamic', 'stem', 'pjbl', 'merdeka')),
  educational_metadata JSONB NOT NULL DEFAULT '{}',
  content JSONB NOT NULL DEFAULT '{}', -- Structured section blocks
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed', 'shared', 'archived')),
  is_marketplace_template BOOLEAN DEFAULT FALSE,
  price DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. DOCUMENT VERSIONS (SNAPSHOT HISTORY)
-- ============================================================================
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

-- ============================================================================
-- 7. ASYNCHRONOUS GENERATION JOBS
-- ============================================================================
CREATE TABLE generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'gemini',
  request_payload JSONB NOT NULL,
  response_payload JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  failure_code TEXT,
  failure_message TEXT,
  stale_after TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '120 seconds'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index Single Active Job per User
CREATE UNIQUE INDEX idx_single_active_job_per_user 
ON generation_jobs (user_id) 
WHERE status IN ('pending', 'processing');

-- ============================================================================
-- 8. AUDIT LOGS & NOTIFICATIONS (WA/TELEGRAM INTEGRATION)
-- ============================================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- e.g., 'EXPORT_MASSIVE', 'PUBLISH_CONTENT', 'BILLING_UPDATE'
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'telegram')),
  action_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 2. Row Level Security (RLS) & Multi-Tenant Isolation

```sql
-- Enable RLS on core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_jobs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policy
CREATE POLICY "Users can access own profile" ON profiles
  FOR ALL USING (auth.uid() = id);

-- 2. Documents Policy (Single User + Multi-Tenant Collaboration)
CREATE POLICY "Users can view own or tenant shared documents" ON documents
  FOR SELECT USING (
    auth.uid() = user_id OR
    (tenant_id IS NOT NULL AND tenant_id IN (
      SELECT tenant_id FROM profiles WHERE id = auth.uid()
    ))
  );

CREATE POLICY "Users can mutate own documents" ON documents
  FOR ALL USING (auth.uid() = user_id);

-- 3. Document Versions Policy (Parent Validation)
CREATE POLICY "Users can view own versions" ON document_versions
  FOR SELECT USING (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM documents WHERE id = document_versions.document_id AND user_id = auth.uid())
  );
```

---

## 3. Recommended Project Folder Structure (Next.js App Router)

```
Modulajarpro/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/            # Workspace Analytics & Quick Actions
│   │   │   ├── materi/               # AI Modul Ajar, ATP, CP, Ringkasan
│   │   │   ├── lkpd/                 # AI LKPD Generator
│   │   │   ├── assessment/           # AI Bank Soal & Assessment
│   │   │   ├── media/                # AI Game, Comic, Story, Flashcard, Poster
│   │   │   ├── copilot/              # Teacher AI Assistant & Knowledge Base
│   │   │   ├── school/               # School & Yayasan Management
│   │   │   ├── marketplace/          # Template Marketplace & Sharing
│   │   │   └── settings/             # Billing, Subscription & Profile
│   │   ├── api/
│   │   │   ├── generate/route.ts     # Async AI Generation Endpoint
│   │   │   ├── jobs/[id]/route.ts    # Async Job Polling Endpoint
│   │   │   └── webhooks/             # WA/Telegram Approval & Midtrans Webhooks
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                       # Shadcn UI Design System Components
│   │   ├── editor/                   # Structured Section Block Editor
│   │   ├── ai/                       # AI Form Wizards & Smart Rewrite Toolbar
│   │   └── export/                   # PDF, DOCX, PPTX Export Drivers
│   ├── lib/
│   │   ├── ai/                       # Provider Adapters (Gemini, OpenAI, Claude)
│   │   ├── supabase/                 # Server, Client & Middleware Supabase Helpers
│   │   └── utils/                    # Zod Schemas & HTML Sanitization
│   └── types/                        # TypeScript Enterprise Interfaces
└── supabase/
    └── functions/
        └── generate-document/        # Supabase Edge Function Background Worker
```

---

## 4. Scalable Multi-LLM AI Architecture (`IAIService`)

System ini menggunakan **Provider Pattern** yang mengabstraksi panggilan ke **Gemini**, **OpenAI**, maupun **Claude**, dilengkapi dengan Zod validation untuk menjamin keluaran JSON selalu valid.

```typescript
export interface AIRequestPayload {
  documentType: string;
  curriculum: string;
  grade: string;
  subject: string;
  topic: string;
  duration: string;
  targetLearning: string;
  templateType: 'national' | 'islamic' | 'stem' | 'pjbl' | 'merdeka';
}

export interface IAIService {
  generateContent(payload: AIRequestPayload): Promise<Record<string, unknown>>;
  rewriteContent(content: string, action: 'shorten' | 'expand' | 'simplify' | 'formal' | 'translate'): Promise<string>;
}
```

---

## 5. Fitur Monetisasi & Gamifikasi Guru

1. **Tier Subscription:**
   - **FREE:** 10 Kuota Generate/bulan, dasar export.
   - **PRO GURU:** Unlimited Generation, Export PDF/DOCX/PPTX, Akses AI Game & Comic.
   - **SEKOLAH & YAYASAN:** Multi-user tenant, Dashboard Analitik Kepala Sekolah, White-Labeling, Custom Branding.
2. **Viral Loop & Marketplace:** Guru dapat mempublikasikan dan menjual template Modul Ajar/LKPD buatan mereka di Template Marketplace.
3. **Approval Center (WhatsApp / Telegram):** Aksi sensitif seperti pembayar tagihan, eksport massal, atau penambahan guru sekolah membutuhkan OTP/Approval konfirmasi via WhatsApp Bot.
