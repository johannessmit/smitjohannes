# Vendored agent skills

Third-party agent skills live in `.claude/skills/`. They were installed with `skills@1.7.6` (`npx skills@1.7.6 add ...`) on 2026-11-04 and run with full agent permissions, so treat them like dependencies.

`skills-lock.json` is written by the CLI and records content hashes only. This file adds the missing commit pins, licenses and review notes.

## Pins

Each installed directory was compared with the upstream repo at the commit below (`diff -r`, no differences), so the commit is the exact content that was installed.

| Skill | Source | Commit | License |
|---|---|---|---|
| `design-taste-frontend` | `leonxlnx/taste-skill` (`skills/taste-skill`) | `12af471f627f866411b4bd785b19646d3672784c` | MIT |
| `impeccable` | `pbakaus/impeccable` (`.agents/skills/impeccable`) | `5af4319c4e7a7ee3e5e2b9fe899bcfb21c6190cb` | Apache-2.0 |
| `playwright-best-practices` | `currents-dev/playwright-best-practices-skill` | `283d5cbc5d11aac1abda058b16ad22c317d54dc0` | MIT |
| `react-router-framework-mode` | `remix-run/agent-skills` (`skills/react-router-framework-mode`) | `33578aae4aa36a90c9f8f602105a1ccb0f4efe45` | MIT |
| `vitest` | `antfu/skills` (`skills/vitest`) | `7de210b51c8d48cc405a4eac3e17cbb1396c653b` | MIT |
| `web-design-guidelines` | `vercel-labs/agent-skills` (`skills/web-design-guidelines`) | `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` | MIT, stated in the repo README only (no `LICENSE` file; GitHub detects none) |

## Reinstall at a pinned commit

The CLI has no ref flag. It accepts a GitHub tree URL, but it is **unverified** that it installs that exact commit. Check after every reinstall:

```sh
npx skills@1.7.6 add "https://github.com/<owner>/<repo>/tree/<commit>" --skill <name> -a claude-code -y
git status --short .claude skills-lock.json   # must show no changes
```

If anything changed, the install did not match the pin. Review the diff before committing it.

## Review notes

This is a pattern scan plus a read of the flagged spots, not a full audit. A first version of this note wrongly said no process spawning was found (the scan output was truncated); the corrected list is below.

- `design-taste-frontend/scripts/lib/cdp.mjs`: imports `spawn` and `spawnSync` from `node:child_process`. It launches a local headless Chrome, Edge or Chromium (found automatically or via `CHROME_PATH`) with a throwaway profile in the temp dir (`TASTE_SKILL_TMP` overrides it), talks to it over the DevTools protocol, and kills it on exit (`taskkill` on Windows). Reviewed: no remote code, arguments are fixed.
- `design-taste-frontend/scripts/assets.mjs`: fetches public image and video APIs (Openverse, Wikimedia Commons, Art Institute of Chicago, The Met, Internet Archive, NASA), only when the script is run.
- `impeccable/scripts/impeccable` (shell launcher): can download a binary from `github.com/pbakaus/impeccable/releases` with `curl` or `wget`, and checks its sha256 against `engine-checksums.txt` before running. It refuses unverified downloads.
- `impeccable/reference/hooks.md`: the skill's `hooks on` command installs a post-edit hook that runs the design detector. For Claude Code it writes `.claude/settings.local.json` (project) or `~/.claude/settings.json` (user); it can also write Codex, Cursor, Copilot, Grok and Gemini hook files. Nothing installs it until that command is run.
- `impeccable/scripts/live-browser*.js`: browser-side code that uses `fetch`.

## Rules for agents and humans

- Ask before running any script under `.claude/skills/*/scripts/`, any command that downloads a binary, or `impeccable hooks on`. Say what it will execute, spawn or write first.
- Do not install skill hooks (`.claude/settings*.json`, `.codex/`, `.cursor/` and similar) without the user's explicit approval, and review the resulting diff.
- Do not edit the vendored files by hand. Update by reinstalling, then review the diff and update the pins above.
