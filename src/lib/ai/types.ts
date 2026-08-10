import { z } from 'zod';

export type DocumentType = 
  | 'modul_ajar'
  | 'atp'
  | 'tp'
  | 'cp'
  | 'rpp'
  | 'materi'
  | 'ringkasan'
  | 'presentasi'
  | 'lkpd'
  | 'worksheet';

export type TemplateType = 'national' | 'islamic' | 'stem' | 'pjbl' | 'merdeka';

export type SmartRewriteAction = 'shorten' | 'expand' | 'simplify' | 'child_friendly' | 'formal' | 'translate';

export interface AIContentRequest {
  documentType: DocumentType;
  jenjang: 'PAUD' | 'TK' | 'SD' | 'SMP' | 'SMA' | 'Bimbel';
  kurikulum: 'Kurikulum Merdeka' | 'Kurikulum 2013' | 'Kurikulum Cambridge' | 'Kurikulum Mandiri';
  mataPelajaran: string;
  kelas: string;
  topik: string;
  durasi: string;
  targetPembelajaran: string;
  templateType: TemplateType;
  targetLanguage?: string;
}

export const AIContentRequestSchema = z.object({
  documentType: z.enum([
    'modul_ajar',
    'atp',
    'tp',
    'cp',
    'rpp',
    'materi',
    'ringkasan',
    'presentasi',
    'lkpd',
    'worksheet'
  ]),
  jenjang: z.enum(['PAUD', 'TK', 'SD', 'SMP', 'SMA', 'Bimbel']),
  kurikulum: z.enum(['Kurikulum Merdeka', 'Kurikulum 2013', 'Kurikulum Cambridge', 'Kurikulum Mandiri']),
  mataPelajaran: z.string().min(1),
  kelas: z.string().min(1),
  topik: z.string().min(1),
  durasi: z.string().min(1),
  targetPembelajaran: z.string().min(1),
  templateType: z.enum(['national', 'islamic', 'stem', 'pjbl', 'merdeka']),
  targetLanguage: z.string().optional(),
});

export interface GeneratedSection {
  id: string;
  title: string;
  content: string; // Rich text / markdown / structured HTML
}

export interface GeneratedDocumentResult {
  title: string;
  documentType: DocumentType;
  templateType: TemplateType;
  metadata: {
    jenjang: string;
    kurikulum: string;
    mataPelajaran: string;
    kelas: string;
    durasi: string;
  };
  sections: GeneratedSection[];
}
