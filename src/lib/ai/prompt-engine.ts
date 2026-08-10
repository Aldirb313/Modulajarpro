import { AIContentRequest, DocumentType, TemplateType, SmartRewriteAction } from './types';

export class PromptEngineeringEngine {
  /**
   * Generates system and user prompts tailored for pedagogical accuracy & clean JSON formatting.
   */
  public static buildGenerationPrompt(req: AIContentRequest): { systemPrompt: string; userPrompt: string } {
    const templateGuidance = this.getTemplateGuidance(req.templateType);
    const documentTypeGuidance = this.getDocumentTypeGuidance(req.documentType);

    const systemPrompt = `Anda adalah Pakar Kurikulum EdTech Senior & Master Pedagogi Indonesia berpengalaman 20 tahun.
Tugas Anda adalah menghasilkan dokumen pendidikan profesional kelas dunia yang komprehensif, terstruktur, siap cetak, dan langsung dapat digunakan oleh guru tanpa perlu banyak pengeditan.

PRINSIP PENULISAN:
1. Bahasa Indonesia baku, pedagogis, inspiratif, dan mudah dipahami.
2. Mengikuti standar kriteria Kurikulum ${req.kurikulum} dan tingkat perkembangan peserta didik jenjang ${req.jenjang} (Kelas ${req.kelas}).
3. Mengintegrasikan pendekatan template khas: ${templateGuidance}.
4. SELALU kembalikan output dalam format JSON valid sesuai JSON Schema yang diberikan tanpa markdown wrapper atau penjelasan di luar JSON.`;

    const userPrompt = `Buatkan ${documentTypeGuidance.name} dengan rincian parameter berikut:

DATA PEMBELAJARAN:
- Jenjang: ${req.jenjang}
- Kurikulum: ${req.kurikulum}
- Mata Pelajaran: ${req.mataPelajaran}
- Kelas: ${req.kelas}
- Topik / Pokok Bahasan: ${req.topik}
- Alokasi Waktu: ${req.durasi}
- Target / Capaian Pembelajaran: ${req.targetPembelajaran}
- Pendekatan Template: ${req.templateType.toUpperCase()}

FORMAT KELUARAN YANG DIBUTUHKAN (JSON Valid):
{
  "title": "${req.mataPelajaran} - ${req.topik}",
  "sections": [
    ${documentTypeGuidance.expectedSections.map(s => `{"id": "${s.id}", "title": "${s.title}", "content": "Isi detail terstruktur (dapat menggunakan tag HTML sederhana <h3>, <p>, <ul>, <li>, <table> untuk kerapihan)"}`).join(',\n    ')}
  ]
}`;

    return { systemPrompt, userPrompt };
  }

  /**
   * Generates prompt for AI Smart Rewrite features.
   */
  public static buildSmartRewritePrompt(content: string, action: SmartRewriteAction, targetLang?: string): { systemPrompt: string; userPrompt: string } {
    const systemPrompt = `Anda adalah Asisten AI Smart Editor Khusus Guru.
Tugas Anda adalah mengubah teks materi pembelajaran sesuai instruksi yang diberikan dengan tetap menjaga ketepatan fakta dan konsep materi.`;

    let instruction = '';
    switch (action) {
      case 'shorten':
        instruction = 'Ringkas teks ini menjadi lebih padat, ringkas, dan fokus pada poin-poin utama saja (bullet points jika perlu).';
        break;
      case 'expand':
        instruction = 'Perpanjang dan perjelas teks ini dengan menambahkan contoh konkret, ilustrasi kontekstual, dan penjelasan mendalam.';
        break;
      case 'simplify':
        instruction = 'Sederhanakan kalimat dan istilah dalam teks ini agar sangat mudah dipahami tanpa mengurangi makna dasar.';
        break;
      case 'child_friendly':
        instruction = 'Ubah gaya bahasa teks ini menjadi hangat, ramah anak, menyenangkan, dan menggunakan analogi yang dekat dengan kehidupan sehari-hari anak-anak.';
        break;
      case 'formal':
        instruction = 'Ubah gaya bahasa teks ini menjadi sangat formal, akademis, dan baku sesuai standar tata bahasa Indonesia.';
        break;
      case 'translate':
        instruction = `Terjemahkan teks ini ke dalam ${targetLang || 'Bahasa Inggris'} dengan akurasi istilah akademik yang tepat.`;
        break;
    }

    const userPrompt = `${instruction}\n\nTEKS ASLI:\n"""\n${content}\n"""\n\nKEMBALIKAN HANYA TEKS HASIL REWRITE TANPA EMBEL-EMBEL KATAPENGANTAR.`;

    return { systemPrompt, userPrompt };
  }

  private static getTemplateGuidance(template: TemplateType): string {
    switch (template) {
      case 'islamic':
        return 'Sertakan integrasi nilai-nilai keislaman, ayat Al-Qur\'an/Hadits yang relevan, serta karakter akhlakul karimah.';
      case 'stem':
        return 'Tekankan integrasi Science, Technology, Engineering, dan Mathematics dalam aktivitas dan penyelesaian masalah.';
      case 'pjbl':
        return 'Gunakan sintaks Project-Based Learning (Pertanyaan Mendasar, Desain Proyek, Menyusun Jadwal, Monitoring, Penilaian Hasil).';
      case 'merdeka':
        return 'Fokus pada Profil Pelajar Pancasila, Pembelajaran Berdiferensiasi, dan Assessment Formatif Berkelanjutan.';
      case 'national':
      default:
        return 'Gunakan pendekatan Nasional standar yang fleksibel, berkarakter, dan berorientasi pada pencapaian kompetensi inti.';
    }
  }

  private static getDocumentTypeGuidance(type: DocumentType): { name: string; expectedSections: Array<{ id: string; title: string }> } {
    switch (type) {
      case 'modul_ajar':
        return {
          name: 'Modul Ajar Kurikulum Merdeka',
          expectedSections: [
            { id: 'informasi_umum', title: 'I. Informasi Umum (Identitas, Profil Pelajar Pancasila, Sarpras)' },
            { id: 'komponen_inti', title: 'II. Komponen Inti (Tujuan Pembelajaran, Pemahaman Bermakna, Pertanyaan Pemantik)' },
            { id: 'kegiatan_pembelajaran', title: 'III. Langkah-Langkah Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)' },
            { id: 'asesmen_lampiran', title: 'IV. Asesmen, Remidial, Pengayaan & Lampiran (LKPD, Glosarium, Daftar Pustaka)' }
          ]
        };
      case 'atp':
        return {
          name: 'Alur Tujuan Pembelajaran (ATP)',
          expectedSections: [
            { id: 'rasional', title: 'Rasional & Capaian Pembelajaran' },
            { id: 'alur_tujuan', title: 'Peta Alur & Urutan Tujuan Pembelajaran (Elemen, TP, Alokasi Waktu, Kata Kunci)' },
            { id: 'profil_pancasila', title: 'Profil Pelajar Pancasila & Glosarium' }
          ]
        };
      case 'tp':
        return {
          name: 'Tujuan Pembelajaran (TP)',
          expectedSections: [
            { id: 'analisis_cp', title: 'Analisis Kompetensi & Lingkup Materi' },
            { id: 'rumusan_tp', title: 'Rumusan Tujuan Pembelajaran (Audience, Behavior, Condition, Degree)' }
          ]
        };
      case 'cp':
        return {
          name: 'Capaian Pembelajaran (CP) Breakdown',
          expectedSections: [
            { id: 'deskripsi_cp', title: 'Deskripsi & Rasional Capaian Pembelajaran' },
            { id: 'elemen_cp', title: 'Breakdown Elemen Kompetensi & Target Capaian Akhir Fase' }
          ]
        };
      case 'rpp':
        return {
          name: 'Rencana Pelaksanaan Pembelajaran (RPP)',
          expectedSections: [
            { id: 'identitas_rpp', title: 'Identitas & KI/KD atau Tujuan' },
            { id: 'kegiatan_rpp', title: 'Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)' },
            { id: 'penilaian_rpp', title: 'Teknik & Instrumen Penilaian' }
          ]
        };
      case 'materi':
        return {
          name: 'Materi Pembelajaran Lengkap',
          expectedSections: [
            { id: 'pendahuluan_materi', title: 'Pendahuluan & Konsep Dasar' },
            { id: 'pembahasan_utama', title: 'Pembahasan Pembelajaran Utama & Ilustrasi Konkret' },
            { id: 'rangkuman_soal', title: 'Rangkuman & Latihan Mandiri' }
          ]
        };
      case 'ringkasan':
        return {
          name: 'Ringkasan / Rangkuman Materi',
          expectedSections: [
            { id: 'poin_kunci', title: 'Poin-Poin Kunci & Istilah Penting' },
            { id: 'peta_konsep', title: 'Ringkasan Konsep Utama' }
          ]
        };
      case 'presentasi':
        return {
          name: 'Outline Presentasi Slide (PPTX)',
          expectedSections: [
            { id: 'slide_intro', title: 'Slide 1-3: Judul, Tujuan & Pertanyaan Pemantik' },
            { id: 'slide_body', title: 'Slide 4-8: Materi Inti & Penjelasan Visual' },
            { id: 'slide_closing', title: 'Slide 9-10: Kesimpulan, Kuis Singkat & Tugas' }
          ]
        };
      case 'lkpd':
        return {
          name: 'Lembar Kerja Peserta Didik (LKPD)',
          expectedSections: [
            { id: 'petunjuk_lkpd', title: 'Judul & Petunjuk Pengerjaan' },
            { id: 'aktivitas_lkpd', title: 'Aktivitas Eksplorasi & Tugas Praktik Guru-Siswa' },
            { id: 'pertanyaan_diskusi', title: 'Pertanyaan Diskusi & Lembar Hasil Kerja' }
          ]
        };
      case 'worksheet':
      default:
        return {
          name: 'Worksheet / Latihan Soal Interactive',
          expectedSections: [
            { id: 'soal_pilihan', title: 'Bagian A: Soal Pilihan Ganda / Isian' },
            { id: 'soal_uraian', title: 'Bagian B: Soal Uraian / Studi Kasus' },
            { id: 'kunci_rubrik', title: 'Kunci Jawaban & Rubrik Penilaian' }
          ]
        };
    }
  }
}
