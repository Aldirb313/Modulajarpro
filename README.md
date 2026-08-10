# Modul Ajar Pro

Modul Ajar Pro adalah platform AI untuk membantu guru membuat perangkat pembelajaran secara lebih cepat, terstruktur, dan mudah digunakan.

## Visi

**Guru Mengajar, AI Menyiapkan Semuanya.**

Platform ini dirancang untuk membantu guru dalam menyiapkan berbagai kebutuhan pembelajaran dengan bantuan AI.

## V1 — Modul Ajar

Versi pertama difokuskan pada workflow end-to-end:

1. Registrasi dan login guru
2. Dashboard dokumen
3. Form pembuatan Modul Ajar
4. AI generation secara asynchronous
5. Validasi output AI dengan Zod
6. Structured document editor
7. Document versioning
8. Read-only / print view
9. Account dan data deletion

## V2 — Planned

Fitur yang direncanakan untuk versi berikutnya:

- LKPD
- Bank Soal / Assessment
- Presentasi pembelajaran
- Export Microsoft Word (.docx)
- Curriculum lookup / CP / ATP
- Section-level AI regeneration
- Advanced rich text editor

## Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL
- Gemini API
- Zod
- Vercel

## Project Documentation

Dokumen utama project:

- `MASTER_SPECIFICATION.md` — Product & Technical Specification
- `ARCHITECTURE.md` — Technical Architecture
- `AGENTS.md` — Next.js Agent Instructions

Dokumen tersebut merupakan sumber acuan utama sebelum melakukan perubahan arsitektur atau implementasi.

## Development

Install dependencies:

```bash
npm install