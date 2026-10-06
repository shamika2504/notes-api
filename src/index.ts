import express from "express";
import type { ErrorRequestHandler } from "express";
import { notesRouter } from "./routes.js";

const app = express();
const port = 3000;

// Lets Express read JSON that people send us.
app.use(express.json());

// Every address starting with /notes is handled by routes.ts.
app.use("/notes", notesRouter);

// Nothing above matched, so the address doesn't exist.
app.use((req, res) => {
  res.status(404).json({ error: `Nothing here: ${req.method} ${req.path}` });
});

// Something went wrong while handling a request.
const handleError: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "That isn't valid JSON." });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Something went wrong on our side." });
};

app.use(handleError);

app.listen(port, () => {
  console.log(`Notes API running at http://localhost:${port}`);
});