import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Note } from "@/app/notes/page";
import { RootState } from ".";

const notes: Note[] = [];
const selectedNote: Note[] = [];

const initialState = {
  notes,
  selectedNote,
};

type NoteUpdate = {
  prevNoteId: string;
  Note: Note;
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    toggelSelectedNote: (state, action: PayloadAction<Note>) => {
      const noteIndex = state.selectedNote.findIndex(
        (not) => not.id === action.payload.id
      );
      if (noteIndex !== -1) {
        state.selectedNote.splice(noteIndex, 1);
        return;
      }
      state.selectedNote.push(action.payload);
    },

    updateNote: (state, action: PayloadAction<NoteUpdate>) => {
      const prevNoteIndex = state.notes.findIndex(
        (not) => not.id === action.payload.prevNoteId
      );
      if (prevNoteIndex !== -1) return;

      state.notes[prevNoteIndex] = action.payload.Note;
    },

    removeNotes: (state) => {
      const selectedNoteIds = state.selectedNote.map((note) => note.id);
      if (selectedNoteIds.length === 0) return;
      state.notes = state.notes.filter(
        (note) => !selectedNoteIds.includes(note.id)
      );
      state.selectedNote = [];
    },
  },
});

export const { addNote, removeNotes, toggelSelectedNote, updateNote } =
  noteSlice.actions;

export const selectedNotes = (state: RootState) => state.notes.notes;

export default noteSlice.reducer;
