
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

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

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
  difficulty: Difficulty;
}

export interface ScrapbookSticker {
  id: string;
  itemId: string;
  posX: number;
  posY: number;
  rotation: number;
  scale: number;
}

export interface Difference {
  id: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  description: string;
  found: boolean;
}

export interface StorySegment {
  text: string;
  choices: { text: string; nextPrompt: string }[];
  visualPrompt: string;
  characterExpression: 'happy' | 'thinking' | 'excited' | 'wise';
}

export interface AppState {
  currentLanguage: Language;
  selectedItem: CultureItem | null;
  isQuizActive: boolean;
  score: number;
}
