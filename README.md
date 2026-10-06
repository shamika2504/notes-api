# Notes API

A small REST API for creating, reading, updating, and deleting notes. Built with TypeScript, Node.js, and Express as a learning project.

## Features

- Full CRUD on notes
- Input validation with clear error messages
- Notes saved to a JSON file, so they survive restarts
- JSON error responses for unknown addresses and malformed requests

## Getting started

You need [Node.js](https://nodejs.org) installed.

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

## Endpoints

| Method   | Path         | What it does      |
| -------- | ------------ | ----------------- |
| `GET`    | `/notes`     | List all notes    |
| `POST`   | `/notes`     | Create a note     |
| `GET`    | `/notes/:id` | Get one note      |
| `PUT`    | `/notes/:id` | Update a note     |
| `DELETE` | `/notes/:id` | Delete a note     |

`POST` and `PUT` expect a JSON body like `{"text": "Buy milk"}`.

## Example

```bash
curl -X POST localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy milk"}'
```

```json
{ "id": 3, "text": "Buy milk" }
```

## Project structure

```
src/
  index.ts    Starts the server and handles errors
  routes.ts   The endpoints
  store.ts    Keeps the notes and saves them to notes.json
  types.ts    The Note type
```

## Scripts

- `npm run dev` starts the server and restarts it when files change
- `npm run typecheck` checks the code for type errors