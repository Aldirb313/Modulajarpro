import { WOWGenerationRequest } from './wow-types';

export class WOWPromptEngine {
  public static buildPrompt(req: WOWGenerationRequest): { systemPrompt: string; userPrompt: string } {
    const systemPrompt = `Anda adalah Master EdTech Creator, Game Designer, Illustrative Storyteller, dan Video Learning Producer Senior.
Tugas Anda adalah menghasilkan media interaktif dan konten pembelajaran kelas dunia yang membuat guru terkagum-kagum ("WOW Factor"), menyenangkan bagi siswa, terstruktur rapi, dan siap dipakai atau dicetak di kelas. SELALU kembalikan output dalam format JSON valid.`;

    let userPrompt = '';

    switch (req.category) {
      case 'game':
        userPrompt = `Buatkan AI Game Interaktif tipe "${req.type.toUpperCase()}" untuk Mata Pelajaran ${req.subject} kelas ${req.grade} topik "${req.topic}".
Format JSON yang diharapkan:
{
  "title": "Judul Game",
  "gameType": "${req.type}",
  "instructions": "Petunjuk Bermain untuk Guru & Siswa",
  "interactiveData": {
    "items": [
      {"question": "Soal/Pertanyaan", "options": ["A", "B", "C", "D"], "answer": "Jawaban Benar"},
      {"pairA": "Item Pasangan 1", "pairB": "Item Pasangan 2"}
    ]
  },
  "printableLayoutHtml": "<div class='game-container'>...</div>"
}`;
        break;

      case 'story':
        userPrompt = `Buatkan Cerita Edukatif tipe "${req.type}" topik "${req.topic}" untuk kelas ${req.grade}.
Format JSON yang diharapkan:
{
  "title": "Judul Cerita",
  "storyType": "${req.type}",
  "synopsis": "Ringkasan Cerita",
  "paragraphs": [
    {"chapter": 1, "text": "Isi narasi cerita...", "imagePrompt": "Deskripsi prompt gambar AI untuk halaman ini"}
  ],
  "moralValue": "Pesan Moral / Nilai Karakter"
}`;
        break;

      case 'comic':
        userPrompt = `Buatkan Komik Edukasi tipe "${req.type}" tentang "${req.topic}" untuk kelas ${req.grade}.
Format JSON yang diharapkan:
{
  "title": "Judul Komik",
  "comicType": "${req.type}",
  "panels": [
    {"panelNumber": 1, "sceneDescription": "Latar tempat & aksi", "characterDialogue": "Karakter A: '...'", "visualPrompt": "Illustration prompt"}
  ]
}`;
        break;

      case 'flashcard':
        userPrompt = `Buatkan Set Flashcard Edukasi kategori "${req.type}" topik "${req.topic}".
Format JSON yang diharapkan:
{
  "category": "${req.type}",
  "cards": [
    {"frontText": "Sisi Depan (Kata/Gambar)", "backText": "Sisi Belakang (Penjelasan)", "hint": "Petunjuk", "visualPrompt": "Prompt ilustrasi Sisi Depan"}
  ]
}`;
        break;

      case 'media':
        userPrompt = `Buatkan Desain Media Pembelajaran tipe "${req.type}" tentang "${req.topic}".
Format JSON yang diharapkan:
{
  "title": "Judul Media",
  "mediaCategory": "${req.type}",
  "headline": "Headline Utama Poster/Infografik",
  "subheadings": ["Sub Poin 1", "Sub Poin 2"],
  "contentBlocks": [
    {"heading": "Judul Poin", "body": "Penjelasan singkat padat"}
  ],
  "suggestedVisualLayout": "Rekomendasi Tata Letak & Skema Warna"
}`;
        break;

      case 'video':
      default:
        userPrompt = `Buatkan AI Video Learning Script & Narasi (${req.videoOrientation || 'horizontal'}) tentang "${req.topic}" untuk kelas ${req.grade}.
Format JSON yang diharapkan:
{
  "title": "Judul Video Pembelajaran",
  "orientation": "${req.videoOrientation || 'horizontal'}",
  "estimatedDurationSeconds": 180,
  "narrationScript": "Full Teks Narasi AI Voiceover...",
  "autoSubtitles": [
    {"timestamp": "00:00 - 00:05", "text": "Subjudul..."}
  ],
  "avatarInstructions": "Ekspresi & Gaya Avatar AI",
  "sceneBreakdown": [
    {"scene": 1, "visualCue": "Visual di layar", "voiceOverLine": "Garis Suara"}
  ]
}`;
        break;
    }

    return { systemPrompt, userPrompt };
  }
}
