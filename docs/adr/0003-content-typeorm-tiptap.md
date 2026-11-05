# ADR 0003: Content in Postgres via TypeORM, edited with Tiptap

- Status: Proposed
- Date: 2026-11-05

## Context

ADR 0001 left content/CMS open. The owner wants to experiment with TypeORM and Tiptap instead of content-as-files. The site is one stream of dated entries (projects and posts), edited by one person.

The initial design phase uses mock-up data and builds no database, editor or auth. This ADR fixes the direction for the phase after that.

## Decision

- **Storage:** Postgres, accessed with TypeORM. Postgres runs as a service in `compose.yml`.
- **Editor:** Tiptap in an `/admin` route. Entry bodies are stored as Tiptap JSON (`jsonb`).
- **Rendering:** the server turns the JSON into HTML with `@tiptap/html`. Public pages ship no editor code.
- **Boundary:** only React Router loaders and actions touch TypeORM. UI components never import it.
- **Auth:** one admin password from an env var, checked into a signed session cookie. No user table.
- **Styling:** plain CSS with tokens, no styling library, until a later ADR says otherwise.

## Consequences

- Content is no longer plain files. This cuts against the "keep content portable" convention in `AGENTS.md`. Mitigation: provide an export command that dumps entries to JSON/Markdown. Unverified until built.
- Agentic-first (ADR 0002) needs the DB to be reproducible: migrations in the repo, a seed script, and a test database in CI. This adds a Postgres service to the CI e2e job.
- Vite compiles TypeScript with esbuild, which does not support `emitDecoratorMetadata`. Every TypeORM column must declare its type explicitly. Unverified: confirm with a spike before building on it.
- Stored Tiptap JSON depends on the extension set. Changing extensions may need a content migration. Keep the set small at first.
- `AGENTS.md` ("Current state", "Stack") must be updated when this is accepted.
