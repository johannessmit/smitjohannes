# smitjohannes

Personal website of Johannes Spijkerman. The project was restarted from scratch in November 2026.

## Status

Planning only. There is no application code yet. The only decision made so far is the framework: React Router v8 in framework mode. See [ADR 0001](docs/adr/0001-framework-react-router.md) for the decision, the open questions (CMS, analytics, design, hosting) and the next steps.

## Prerequisites

Node.js 22.22 or newer, as required by React Router v8. Use nvm locally. The deployed app will run in Docker.

## Agentic-first

This site is developed agentic-first. Agent instructions live in [`AGENTS.md`](AGENTS.md), and `CLAUDE.md` imports it. See [ADR 0002](docs/adr/0002-agentic-first-development.md) for the reasoning.

## Previous version

The earlier Next.js and Strapi site is preserved on the `backup/legacy-site` branch.

## Decisions

Architecture decisions are recorded as ADRs in [`docs/adr/`](docs/adr/).
