import { z } from 'zod';

export type WOWFeatureCategory = 'game' | 'story' | 'comic' | 'flashcard' | 'media' | 'video';

export type GameType = 'quiz' | 'memory' | 'matching' | 'spin_wheel' | 'crossword' | 'word_search' | 'puzzle' | 'escape_room';
export type StoryType = 'children' | 'picture_story' | 'educational_fairy' | 'character_building';
export type ComicType = 'education' | 'science' | 'character' | 'moral';
export type FlashcardCategory = 'letters' | 'numbers' | 'english' | 'science_ipa' | 'social_ips';
export type MediaCategory = 'poster' | 'infographic' | 'class_banner' | 'learning_media';
export type VideoOrientation = 'vertical' | 'horizontal';

export interface WOWGenerationRequest {
  category: WOWFeatureCategory;
  type: string;
  topic: string;
  grade: string;
  subject: string;
  customNotes?: string;
  videoOrientation?: VideoOrientation;
}

export const WOWGenerationRequestSchema = z.object({
  category: z.enum(['game', 'story', 'comic', 'flashcard', 'media', 'video']),
  type: z.string().min(1),
  topic: z.string().min(1),
  grade: z.string().min(1),
  subject: z.string().min(1),
  customNotes: z.string().optional(),
  videoOrientation: z.enum(['vertical', 'horizontal']).optional(),
});

export interface WOWGameResult {
  title: string;
  gameType: GameType;
  instructions: string;
  interactiveData: Record<string, unknown>; // Quiz items, matching pairs, crossword grid, spin wheel segments
  printableLayoutHtml: string;
}

export interface WOWStoryResult {
  title: string;
  storyType: StoryType;
  synopsis: string;
  paragraphs: Array<{ chapter: number; text: string; imagePrompt: string }>;
  moralValue: string;
}

export interface WOWComicResult {
  title: string;
  comicType: ComicType;
  panels: Array<{ panelNumber: number; sceneDescription: string; characterDialogue: string; visualPrompt: string }>;
}

export interface WOWFlashcardResult {
  category: FlashcardCategory;
  cards: Array<{ frontText: string; backText: string; hint: string; visualPrompt: string }>;
}

export interface WOWMediaResult {
  title: string;
  mediaCategory: MediaCategory;
  headline: string;
  subheadings: string[];
  contentBlocks: Array<{ heading: string; body: string }>;
  suggestedVisualLayout: string;
}

export interface WOWVideoScriptResult {
  title: string;
  orientation: VideoOrientation;
  estimatedDurationSeconds: number;
  narrationScript: string;
  autoSubtitles: Array<{ timestamp: string; text: string }>;
  avatarInstructions: string;
  sceneBreakdown: Array<{ scene: number; visualCue: string; voiceOverLine: string }>;
}
