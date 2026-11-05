# DESIGN.md

Visual system for the personal site. Read this before any UI work. Tokens live in `app/app.css`. Status: initial design, built on sample content (`app/content/entries.ts`).

## Idea

One feed of dated entries, newest first. Projects and posts are the same kind of thing. Three materials, each with one flat colour: **hardware** (orange), **software** (blue), **design** (yellow). The colour tells you what an entry is made of. Size tells you its weight.

Loud and experimental. Nothing is decorated: the type, the colour cuts and the scale do all the work.

## Colour

One ground, one ink, three fields. No gradients, shadows or outlines. Surfaces are separated by a step in colour.

| Token | Value | Use |
| --- | --- | --- |
| `--ground` | `#efede6` | Page, header, intro |
| `--ink` | `#0f0e0c` | Text on ground |
| `--hardware` / `--on-hardware` | `#ff5a1f` / `#120d0a` | Hardware entries |
| `--software` / `--on-software` | `#2b45ff` / `#f6f3ea` | Software entries |
| `--design` / `--on-design` | `#ffd60a` / `#100e00` | Design entries |

- Each field's text colour is the `--on-*` partner. Computed WCAG contrast: ground/ink 16.5, hardware 6.2, software 5.6, design 13.7 (all pass AA for body text). Re-check if a value changes.
- **Tone:** a neighbour of the same material flips to "ink" (field and ink swapped), so two entries never merge into one band. Logic is `assignTones` in `app/content/feed.ts`.
- Light only. Fields are fixed colours and do not invert. A dark mode needs its own decision.
- Banned: violet or indigo, cream-and-terracotta, any gradient.

## Type

One family: **Anybody** (variable, weight and width axes), self-hosted through `@fontsource-variable/anybody`. Chosen for its width axis, which carries the one motion below, and its blunt, loud character.

| Role | Size | Width / weight |
| --- | --- | --- |
| Display (intro, full entries) | `clamp(2.5rem, 9vw, 9rem)`, 7.8vw on phone intro | 78% / 850 |
| Column title, footer name | `clamp(2rem, 4.4vw, 4rem)` | 78% / 850 |
| Line title | `clamp(1.5rem, 3.2vw, 2.75rem)` | 88% / 850 |
| Statement | 1.375rem | 100% / 450 |
| Body, facts | 1rem to 1.125rem | 100% / 450 to 650 |

- Headlines run two lines or fewer at every width. Keep titles under about 40 characters and check at 390px and 1440px.
- Tracking `-0.02em` on display. Line height `0.92` to `1`. Numerals are tabular.
- Never a second family.

## Layout

- 12-column grid, one pair of equal outer margins (`--margin`). Large things run to the edges.
- Feed entries come in three sizes:
  - **full:** a whole screen. The title hangs at one side, the summary and facts answer at the other. Alternates left and right.
  - **column:** a huge date on one side, title and summary on the other. Alternates sides.
  - **line:** one row (title, material, date). Inverts on hover.
- Neighbouring entries use different sizes where the content allows.
- Phone is its own composition: stacked, full entries drop to `70svh`, no row is cut off.

## Motion

One authored moment. Titles of full and column entries open from a narrow cut (`font-stretch: 50%`) to their resting width (`78%`) as they scroll into view, using CSS `animation-timeline: view()`.

- The resting width is the default, so browsers without support and `prefers-reduced-motion` users see the final state.
- Controls (filters, line entries) change colour in 160 to 200ms, ease-out.
- No other animation.

## Components

- **Header:** sticky, ground colour, wordmark left, filter links right. Active filter takes its material colour. Tap targets at least 44px.
- **Filters:** real links to `/?material=…`. Work without JavaScript. Unknown values fall back to all.
- **Focus:** 3px outline in the current text colour, offset 3px.
- **Browser surfaces:** selection, scrollbar and focus ring are themed from the tokens.

## Banned in this repo

Eyebrow labels above headings, pill badges, index numbering (01, 02), thin rules and outlined boxes, gradients, shadows on resting elements, glass and blur, icon-topped cards, rows of identical cards, emoji, monospace outside code, a second typeface, a styled accent word in a headline.

## Content rules

- Sample content is marked in the source and in the footer. Never present invented work as real.
- No invented proof (clients, quotes, numbers, press).

## Open and unverified

- Entry page (`/e/:slug`) and `/about` layouts are not designed yet. Feed titles do not link anywhere yet.
- No pictures yet. Project covers, if any, need a decision on source and treatment.
- `impeccable detect` on `app/components` and `app/routes` found nothing. The page has not been through the design-taste inspector (`inspect.mjs`).
- Dark mode, print styles and RSS are out of scope.
