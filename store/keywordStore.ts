import { create } from "zustand";

export type Keyword = {
  id: string;
  name: string;
  hasNewNews: boolean;
  newsCount: number;
  alertOn: boolean;
  isDeleting?: boolean;
};

type Store = {
  keywords: Keyword[];
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (id: string) => void;
  toggleAlert: (id: string) => void;
  updateKeyword: (id: string, newData: Partial<Keyword>) => void;
  setKeywords: (newKeywords: Keyword[]) => void;
};

export const useKeywordStore = create<Store>((set) => ({
  keywords: [
    {
      id: "1",
      name: "엔비디아",
      hasNewNews: false,
      newsCount: 354,
      alertOn: false,
    },
    {
      id: "2",
      name: "엔비디아",
      hasNewNews: true,
      newsCount: 354,
      alertOn: false,
    },
    {
      id: "3",
      name: "엔비디아",
      hasNewNews: true,
      newsCount: 354,
      alertOn: false,
    },
  ],
  addKeyword: (keyword) =>
    set((state) => ({ keywords: [...state.keywords, keyword] })),
  removeKeyword: (id) =>
    set((state) => ({
      keywords: state.keywords.filter((k) => k.id !== id),
    })),
  toggleAlert: (id) =>
    set((state) => ({
      keywords: state.keywords.map((k) =>
        k.id === id ? { ...k, alertOn: !k.alertOn } : k
      ),
    })),
  updateKeyword: (id, newData) =>
    set((state) => ({
      keywords: state.keywords.map((k) =>
        k.id === id ? { ...k, ...newData } : k
      ),
    })),
  setKeywords: (newKeywords) => set({ keywords: newKeywords }),
}));
