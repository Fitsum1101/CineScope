"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import NotesGrid from "./_components/notes-gris";
import { useDispatch, useSelector } from "react-redux";
import { addNote, removeNotes } from "@/store/note-slice";
import { nanoid } from "@reduxjs/toolkit";

export type Note = { id: string; text: string };

const NotesPage = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const selectedNotes = useSelector((state: any) => state.notes.selectedNote);

  const formSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addNote({ id: nanoid(), text: inputValue }));
    setInputValue("");
  };

  return (
    <div className="h-screen max-w-2xl p-6 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Notes</h1>
      <form onSubmit={formSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          className="flex-1 p-2 border rounded-xl"
          placeholder="Write a note..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>

      {selectedNotes.length > 0 && (
        <button
          className="px-4 py-2 mb-4 text-white bg-red-500 rounded-xl"
          onClick={() => {
            dispatch(removeNotes());
          }}
        >
          Delete Selected ({selectedNotes.length})
        </button>
      )}
      <NotesGrid />
    </div>
  );
};

export default NotesPage;
