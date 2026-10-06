import { Router } from "express";
import { addNote, deleteNote, findNote, getAllNotes, updateNote } from "./store.js";

export const notesRouter = Router();

// Pull a valid 'text' out of what the sender gave us, or nothing if it's bad.
function readText(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null || !("text" in body)) {
    return undefined;
  }

  const text = body.text;

  if (typeof text !== "string" || text.trim() === "") {
    return undefined;
  }

  return text.trim();
}

// GET /notes -> the whole list.
notesRouter.get("/", (req, res) => {
  res.json(getAllNotes());
});

// POST /notes -> create a new note.
notesRouter.post("/", (req, res) => {
  const text = readText(req.body);

  if (text === undefined) {
    res.status(400).json({ error: "Please send a non-empty 'text'." });
    return;
  }

  res.status(201).json(addNote(text));
});

// GET /notes/2 -> just that note.
notesRouter.get("/:id", (req, res) => {
  const note = findNote(Number(req.params.id));

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  res.json(note);
});

// PUT /notes/2 -> replace that note's text.
notesRouter.put("/:id", (req, res) => {
  const note = findNote(Number(req.params.id));

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  const text = readText(req.body);

  if (text === undefined) {
    res.status(400).json({ error: "Please send a non-empty 'text'." });
    return;
  }

  updateNote(note, text);
  res.json(note);
});

// DELETE /notes/2 -> remove that note.
notesRouter.delete("/:id", (req, res) => {
  const note = findNote(Number(req.params.id));

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  deleteNote(note);
  res.status(204).end();
});