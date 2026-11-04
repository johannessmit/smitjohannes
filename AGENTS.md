# AGENTS.md

Instructions for AI coding agents working in this repo. `CLAUDE.md` imports this file, so keep all shared rules here.

## Project

Personal website of Johannes Spijkerman, restarted from scratch in November 2026. This site is developed agentic-first: agents write most code, a human directs and reviews. See [ADR 0002](docs/adr/0002-agentic-first-development.md).

## Current state

Planning only. No application code yet. Decided: React Router v8 in framework mode. Open: CMS/content, analytics, design system, hosting. Do not pick an open item on your own. Propose it and write an ADR.

The old Next.js/Strapi site lives on the `backup/legacy-site` branch. Do not port code from it unless asked.

## Stack and prerequisites

- React Router v8, framework mode (Vite based). Not Next.js, not Remix.
- Node.js >= 22.22 (nvm locally, Docker for deploy).
- Category: portfolio (personal site with landing page). TypeScript throughout.
- Tooling: pnpm, Biome (lint and format), Vitest (unit), Playwright (e2e).
- Styling, CMS/content, analytics, design system and hosting are still open. See "Current state".

## Commands

TODO(setup): fill in step 7

## Conventions

- Decisions go in `docs/adr/` as numbered ADRs. Follow the style of existing ones: short, sourced, honest about what is unverified.
- Write down anything a future agent would need to ask about. Update this file when conventions change. Stale instructions are a bug.
- No generic AI-looking UI. Before UI work, read `DESIGN.md` (once it exists) and follow its tokens and banned patterns.
- Keep content portable: plain files or exportable data.

## Workflow

- Work on a branch, never directly on `main`. Open a PR for human review.
- Keep changes small and scoped to the request.
- Verify before claiming done: run the checks and report real output. Say so when something is unverified or skipped.
- Ask before destructive or outward-facing actions (force push, deleting branches, deploys, publishing).
- Never commit secrets or `.env` files.
