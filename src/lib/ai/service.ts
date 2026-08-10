import { AIContentRequest, GeneratedDocumentResult, SmartRewriteAction } from './types';
import { PromptEngineeringEngine } from './prompt-engine';

export interface IAIServiceProvider {
  generateDocument(req: AIContentRequest): Promise<GeneratedDocumentResult>;
  rewriteText(content: string, action: SmartRewriteAction, targetLang?: string): Promise<string>;
}

export class GeminiAIServiceAdapter implements IAIServiceProvider {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || '';
  }

  async generateDocument(req: AIContentRequest): Promise<GeneratedDocumentResult> {
    const { systemPrompt, userPrompt } = PromptEngineeringEngine.buildGenerationPrompt(req);

    if (!this.apiKey) {
      console.warn('GEMINI_API_KEY tidak ditemukan. Menggunakan fallback Mock Generator untuk verifikasi development.');
      return this.getMockDocument(req);
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawJsonText) {
        throw new Error('Gemini API mengembalikan respon kosong.');
      }

      const parsed = JSON.parse(rawJsonText);
      return {
        title: parsed.title || `${req.mataPelajaran} - ${req.topik}`,
        documentType: req.documentType,
        templateType: req.templateType,
        metadata: {
          jenjang: req.jenjang,
          kurikulum: req.kurikulum,
          mataPelajaran: req.mataPelajaran,
          kelas: req.kelas,
          durasi: req.durasi,
        },
        sections: parsed.sections || []
      };
    } catch (err) {
      console.error('Error generating document via Gemini API, falling back to mock structure:', err);
      return this.getMockDocument(req);
    }
  }

  async rewriteText(content: string, action: SmartRewriteAction, targetLang?: string): Promise<string> {
    const { systemPrompt, userPrompt } = PromptEngineeringEngine.buildSmartRewritePrompt(content, action, targetLang);

    if (!this.apiKey) {
      return `[Mock Rewrite Result (${action})]: ${content}`;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
          generationConfig: { temperature: 0.5 }
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || content;
    } catch (err) {
      console.error('Error in smart rewrite:', err);
      return content;
    }
  }

  private getMockDocument(req: AIContentRequest): GeneratedDocumentResult {
    return {
      title: `${req.mataPelajaran}: ${req.topik} (${req.documentType.toUpperCase()})`,
      documentType: req.documentType,
      templateType: req.templateType,
      metadata: {
        jenjang: req.jenjang,
        kurikulum: req.kurikulum,
        mataPelajaran: req.mataPelajaran,
        kelas: req.kelas,
        durasi: req.durasi,
      },
      sections: [
        {
          id: 'sec_1',
          title: 'I. Informasi Umum & Identitas Pembelajaran',
          content: `<p><strong>Mata Pelajaran:</strong> ${req.mataPelajaran}</p><p><strong>Kelas/Jenjang:</strong> ${req.kelas} (${req.jenjang})</p><p><strong>Alokasi Waktu:</strong> ${req.durasi}</p><p><strong>Pendekatan:</strong> Template ${req.templateType.toUpperCase()}</p>`
        },
        {
          id: 'sec_2',
          title: 'II. Tujuan & Capaian Pembelajaran',
          content: `<p>${req.targetPembelajaran}</p><ul><li>Siswa dapat memahami konsep dasar ${req.topik} dengan tepat.</li><li>Siswa mampu mengaplikasikan pemahaman dalam aktivitas praktis.</li></ul>`
        },
        {
          id: 'sec_3',
          title: 'III. Kegiatan Pembelajaran Utama',
          content: `<h3>1. Pendahuluan (15 Menit)</h3><p>Guru membuka pembelajaran dengan apersepsi dan melempar pertanyaan pemantik terkait ${req.topik}.</p><h3>2. Kegiatan Inti (60 Menit)</h3><p>Peserta didik berdiskusi kelompok menyelesaikan eksplorasi materi.</p><h3>3. Penutup (15 Menit)</h3><p>Refleksi bersama dan penyimpulan materi pembelajaran.</p>`
        },
        {
          id: 'sec_4',
          title: 'IV. Asesmen & Lembar Kerja',
          content: `<p><strong>Asesmen Formatif:</strong> Observasi keaktifan diskusi & rubrik penilaian kelompok.</p><p><strong>Asesmen Sumatif:</strong> Tes tertulis singkat 5 soal pilihan ganda.</p>`
        }
      ]
    };
  }
}
