# ADR 0002: Agentic-first development

- Status: Accepted
- Date: 2026-11-03

## Context

The site is being rebuilt from scratch (see [ADR 0001](0001-framework-react-router.md)). It is a one-person project, and AI coding agents will do most of the implementation work. The repo should be set up for that from the start, instead of adapting a human-first repo later.

## Decision

**This site is developed agentic-first.** AI coding agents are the primary authors of code. A human sets direction and reviews the result.

In practice:

- `AGENTS.md` at the repo root is the single source of truth for agent instructions: commands, conventions, boundaries. `CLAUDE.md` imports it, so Claude Code and other agents read the same rules.
- Decisions, conventions and constraints are written down in the repo (ADRs, `AGENTS.md`, later `DESIGN.md`), not kept in anyone's head. If an agent would need to ask, the answer belongs in a file.
- Prefer choices that agents can verify themselves: typed code, automated checks (typecheck, lint, tests, build) and fast feedback. Agents run these checks before claiming work is done.
- Prefer plain files, explicit conventions and boring, well-documented tools over hidden state or click-driven configuration.
- Changes go through branches and pull requests, so a human can review every agent change.

## Consequences

- Agentic-first is a standing constraint on later decisions. A choice that agents cannot read, run or verify needs a strong reason. This weighs on the open content/CMS decision in ADR 0001.
- Agent instruction files must be kept current. Stale `AGENTS.md` content is a bug.
- Once the app is scaffolded, `AGENTS.md` must list the real commands for install, dev, build, typecheck, lint and test.
