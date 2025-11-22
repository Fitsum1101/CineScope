"use client";

import { useSelector } from "react-redux";
import Notes from "./note";
import { selectedNotes } from "@/store/note-slice";

export default function NotesGrid() {
  const notes = useSelector(selectedNotes);
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <Notes {...note} />
      ))}
    </div>
  );
}
