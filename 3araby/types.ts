export interface TranslationResult {
  english: string;
  arabicScript: string;
  explanation?: string;
}

export interface HistoryItem {
  id: string;
  input: string;
  result: TranslationResult;
  timestamp: number;
}

export enum AppSection {
  TRANSLATOR = 'translator',
  GUIDE = 'guide',
  HISTORY = 'history'
}
