import express from "express";

// The shape every note must have. TypeScript checks this for us.
type Note = {
  id: number;
  text: string;
};

const app = express();
const port = 3000;
app.use(express.json());

// Our "database" for now: a list that lives in memory.
const notes: Note[] = [
  { id: 1, text: "Learn what a REST API is" },
  { id: 2, text: "Build one in TypeScript" },
];
let nextId = 3;

// When someone visits GET /notes, send back the list as JSON.
app.get("/notes", (req, res) => {
  res.json(notes);
});

// When someone sends POST /notes, create a new note.
app.post("/notes", (req, res) => {
  const text: unknown = req.body?.text;

  // Check the data before trusting it.
  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Please send a non-empty 'text'." });
    return;
  }

  const newNote: Note = { id: nextId, text: text.trim() };
  nextId = nextId + 1;
  notes.push(newNote);

  res.status(201).json(newNote);
});

// Find one note by the id in the address, e.g. /notes/2
function findNote(idFromUrl: string): Note | undefined {
  const id = Number(idFromUrl);
  return notes.find((note) => note.id === id);
}

// GET /notes/2 -> send back just that note.
app.get("/notes/:id", (req, res) => {
  const note = findNote(req.params.id);

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  res.json(note);
});

// PUT /notes/2 -> replace that note's text.
app.put("/notes/:id", (req, res) => {
  const note = findNote(req.params.id);

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  const text: unknown = req.body?.text;

  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Please send a non-empty 'text'." });
    return;
  }

  note.text = text.trim();
  res.json(note);
});

// DELETE /notes/2 -> remove that note.
app.delete("/notes/:id", (req, res) => {
  const note = findNote(req.params.id);

  if (note === undefined) {
    res.status(404).json({ error: "Note not found." });
    return;
  }

  notes.splice(notes.indexOf(note), 1);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Notes API running at http://localhost:${port}`);
});