# ADR 0001: Core framework for the personal website reboot

- Status: Accepted for the framework only. Everything else is open.
- Date: 2026-11-01 (amended 2026-11-03)

## Context

The previous site (Next.js + Apollo/GraphQL frontend, Strapi backend, Docker Compose) is discarded in full. It is preserved on the `backup/legacy-site` branch. The reboot has these constraints:

- React is required. Next.js is not wanted. Remix was the preferred framework.
- Hosting will be a small server, so static-only hosting is not a constraint.
- No visual design is done yet. Tooling should help avoid generic AI-generated design.
- The site may grow beyond a blog, so custom features must be possible.

## Decision

**Use React Router v8 in framework mode.** This is the only decision made so far.

Remix 1 and 2 became React Router framework mode. "Remix 3" is a separate project that leaves React, so it is not an option. Use plain Vite, with loaders and actions. Content pages can be prerendered, and SSR stays available for dynamic routes.

Sources conflict on the details of React Router v8 and Remix v2 end-of-life, so check the official changelogs when starting.

## Not decided

### Content / CMS

No choice is made. Keystatic is one candidate, and a custom solution is a serious alternative.

| Option | Notes |
|---|---|
| **Keystatic** | Content as files in git, no DB, admin UI embedded in the app. Pre-1.0 (0.6.x). Needs hand-written glue for React Router (see spike findings). |
| **Custom** | For example MDX files with Zod-validated frontmatter, or a small DB-backed admin built in the app. Most flexible and least dependent on third parties. Costs the most work, and there is no ready-made editor. |
| **Sanity** | Hosted, lock-in, GROQ. |
| **Payload** | Self-hosted, needs a DB, Next-centric. Likely overkill. |
| **Decap** | Reported as declining. |
| **Strapi** | The previous CMS. Too heavy for one person. |
| **PHP CMSs (WordPress, Statamic)** | Wrong stack. |

Whichever option is chosen should keep content portable (plain files or exportable data), so switching later stays cheap.

### Spike findings (Keystatic)

A throwaway spike was built outside the repo. It is evidence for the CMS decision, not a commitment.

- `@keystatic/remix` peers on `@remix-run/react` 1 or 2, so it cannot be used with React Router. The adapter is about 20 lines: `makeGenericAPIRouteHandler` from `@keystatic/core/api/generic`, and `<Keystatic config={config} />` from `@keystatic/core/ui`. We would write these ourselves.
- Routes needed: `route("api/keystatic/*", ...)` for the handler and `route("keystatic/*", ...)` for the admin. The API must be mounted at `/api/keystatic`, because that is the client's default path.
- Verified: the admin route server-renders (HTTP 200), and the API route reaches the Keystatic handler (400 on `/tree` without params, 404 on unknown paths).
- **Not verified:** the admin UI hydrating in a browser, and creating and saving an entry in local mode.
- The React Router scaffold requires Node >= 22.22. The spike ran on 22.14 with warnings.

### Analytics

Keystatic has no analytics, and no CMS choice changes that: analytics is added to the site itself. Candidates are cookie-free tools loaded with one script tag in `root.tsx`: Umami (self-host) or Plausible. Pricing and hosting terms have not been checked.

### Design

Nothing is designed yet. Intended approach before any UI work:

1. Define own design tokens: type, palette, spacing, motion.
2. Write a `DESIGN.md` listing banned patterns.
3. Use headless primitives (Radix or React Aria) styled by hand, not shadcn defaults.
4. Run a detect-only anti-slop audit (for example `avoid-ai-design`) as a review step.

### Hosting and runtime

Stated intent, not yet formalized: a small server, with Docker for deployment and nvm for local Node versions. Node must be >= 22.22 for React Router v8. Pin it in `.nvmrc` and in the Dockerfile base image. The hosting provider is not chosen.

## Consequences

- The framework is fixed. Every other part of the stack can still change without revisiting this ADR.
- Follow-up decisions (CMS/content, analytics, design system, hosting) get their own ADRs.

## Next steps

- Decide the content approach. If Keystatic stays in the running, first confirm admin hydration and save in a browser.
- Choose the analytics tool.
- Choose the hosting provider.
