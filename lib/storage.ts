import { Note } from "./types";

const STORAGE_KEY = "calendar-notes";

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Failed to save notes:", error);
  }
};

export const loadNotes = (): Note[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return parsed.map((note: any) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      dateRange: note.dateRange
        ? {
            start: note.dateRange.start ? new Date(note.dateRange.start) : null,
            end: note.dateRange.end ? new Date(note.dateRange.end) : null,
          }
        : null,
    }));
  } catch (error) {
    console.error("Failed to load notes:", error);
    return [];
  }
};
