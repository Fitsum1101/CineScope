"use client";

import { useDispatch, useSelector } from "react-redux";
import { Note } from "../page";
import { toggelSelectedNote } from "@/store/note-slice";

const Notes = ({ id, text }: Note) => {
  const selectedNotes = useSelector((state: any) => state.notes.selectedNote);
  const dispatch = useDispatch();

  return (
    <div
      key={id}
      className={`p-4 border rounded-xl cursor-pointer transition-all ${
        selectedNotes.map((not: Note) => not.id).includes(id)
          ? "bg-red-200 text-black"
          : "bg-cyan-200  text-black"
      }`}
      onClick={() => dispatch(toggelSelectedNote({ id, text }))}
    >
      {text}
    </div>
  );
};

export default Notes;
