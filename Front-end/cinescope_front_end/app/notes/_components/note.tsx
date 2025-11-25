"use client";

import { toggelSelectedNote } from "@/store/note-slice";
import { useDispatch, useSelector } from "react-redux";
import { Note } from "../page";

const Notes = ({ id, text }: Note) => {
  const selectedNotes = useSelector((state: any) => state.notes.selectedNote);
  const dispatch = useDispatch();

  return (
    <div
      key={id}
      className={`p-4 border rounded-xl cursor-pointer transition-all ${
        selectedNotes.map((not: Note) => not.id).includes(id)
          ? "bg-red-400 text-black"
          : "bg-cyan-200  text-black"
      }`}
      onClick={() => dispatch(toggelSelectedNote({ id, text }))}
    >
      {text}
    </div>
  );
};

export default Notes;
