export interface FilesStore {
    file: File | null;
    setFile: (file: File) => void;
    resetFile: () => void;
  }