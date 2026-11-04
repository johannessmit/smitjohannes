# AGENTS.md

Instructions for AI coding agents working in this repo. `CLAUDE.md` imports this file, so keep all shared rules here.

## Project

Personal website of Johannes Spijkerman, restarted from scratch in November 2026. This site is developed agentic-first: agents write most code, a human directs and reviews. See [ADR 0002](docs/adr/0002-agentic-first-development.md).

## Current state

Bare React Router v8 scaffold (placeholder home page, no styling library). Decided: React Router v8 in framework mode. Open: CMS/content, analytics, design system, hosting. Do not pick an open item on your own. Propose it and write an ADR.

The old Next.js/Strapi site lives on the `backup/legacy-site` branch. Do not port code from it unless asked.

## Stack and prerequisites

- React Router v8, framework mode (Vite based). Not Next.js, not Remix.
- Node.js >= 22.22 (nvm locally, Docker for deploy). Pinned to 22.23.4 in `.nvmrc` (local and CI) and in the `compose.yml` image. Change all three together.
- Category: portfolio (personal site with landing page). TypeScript throughout.
- Tooling: pnpm, Biome (lint and format), Vitest (unit), Playwright (e2e).
- Styling, CMS/content, analytics, design system and hosting are still open. See "Current state".

## Commands

Use Node >= 22.22 (`nvm use`), pnpm.

- Install: `pnpm install`
- Dev: `pnpm dev` (http://localhost:5173), or `docker compose up`
- Build: `pnpm build`
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint` (Biome). Format and autofix: `pnpm format`
- Unit tests: `pnpm test` (Vitest)
- E2E tests: `pnpm test:e2e` (Playwright, run `pnpm exec playwright install chromium` once)

Run typecheck, lint and test before claiming work is done. CI (`.github/workflows/ci.yml`) runs typecheck, lint, test and build in one job and Playwright e2e in another, on every PR and push to `main`. Keep it green and keep it in sync with the commands above. Both jobs passed on PR #7 (2026-11-05). Actions are pinned to commit SHAs.

`docker compose up` needs a `.env` (`cp .env.example .env`).

## Vendored agent skills

`.claude/skills/` holds third-party agent skills installed with `npx skills@1.7.6 add <repo> --skill <name> -a claude-code -y`. `skills-lock.json` records them by content hash only, because the CLI has no ref flag. Commit pins, licenses and review notes are in [`docs/vendored-skills.md`](docs/vendored-skills.md). They run with full agent permissions.

- Installed content was verified identical to the pinned upstream commits. Reinstalling at a pinned commit is unverified, see the doc.
- Licenses are recorded. The scripts got a pattern scan, not a full audit. Some spawn processes, download binaries or can install hooks: ask before running them (rules in the doc).
- Do not edit them by hand. Update by reinstalling, review the diff, and update the doc.

## Known temporary scaffold leftovers

`app/root.tsx` still has the scaffold's Inter font link and dead Tailwind class names. Both are marked `TEMPORARY` in the code and go away when styling and the design system are decided.

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
