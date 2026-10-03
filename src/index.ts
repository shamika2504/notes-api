import express from "express";

// The shape every note must have. TypeScript checks this for us.
type Note = {
  id: number;
  text: string;
};

const app = express();
const port = 3000;

// Our "database" for now: a list that lives in memory.
const notes: Note[] = [
  { id: 1, text: "Learn what a REST API is" },
  { id: 2, text: "Build one in TypeScript" },
];

// When someone visits GET /notes, send back the list as JSON.
app.get("/notes", (req, res) => {
  res.json(notes);
});

app.listen(port, () => {
  console.log(`Notes API running at http://localhost:${port}`);
});