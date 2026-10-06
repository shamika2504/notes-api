import { existsSync, readFileSync, writeFileSync } from "node:fs";
import type { Note } from "./types.js";

// The file where notes are stored between restarts.
const dataFile = "notes.json";

// Read the notes from the file, or start with two examples.
function loadNotes(): Note[] {
  if (!existsSync(dataFile)) {
    return [
      { id: 1, text: "Learn what a REST API is" },
      { id: 2, text: "Build one in TypeScript" },
    ];
  }

  const fileContents = readFileSync(dataFile, "utf8");
  return JSON.parse(fileContents) as Note[];
}

// Write the current notes to the file.
function saveNotes(): void {
  writeFileSync(dataFile, JSON.stringify(notes, null, 2));
}

const notes: Note[] = loadNotes();

// The id the next new note will get: one more than the biggest so far.
let nextId = Math.max(0, ...notes.map((note) => note.id)) + 1;

export function getAllNotes(): Note[] {
  return notes;
}

export function findNote(id: number): Note | undefined {
  return notes.find((note) => note.id === id);
}

export function addNote(text: string): Note {
  const newNote: Note = { id: nextId, text };
  nextId = nextId + 1;
  notes.push(newNote);
  saveNotes();
  return newNote;
}

export function updateNote(note: Note, text: string): void {
  note.text = text;
  saveNotes();
}

export function deleteNote(note: Note): void {
  notes.splice(notes.indexOf(note), 1);
  saveNotes();
}