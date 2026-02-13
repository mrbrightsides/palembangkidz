
export type Language = 'id' | 'en' | 'plm';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface AiHeritageInsight {
  originStory: string;
  coolFactor: string;
  secretChallenge: string;
}

export interface CultureItem {
  id: string;
  title: Record<Language, string>;
  pronunciation: Record<Language, string>;
  description: Record<Language, string>;
  funFact: Record<Language, string>;
  videoUrl: string;
  imageUrl: string;
  voiceoverScript: Record<Language, string>;
  quiz: QuizQuestion[];
  mapPos?: { x: number; y: number };
}

export interface ScrapbookSticker {
  id: string;
  itemId: string;
  posX: number;
  posY: number;
  rotation: number;
  scale: number;
}

export interface AppState {
  currentLanguage: Language;
  selectedItem: CultureItem | null;
  isQuizActive: boolean;
  score: number;
}
