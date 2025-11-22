import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./note-slice";

export const store = configureStore({
  reducer: {
    notes: noteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
