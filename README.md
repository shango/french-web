# Le Cahier - marketing site

The marketing + sign-up site for **Le Cahier**, a French vocabulary primer. Static,
content-first pages plus a single Clerk-backed sign-up route (`/start`), deployed to
**Cloudflare Workers**.

The learning app itself lives in the sibling `french-app/` repo; this site's job is to
pitch it and hand new users into Clerk.

## Stack

- **Astro 6** (`output: 'static'`, hybrid) - every page prerenders to HTML except `/start`,
  which opts into on-demand rendering (`export const prerender = false`).
- **@astrojs/cloudflare v13** - Workers adapter. Static pages build to `dist/client`; the
  Worker (`dist/server`) runs only for `/start`.
- **@clerk/astro** - the sign-up island on `/start`. (Astro is pinned to 6.x because
  `@clerk/astro` does not yet support Astro 7.)
- **@astrojs/sitemap** - emits `sitemap-index.xml` at build.
- Self-hosted subset fonts (EB Garamond / Hanken Grotesk); design tokens in
  `src/styles/tokens.css`.

## Scripts

| Command           | What it does                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Astro dev server (Vite) at `localhost:4321`.             |
| `npm run build`   | Build to `dist/` (`dist/client` static + `dist/server`). |
| `npm run preview` | Build, then serve the real edge build via `wrangler dev`.|
| `npm run deploy`  | Build, then `wrangler deploy` to Cloudflare Workers.     |
| `npm run check`   | `astro check` (types + template diagnostics).            |

`npm run dev` is fastest for iterating on the static pages. Use `npm run preview` to
exercise `/start` against the actual workerd runtime (this is the only way to reproduce the
Worker behavior locally).

## Environment variables

Copy `.env.example` to `.env` and fill in. Two categories:

**Build-time (`PUBLIC_*`)** - inlined into the client bundle when `astro build` runs, so they
must be present in the environment at build time (locally in `.env`, or as build vars in CI):

- `PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key (safe in the browser).
- `PUBLIC_APP_URL` - where `/start` sends users after sign-up (the web app, no trailing slash).
- `PUBLIC_CF_ANALYTICS_TOKEN` - optional Cloudflare Web Analytics token; leave blank to disable.

**Runtime secret** - read by Clerk's middleware inside the Worker, never exposed to the client.
Set it as a Worker secret, not in `.env`:

```bash
wrangler secret put CLERK_SECRET_KEY
```

Use the **same Clerk instance as the app** so accounts are portable across web and iOS.

## Deploying

One-time setup:

```bash
wrangler login                       # authenticate against your Cloudflare account
wrangler secret put CLERK_SECRET_KEY # set the server-side Clerk key
```

Then, with the `PUBLIC_*` vars present in your shell/`.env`:

```bash
npm run deploy
```

This runs `astro build && wrangler deploy`. Deploy config lives in `wrangler.jsonc`:

- `main: "@astrojs/cloudflare/entrypoints/server"` - Astro 6's unified Worker entrypoint.
- `assets` - serves `dist/client`; the Worker only runs for routes with no static file.
- `compatibility_flags` - `nodejs_compat` (Clerk's middleware imports `node:` built-ins) and
  `global_fetch_strictly_public` (Astro's recommended SSR default).

Update `compatibility_date` to the day you deploy, and set the production origin in
`astro.config.mjs` (`const SITE`) so canonical URLs, the sitemap, and OG image URLs are absolute.

### First deploy note - SESSION KV

Astro 6's Cloudflare adapter always enables KV-backed sessions, so the Worker carries a
`SESSION` KV binding even though this site never uses `Astro.session` (Clerk auth lives in
cookies). Wrangler provisions that namespace on your first deploy. To pin it (e.g. for CI):

```bash
wrangler kv namespace create SESSION
```

then add the returned id to `wrangler.jsonc` under `kv_namespaces`.

## Notes

- **`/start` needs real Clerk keys.** With no keys set, Clerk runs in keyless dev mode and
  throws a JWK `kid`-mismatch handshake error locally - environmental, not a code bug. Real
  matching keys resolve it.
- **JS budget.** The marketing pages ship no islands of their own; the only client JS is
  `@clerk/astro`'s ~7 KB (gzip) bootstrap, which every page carries by design. The heavier
  `clerk-js` bundle is CDN-hotloaded only when a Clerk component mounts (i.e. on `/start`).
- Run Lighthouse against a deployed preview rather than `npm run dev`, since `/start` needs
  the edge runtime.
