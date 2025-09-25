import { create } from "zustand";

interface SearchStore {
  // 검색 상태
  searchQuery: string;
  isSearching: boolean;
  isSearchOpen: boolean;

  // 액션
  setSearchQuery: (query: string) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchOpen: (isOpen: boolean) => void;
  toggleSearch: () => void;
}

export const useSearchStore = create<SearchStore>()((set) => ({
  // 초기 상태
  searchQuery: "",
  isSearching: false,
  isSearchOpen: false,

  // 검색 상태 액션
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
}));