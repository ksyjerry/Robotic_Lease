import { create } from 'zustand';
import { FilesStore } from "../types/store"

export const useFilesStore = create<FilesStore>((set) => ({
    file: null,
    setFile: (file) => set({ file }),
    resetFile: () => set({ file: null }),
  }));