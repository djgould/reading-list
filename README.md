# Shelf

A reading tracker. Keep a list of what you want to read, what you're reading now, and what you've finished, with ratings and notes.

## Status

Works for one person: the API treats every request as the demo user (Sam Rivera). Next up is letting the rest of the book club keep their own shelves.

## Stack

- React 19 + Vite 8 + Tailwind CSS 4 (`src/`)
- Express 5 API (`server/`)
- Drizzle ORM on libSQL: a local SQLite file in development, Turso in production

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` applies migrations, seeds the demo shelf on first run, then starts the API on port 3001 and Vite on port 5173. Vite proxies `/api` to the API. Open http://localhost:5173.

## Environment

| Variable | Default | Notes |
| --- | --- | --- |
| `DATABASE_URL` | `file:local.db` | libSQL URL. Use the Turso database URL in production. |
| `DATABASE_AUTH_TOKEN` | | Only needed for a remote Turso database. |
| `PORT` | `3001` | API port. |

## Changing the schema

Edit `server/db/schema.ts`, run `npm run db:generate` to write a migration to `drizzle/`, then `npm run db:setup` to apply it.

## Production

`npm run build` builds the client into `dist/`. `npm start` runs the API and serves `dist/` from the same Node process, so it deploys as a single service on Render, Railway or Fly.
