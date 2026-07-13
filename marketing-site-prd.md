# Le Cahier — Marketing Site PRD

*The product & scaffold brief for the public Astro site (marketing + start-free signup).
Pairs with `french-vocab-astro-site-brief.md` (visual direction — inherits the finished
app look) and the app's own spec/README. This document owns the **what, why, structure,
and copy**; the design brief owns **look and feel**. Where they touch, the design brief
governs visuals and this doc governs content and behavior.*

---

## 1. Overview

Le Cahier is a French **vocabulary primer**: it gets English speakers a real,
high-frequency base (~400 words / Level 1), then graduates them to formal grammar study.
The app is built and its design is final. **This site does not yet exist** — it's the
public front door: a small marketing site plus the start-free signup, built in **Astro**,
carrying the app's "Le Cahier" identity, and creating the account that then works across
web, iOS, and (later) Android.

**This document is for the person scaffolding the site** (Claude Code or a developer). It
defines the pages, the technical shape, the signup/handoff, and the actual copy to place.
It is *not* a redesign of the app — see the design brief's Scope note.

---

## 2. Goals & non-goals

**Primary goal:** get the *right* visitor to **start the free trial**. Signing up here
creates the portable Clerk account that unlocks the app on every client.

**Secondary goals:** communicate the honest positioning (a base you finish and leave with,
not a forever-app); qualify fit (beginners + restarters, not the already-conversational);
be fast and calm enough that the site itself feels like the product's ethos.

**Non-goals (out of scope):** the app itself and its onboarding (the app owns "Why French?"
and the placement probe); a blog/CMS; a community; marketplace/affiliate content; any dark
pattern. No redesign or restyle of any app screen.

---

## 3. Audience

- **Absolute beginners** who want real ground before grammar and are wary of gamey apps.
- **Restarters** who had French in school, remember some, and resent grinding *être* and
  *avoir* from zero — they want to prove what they know and skip ahead.

Both are tired of apps that assume they already speak French or are built to keep them
subscribed forever. The site should speak to that fatigue plainly and qualify hard: a
well-matched signup beats a big soft funnel.

---

## 4. Information architecture

A few content pages plus the signup. Keep it small.

| Route | Purpose | Primary action |
|---|---|---|
| `/` (Home) | The pitch: promise, counter-positioning, cognate windfall, real product glimpses, graduation payoff, who-it's-for | Start free |
| `/how-it-works` | Earn trust by showing the honest method end-to-end, with real app surfaces | Start free |
| `/pricing` | Convert; reconcile "we want you to leave" with a subscription — finite & fair; includes FAQ | Start free |
| `/start` | The signup (Clerk island): create account + begin trial, then hand into the app | Continue with Apple / Google / email |
| `/privacy`, `/terms` | Legal (required for a SaaS + App Store) | — |
| `404` | On-brand "this page isn't in the primer" | Home |

FAQ lives as a section on `/pricing` (and can also render standalone at `/faq` from the
same content collection).

---

## 5. Technical scaffold (Astro)

The site is **content-first with a single interactive island** (signup). That structure is
the point: fast static pages keep the "respects your time" promise literal; a slow
marketing site would undercut the pitch.

**Stack**
- **Astro** (latest), TypeScript.
- **Signup island:** React island via `@astrojs/react`, or Clerk's Astro SDK
  (`@clerk/astro`) — either is fine; the island is the only shipped JS of consequence.
- **Auth:** **Clerk** (Apple / Google / email federation), same instance as the app so the
  account is portable. The site only needs sign-up + redirect; the app verifies the Clerk
  JWT as it already does.
- **Hosting:** **Cloudflare Pages** with Astro's Cloudflare adapter (hybrid: static
  marketing pages, SSR/edge for the signup route) — consistent with the app's existing
  Cloudflare usage. (Vercel/Netlify are acceptable alternatives.)
- **Analytics:** privacy-first only — **Cloudflare Web Analytics** or Plausible. No
  invasive tracking, no ad pixels, no session replay. This matches the no-dark-patterns
  ethos and is itself a selling point.

**Suggested structure**
```
src/
  pages/            index.astro · how-it-works.astro · pricing.astro · start.astro
                    privacy.astro · terms.astro · 404.astro
  layouts/          BaseLayout.astro        (shell: header, footer, <head>/SEO)
  components/       Header · Footer · Hero · WordOnRule (signature) · Section
                    Windfall · CardShowcase · DashboardShowcase · GraduationShowcase
                    PricingPanel · FAQ · CTA · SealMark
  components/       SignupIsland.tsx         (Clerk; client:load — the one real island)
  content/          faq/  (content collection: question + answer entries)
                    (optional) meta/ for shared strings
  styles/           tokens.css               (Le Cahier tokens — see below)
public/
  fonts/            EB Garamond + Hanken Grotesk (self-hosted woff2, subset)
  og/               social share images
astro.config.mjs    integrations: react (or @clerk/astro), sitemap, cloudflare adapter
```

**Design tokens — inherit, don't fork.** Mirror the app's final Le Cahier values into
`src/styles/tokens.css` as CSS variables so the site and app cannot drift: `paper #FCFAF3`,
`ink #1E2A44`, `red #C4362F`, `green #2E7D5B`, `gold #C29A3B`, `rule-violet #C9BEE6`, plus
`le #435E7E` / `la #8B5A78`. Fonts: **EB Garamond** (serif, headings + French words) and
**Hanken Grotesk** (sans, UI/body). Full token list and usage: the app README + the design
brief. *(Ideally these live in one shared source both projects import.)*

**Config / env:** `PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `PUBLIC_APP_URL`
(post-signup redirect target — the web app), analytics id.

**Performance & SEO budget:** Lighthouse ≥95 across the board; ship near-zero JS off the
signup route; self-host subset fonts; semantic HTML; per-page `<title>`/meta + OG images;
`sitemap.xml`; `robots.txt`.

---

## 6. Signup flow & app handoff

1. Any **Start free** CTA → `/start`.
2. `/start` renders the **Clerk** sign-up (Continue with Apple / Google / email). Trial
   terms and any card requirement are stated **before** the button — ideally no card to
   begin.
3. On success, Clerk creates the account and session → **redirect to `PUBLIC_APP_URL`**
   (the app), which begins first-run onboarding ("Why French?" + optional placement probe).
   The account is portable, so it also unlocks iOS/Android.
4. The site does **account + start-trial only**. It never duplicates or gates the app's
   onboarding. *(Optional: a light "Why French?" teaser may appear as marketing on the
   site, but the real onboarding lives in the app.)*

**Honesty guardrails (Firm):** no surprise credit-card wall, no pre-checked upsells,
cancel path stated plainly, "your words are always yours to export." This screen is where
trust is won or lost.

---

## 7. Site copy

Voice: warm, plain, a little literary, honest, quietly witty — a thoughtful teacher who
respects your time, never a growth marketer. Everything below is real copy to place;
bracketed `[…]` items are placeholders for you to fill (price, legal specifics). Product
name is written as **Le Cahier** to match the app wordmark; if the final name changes,
swap globally.

**Claims & evidence (Firm).** Where copy references the learning science, frame it as
**spaced repetition**, **active recall with instant feedback**, and **thematic /
situational grouping** — and *never* as "lexical sets" or "semantic sets." In the research,
those terms name the technique that *backfires* (same-category word lists interfere with
each other); the situational grouping we actually use is the opposite, better-supported
method. Don't invent a "learn X% faster" figure — there isn't a clean one, and it's the
first thing a skeptic disproves. State effects in plain language ("one of the most
replicated findings in learning science"). Receipts and effect sizes:
`learning-science-evidence.md`.

### 7.1 Header / footer
- **Nav:** Le Cahier · How it works · Pricing · **Start free**
- **Footer tagline:** *A French vocabulary primer. Built to be finished.*
- **Footer promise line:** No ads. No streaks-as-guilt. Your words are always yours to
  export.
- **Footer links:** How it works · Pricing · FAQ · Privacy · Terms · Contact
- **Footer sign-off:** *Made for people who want to finish.*

### 7.2 Home

**Hero**
- Eyebrow: *Le Cahier · a French vocabulary primer*
- Headline: **French, built to be finished.**
- Subhead: A vocabulary primer for English speakers starting — or restarting — French.
  Le Cahier drills the words that actually carry a sentence until they stick, hands you a
  certificate, and shows you the door. On purpose.
- Primary CTA: **Start free** · Secondary: **See how it works**

**Counter-positioning**
- Heading: **Most apps are built to keep you. This one is built to let you go.**
- Body: Streaks, hearts, a little guilt when you miss a day — that's the retention machine,
  and it's why people quit. Le Cahier runs the other way. The goal is a real base of about
  400 words and then *you*, leaving, with proof you can build on. A missed day here just
  gets a "welcome back."

**Cognate windfall**
- Heading: **You already know more French than you think.**
- Body: Roughly a third of English came from French. That's thousands of words you can
  half-read on sight — *table, possible, nation, restaurant*. Le Cahier starts here, so
  your first wins are honest and immediate: about 180 words that were basically already
  yours. (We also flag the false friends — the ones that look familiar and mean something
  else — so *pain* doesn't fool you. It means bread.)

**The card (show the real thing)**
- Heading: **Tap to answer. Feel it land.**
- Body: Every card is six choices, and the row you tap *is* the answer — no submit button,
  no grading yourself. Right turns green; a wrong turn gets a gentle red correction, and
  you move on. Nouns always arrive with their article — *la maison*, *le café* — because in
  French the gender is part of the word, not a footnote.

**Built on what actually works**
- Heading: **Old science, quietly applied.**
- Body: Three well-worn findings do the heavy lifting. **Spaced repetition** — showing you
  a word right before you'd forget it — is one of the most replicated results in learning
  science, and it beats cramming for memory that lasts. **Recalling** a word, not
  re-reading it, is what burns it in — so every card asks you to answer from memory and
  corrects you on the spot. And nouns come grouped **by situation** — the restaurant, the
  café, the taxi — which learners pick up faster than random lists, and faster than lists
  of same-category words, which tend to blur together. No tricks. Just the methods that
  hold up.

**Honest progress**
- Heading: **Progress you can actually trust.**
- Body: No XP. No invented "percent fluent." Just the real count — how many of the 400
  words you know, which decks you've finished, and the plain fact that you can now build
  simple sentences. The cognates tend to finish first, so you get a genuine win early
  instead of five months in.

**Graduation**
- Heading: **The best thing this app does is let you leave.**
- Body: When you've got the base, Le Cahier graduates you: a certificate, every word you
  learned exported to CSV or Anki, and a short, honest list of what's next — an A1 course,
  graded readers, a tutor. You keep your work. We keep our promise. The primer's job is
  done; what comes next is yours.

**Who it's for**
- *For:* Absolute beginners who want solid ground before grammar. Restarters who had
  French in school and want the words back — prove what you remember and skip ahead, no
  grinding *être* from zero.
- *Not for:* If you're already conversational, or you want a chat tutor or a full grammar
  course, this isn't that. Le Cahier does one thing well: the vocabulary base underneath
  all of it.

**Closing CTA**
- Heading: **Start with something solid under your feet.**
- CTA: **Start free** — no card to begin.

### 7.3 How it works

- Intro: Here's the whole thing, start to finish. It's short on purpose.
- **1 · Tell us why.** Travel, work, family, or plain curiosity. It only changes which
  words come first — everyone learns the same base.
- **2 · Prove what you know.** Restarters: take a two-minute placement and skip the words
  you already own. Beginners: skip the skip and just start.
- **3 · Study a deck.** The highest-frequency **verbs**, the **cognates** you half-know,
  everyday **nouns** grouped by where you'll actually use them (the restaurant, the café,
  the boulangerie, a taxi, the hôtel), and the little **connectives** — *et, mais, parce
  que* — taught inside real sentences, never as flashcards in a vacuum.
- **4 · The loop.** Tap to answer, hear every word (normal and slow), and let the spacing
  do the work: Le Cahier shows you a word right before you'd forget it, so it sticks
  without cramming.
- **5 · Watch it add up.** An honest dashboard — real coverage, real wins, no points.
- **6 · Graduate.** Certificate, your words exported, and where to go next. Then you're
  off.
- **Why it works.** Three findings, quietly applied. **Spaced repetition:** you see each
  word right as it's about to slip, which beats cramming for lasting memory — one of the
  most replicated results in learning science. **Active recall:** you answer from memory
  and get corrected instantly, which sticks far better than re-reading a list. **Thematic
  grouping:** nouns come sorted by situation (the café, the taxi), learned faster and
  remembered better than random lists — or than same-category lists, which blur together.
  You do less, and remember more. *(The studies behind these claims: see the evidence
  memo.)*

### 7.4 Pricing (+ FAQ)

**Pricing**
- Heading: **Pay while you build. Stop when you're done.**
- Body: Le Cahier is a few months of focused work, not a lifetime subscription. You pay
  while you're building your base — most people reach it in four to six months — and when
  you graduate, you walk away with everything you learned. That's the deal, and we think
  it's a fair one.
- Plan panel: **Free to start** — [what the free tier includes]. Then **[price] / month**,
  everything included. One plan, no tiers to decode.
- Honest promises (list): No credit card to start. · Cancel in two taps. · Your words are
  always yours to export. · No ads, ever. · We email you about your learning — nothing
  else.

**FAQ**
- **Do I need to know any French?** No. Beginners start from zero; the cognates mean you
  get real wins on day one.
- **I took French in school — will I be bored?** Probably not. Take the two-minute
  placement, prove what you remember, and skip straight past it.
- **How long until I finish?** Around four to six months to the ~400-word base, with early
  milestones well before that. It's a real timeline, not a "fluent in three weeks" promise.
- **What happens when I "graduate"?** You get a certificate, an export of every word you
  learned (CSV or Anki), and honest next steps toward grammar. Leaving is the whole point.
- **Will this teach me grammar, or to hold a conversation?** No — and it's not pretending
  to. Le Cahier builds the vocabulary base that grammar stands on, then hands you off.
- **Does it work offline?** Yes. Study on a plane; it syncs when you're back.
- **Web, iPhone, Android?** Web and iPhone at launch, Android soon after. One account works
  everywhere — sign up here, use it anywhere.
- **Why not just use Duolingo?** Different job. Duolingo is built to keep you playing;
  Le Cahier is built to give you a base and let you go. If you want the base, come here.
- **Do you sell my data or show ads?** No and no.
- **Can I cancel easily?** Two taps, and you keep your exported words. No maze.

### 7.5 Signup (`/start`)
- Heading: **Start free.**
- Sub: Make an account and open your primer. No credit card to begin. [One line of trial
  terms.]
- Buttons (Clerk): **Continue with Apple** · **Continue with Google** · **Continue with
  email**
- Fine print: By continuing you agree to our [Terms] and [Privacy Policy].
- Post-signup confirmation: **Your primer's open.** Let's find out why you're here → *(into
  the app's onboarding)*

### 7.6 404
- **This page isn't in the primer.** Let's get you back to something useful. → **Home**

---

## 8. Success metrics (honest by design)

- Primary: **free-trial starts** from the site, and trial → active-learner conversion.
- Quality over volume: watch that signups actually begin onboarding and a first session —
  a qualified start matters more than raw signups (the site is meant to filter, too).
- Do **not** optimize with dark patterns; no vanity metrics on the site itself. Keep
  analytics privacy-first and minimal.

---

## 9. Accessibility & performance (requirements)

WCAG AA on the warm ground; keyboard-navigable with visible focus; `prefers-reduced-motion`
honored (drop the seal animation). Excellent on mobile (much of this audience arrives on a
phone); tap targets ≥44px, not hover-dependent. Fast first paint; minimal JS; subset fonts.

---

## 10. Open items / dependencies

- **Pricing specifics** — plan name, price, and exactly what the free tier includes.
- **Final product name** — copy uses "Le Cahier" to match the app wordmark; the name was
  still under consideration (Aplomb / Foothold / Socle). If it changes, swap globally and
  keep the header wordmark easy to replace.
- **Legal copy** — Privacy Policy and Terms (SaaS + App Store requirements).
- **Trial mechanics** — length, and whether a card is ever required (prefer not).
- **OG/social images** and domain.
- **Real social proof only if true** — no fabricated testimonials or "join thousands."
- **The Astro design itself** — to be produced by Claude Design against the design brief,
  then placed on this scaffold.
