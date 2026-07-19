# Le Cahier marketing-site launch runbook (2026-07-19)

Goal: bring the marketing site (this repo, `french-web`, Astro -> Cloudflare Workers
`lecahier-web`) live on the apex, coordinated with the already-live app + API.

## Target topology

| Host | Serves | Platform |
| ---- | ------ | -------- |
| `lecahier.courses` + `www.lecahier.courses` | Marketing (this repo) | CF Workers `lecahier-web` |
| `app.lecahier.courses` | App SPA (`french-app/web`) | CF Pages `lecahier` |
| `api.lecahier.courses` | API | Railway service `web` |

## Starting state (2026-07-19)

- Apex `lecahier.courses` currently serves the APP (Pages `lecahier`) - it is squatting
  on the apex the marketing site is designed to own. Confirmed live: `<title>web</title>`.
- `api.lecahier.courses/health` -> `{"status":"ok"}`. API stays put, untouched.
- No real prod users yet (first email sign-in test was never run), so moving the app off
  the apex is low-risk.
- App is fully domain-agnostic: no hardcoded `lecahier.courses` in `french-app/web` or
  backend. Moving its host is pure dashboard config, no app code change.

## Decisions

- App moves to **`app.lecahier.courses`**.
- Marketing deploys via **Workers Builds** (git CI, push-to-main), matching the app's Pages
  git integration.

## Ordering constraint

The marketing Worker's first `wrangler deploy` provisions the apex custom domain, and that
**fails if the apex already has a proxied DNS record** (the app's `@` CNAME). So: stand the
app up on its subdomain FIRST (additive, no downtime), THEN free the apex, THEN deploy
marketing. Never free the apex before `app.lecahier.courses` is verified working.

---

## Phase 1 - Stand up app at app.lecahier.courses (additive, no downtime)

1. **Cloudflare DNS** (zone lecahier.courses): add `app` CNAME -> `lecahier.pages.dev`,
   **orange/proxied** (Pages is CF-native, same as the apex record today).
2. **Cloudflare Pages** project `lecahier` -> Custom domains -> add `app.lecahier.courses`.
3. **Clerk (prod instance)** -> add `app.lecahier.courses` to allowed origins / redirect URLs.
4. **Railway** service `web` -> env:
   - `CORS_ALLOW_ORIGINS` = `https://app.lecahier.courses,https://lecahier.courses,https://lecahier.pages.dev`
     (keep apex during transition; narrow in Phase 4).
   - `CLERK_AUTHORIZED_PARTIES` = `https://app.lecahier.courses,https://lecahier.courses`
     (the app SPA that mints tokens now lives at app.*; keep apex until cutover).
5. **Verify**: `https://app.lecahier.courses` loads the app, sign-in works, API calls succeed
   (no CORS errors in console). App is now reachable at BOTH apex and app.* - fine.

## Phase 2 - Free the apex

Only after Phase 1 verified.

1. **Cloudflare Pages** `lecahier` -> Custom domains -> remove `lecahier.courses` (keep app.*).
2. **Cloudflare DNS** -> delete the `@` apex CNAME -> `lecahier.pages.dev` (and any stray
   `www` record). Leave Clerk records (`clerk`, `accounts`, `clkmail`, `clk*._domainkey`) and
   the `api` CNAME + MX/SPF untouched.
3. Apex is now unclaimed and free for the Worker to provision.

## Phase 3 - Deploy marketing via Workers Builds

Repo is ready: `compatibility_date` bumped to `2026-07-19`, build is green (`npm run build`).

1. **Cloudflare** -> Workers & Pages -> Create -> Workers -> **Import a repository** ->
   authorize CF GitHub app for `shango/french-web`.
2. Name the Worker **`lecahier-web`** (MUST match `name` in `wrangler.jsonc`, or the git
   connection and the deploy command target different Workers).
3. **Build settings**: Root `/`, Build command `npm run build`, Deploy command `npx wrangler deploy`.
4. **Build variables** (inlined into client bundle at build time):
   - `PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_live_Y2xlcmsubGVjYWhpZXIuY291cnNlcyQ` (same prod
     Clerk instance as the app - accounts portable across marketing/app/iOS).
   - `PUBLIC_APP_URL` = `https://app.lecahier.courses` (where /start sends users post-signup).
   - `PUBLIC_CF_ANALYTICS_TOKEN` = optional; leave blank to disable.
5. **Runtime secret** (Worker -> Settings -> Variables and Secrets, encrypted):
   - `CLERK_SECRET_KEY` = `sk_live_...` (same prod instance; used by Clerk middleware on /start).
6. First build/deploy **provisions apex + www custom domains + certs** (from `wrangler.jsonc`
   routes). Needs the apex free (Phase 2). Watch build logs in the Worker's Deployments tab.

## Phase 4 - Clerk origins + end-to-end verification

1. **Clerk (prod)** -> add `lecahier.courses` + `www.lecahier.courses` to allowed origins
   (the /start SignUp widget runs on the marketing Worker at the apex).
2. **Verify live**:
   - `https://lecahier.courses` serves the marketing landing (Le Cahier), NOT `<title>web</title>`.
   - `https://lecahier.courses/start` renders the Clerk sign-up island.
   - Completing sign-up redirects to `https://app.lecahier.courses`.
   - `https://app.lecahier.courses` serves the app; sign-in works; no CORS errors.
   - `https://www.lecahier.courses` serves / redirects to apex.
   - `https://api.lecahier.courses/health` -> `{"status":"ok"}` (unchanged).
3. **Cleanup**: narrow Railway `CORS_ALLOW_ORIGINS` to
   `https://app.lecahier.courses,https://lecahier.pages.dev` and `CLERK_AUTHORIZED_PARTIES`
   to `https://app.lecahier.courses` (apex is now marketing, never calls the API).

## Known non-blockers / polish (optional, later)

- App browser tab title is literally `web` (`french-app/web/index.html` + SPA). Cosmetic;
  worth setting to "Le Cahier" but not part of this launch.
- Still-pending prod items from the app deploy (see french-app memory
  `prod-deploy-lecahier-courses`): first email sign-in test, Google OAuth prod credentials.
