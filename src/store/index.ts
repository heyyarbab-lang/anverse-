import { create } from 'zustand';

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  // Generator State
  selectedRecitor: any | null;
  selectedSurah: any | null;
  ayahRange: { start: number; end: number };
  translationLang: string;
  backgroundStyle: string;
  
  setRecitor: (recitor: any) => void;
  setSurah: (surah: any) => void;
  setAyahRange: (start: number, end: number) => void;
  setTranslationLang: (lang: string) => void;
  setBackgroundStyle: (style: string) => void;
}

export const useStore = create<AppState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  selectedRecitor: null,
  selectedSurah: null,
  ayahRange: { start: 1, end: 7 },
  translationLang: 'en.sahih',
  backgroundStyle: 'nature',
  
  setRecitor: (recitor) => set({ selectedRecitor: recitor }),
  setSurah: (surah) => set({ selectedSurah: surah }),
  setAyahRange: (start, end) => set({ ayahRange: { start, end } }),
  setTranslationLang: (lang) => set({ translationLang: lang }),
  setBackgroundStyle: (style) => set({ backgroundStyle: style }),
}));
