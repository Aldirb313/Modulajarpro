import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { action, prompt, documentContext, mode } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        answer: getDemoResponse(action, prompt, mode),
        source: "demo_engine",
      });
    }

    let systemPrompt = `Anda adalah Teacher Copilot & AI Pedagogi Assistant khusus untuk guru di Indonesia. 
Anda sangat berpengalaman dalam Kurikulum Merdeka, strategi mengajar, ice breaking, differentiated learning, PjBL, dan pembuatan rencana pembelajaran (harian, mingguan, bulanan, kalender).

Berdasarkan konteks dokumen/knowledge base yang diunggah berikut:
---
${documentContext || "Tidak ada dokumen khusus diunggah. Gunakan pengetahuan pedagogi umum."}
---

Tugas Anda:
Jawab permintaan guru dengan sangat rinci, praktis, terstruktur, dan siap dipakai langsung di kelas. Gunakan format Markdown yang rapi dengan bullet points, tabel, atau nomor jika diperlukan.`;

    if (action === "chat") {
      systemPrompt += `\n\nPermintaan Guru: "${prompt}"`;
    } else if (action === "lesson_plan") {
      systemPrompt += `\n\nBuatkan Rencana Pembelajaran (${mode || "Harian/Mingguan"}) lengkap dengan Alokasi Waktu, Tujuan Pembelajaran, Langkah Kegiatan (Awal, Inti, Penutup), dan Asesmen untuk: "${prompt}"`;
    } else if (action === "pedagogy_assistant") {
      systemPrompt += `\n\nBerikan Panduan & Rekomendasi (${mode || "Strategi Mengajar/Ice Breaking"}) yang kreatif, interaktif, dan mudah diaplikasikan untuk: "${prompt}"`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        success: true,
        answer: getDemoResponse(action, prompt, mode),
        source: "fallback_engine",
      });
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || getDemoResponse(action, prompt, mode);

    return NextResponse.json({
      success: true,
      answer: text,
      source: "gemini_ai",
    });
  } catch (error: any) {
    console.error("Copilot Error:", error);
    return NextResponse.json({
      success: true,
      answer: getDemoResponse("chat", "Permintaan"),
      source: "fallback_engine",
    });
  }
}

function getDemoResponse(action: string, prompt: string, mode?: string) {
  if (action === "lesson_plan") {
    return `### 📅 Rencana Pembelajaran (${mode || "Harian/Mingguan"})

**Mata Pelajaran / Topik:** ${prompt}
**Alokasi Waktu:** 2 JP (2 x 40 Menit)
**Pendekatan:** Kurikulum Merdeka (Differentiated Learning & Project Based Learning)

---

#### 1. Tujuan Pembelajaran (TP)
- Murid mampu memahami konsep dasar materi secara kritis dan kolaboratif.
- Murid mampu mengaplikasikan pemahaman dalam tugas kelompok berbasis proyek nyata.

#### 2. Kegiatan Pembelajaran Utama
* **Kegiatan Awal (10 Menit):** 
  - Orientasi & Doa bersama.
  - Apersepsi & Ice Breaking energizer ("Tebak Kata Kunci").
  - Penyampaian Pertanyaan Pemantik.
* **Kegiatan Inti (60 Menit - Differentiated Learning):**
  - *Visual Learner:* Mempelajari grafik / ilustrasi materi.
  - *Kinesthetic Learner:* Praktik simulasi mini dalam kelompok.
  - *Auditory Learner:* Diskusi interaktif dan tanya jawab.
* **Kegiatan Penutup (10 Menit):**
  - Refleksi singkat murid ("Apa 1 hal baru yang dipelajari hari ini?").
  - Ulasan guru & apresiasi kelas.

#### 3. Asesmen
- **Formatif:** Observasi keaktifan diskusi & Lembar Kerja Siswa (LKPD).
- **Summative:** Kuis singkat 5 soal pilihan ganda di akhir sesi.`;
  }

  return `### 💡 Solusi & Rekomendasi Modulajarpro Copilot

Berdasarkan konteks materi **"${prompt}"**, berikut adalah rekomendasi strategi pedagogi & aktivitas interaktif yang siap Anda gunakan di kelas:

#### 1. Strategi Mengajar (Differentiated Learning)
- **Tingkat Dasar:** Diberikan panduan lembar kerja berstruktur dengan pilihan jawaban terbimbing.
- **Tingkat Lanjut:** Diberikan studi kasus terbuka untuk dianalisis dan dipresentasikan depan kelas.

#### 2. Ice Breaking Energizer (3 Menit)
- **Nama Game:** "Ikuti Suaraku, Bukan Tanganku"
- **Cara Bermain:** Guru mengucapkan perintah (misal: "Pegang Hidung"), namun tangan guru memegang telinga. Murid harus fokus mendengarkan suara guru, bukan mengikuti gerakan visual.

#### 3. Aktivitas Kelas Berbasis PjBL
- Bagi murid menjadi 4 kelompok kecil.
- Setiap kelompok diberikan misi menyelesaikan 1 masalah kontekstual menggunakan referensi materi yang tersedia.
- Hasil karya dipamerkan dalam bentuk Gallery Walk singkat.`;
}
