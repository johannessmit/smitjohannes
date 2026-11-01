# ADR 0001: Stack for the personal website reboot

- Status: Accepted
- Date: 2026-11-01

## Context

The previous site (Next.js + Apollo/GraphQL frontend, Strapi backend, Docker Compose) is discarded in full. The reboot has these constraints:

- React is required. Next.js is not wanted. Remix was the preferred framework.
- The CMS can be JS, PHP or a static-site approach.
- Hosting will be a small server, so static-only hosting is not a constraint.
- No visual design is done yet. Tooling should help avoid generic AI-generated design.
- The site may grow beyond a blog, so custom features must be possible.

## Decision

### Framework: React Router v7+ framework mode

Remix 1 and 2 became React Router framework mode. "Remix 3" is a separate project that leaves React, so it is not an option. Use plain Vite, with loaders and actions. Prerender content pages and keep SSR available for dynamic routes.

### CMS: Keystatic, embedded in the app

Content lives in git as Markdoc or MDX files. There is no database and no separate CMS service. The admin UI is a route inside the same app and the same deploy.

Alternatives considered:

- **Sanity:** hosted, lock-in, GROQ. This is the fallback if Keystatic fails.
- **Payload:** self-hosted, needs a DB, Next-centric. Overkill.
- **Decap:** reported as declining.
- **Strapi:** the previous CMS, too heavy for one person.
- **PHP CMSs (WordPress, Statamic):** wrong stack.
- **Plain MDX with Zod-validated frontmatter:** the second fallback. It loses the visual editor, but migrating to it from Keystatic is trivial.

### Spike findings

A throwaway spike lives outside the repo, in the session scratchpad.

- `@keystatic/remix` peers on `@remix-run/react` 1 or 2, so it cannot be used with React Router. The adapter is about 20 lines: `makeGenericAPIRouteHandler` from `@keystatic/core/api/generic`, and `<Keystatic config={config} />` from `@keystatic/core/ui`. We write these ourselves.
- Routes needed: `route("api/keystatic/*", ...)` for the handler and `route("keystatic/*", ...)` for the admin. The API must be mounted at `/api/keystatic`, because that is the client's default path.
- Verified: the admin route server-renders (HTTP 200), and the API route reaches the Keystatic handler (400 on `/tree` without params, 404 on unknown paths).
- **Not yet verified:** the admin UI hydrating in a browser, and creating and saving an entry in local mode. This is the first task of the implementation.
- Environment: the current React Router scaffold requires Node >= 22.22. The spike ran on 22.14 with warnings.

### Analytics

Keystatic has no analytics, so it is added to the site. Use a cookie-free tool via one script tag in `root.tsx`: Umami (self-host) or Plausible. The choice is still open and does not block anything. Pricing and hosting terms have not been checked.

### Design

Nothing is designed yet. Before any UI work:

1. Define own design tokens: type, palette, spacing, motion.
2. Write a `DESIGN.md` listing banned patterns.
3. Use headless primitives (Radix or React Aria) styled by hand, not shadcn defaults.
4. Run a detect-only anti-slop audit (for example `avoid-ai-design`) as a review step.

## Consequences

- One repo and one deploy. Content history comes from git.
- We own about 20 lines of Keystatic glue, so breakage from Keystatic or React Router upgrades is ours to fix. Keystatic is pre-1.0 (0.6.x).
- Production editing needs a server runtime. This matches the plan for a small server.
- Comments, accounts and other user-generated content need a database later. Keystatic holds authored content only.

## Open items

- Confirm admin hydration and save in a browser. If it fails, fall back to plain MDX (or Sanity).
- Choose the analytics tool.
- Pin the Node version (>= 22.22) in `.nvmrc` for local work and in the Dockerfile base image. Local development uses nvm, and the deployed app runs in Docker.
- Choose the hosting provider for the Docker container.
