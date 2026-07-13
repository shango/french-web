# Handoff: Le Cahier — Marketing + Signup Site

## Overview
This is the public-facing **marketing website and start-free signup** for Le Cahier, a
French vocabulary primer that takes an absolute beginner (or a restarter) to a real base
of ~400 words, then **graduates** them. The in-app product is already designed and final
(see the sibling `design_handoff_le_cahier/` package). This package is the **front door**:
it must look and feel unmistakably like the app, then convert the right visitor into a free
trial.

The site's one job: **get the right visitor to start the free trial** — and qualify as much
as sell. The differentiating posture is **honesty**: built to graduate you, not retain you.
No dark patterns anywhere.

Four pages + one internal comparison artifact:
1. **Home** — the pitch (`Le Cahier - Home.dc.html`)
2. **How it works** — the honest method, in real screens (`Le Cahier - How It Works.dc.html`)
3. **Pricing & FAQ** — one honest plan, no dark patterns (`Le Cahier - Pricing & FAQ.dc.html`)
4. **Start free** — the signup island (`Le Cahier - Start Free.dc.html`)
5. **Hero Options** — *not a page.* An internal A/B comparison of two hero directions for
   Home (`Le Cahier - Hero Options.dc.html`). Home currently ships hero **1a**; 1b is an
   alternate to consider. Do not build this file as a route.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the
intended look and behavior. They are **not** production code to copy directly, and they are
authored in a bespoke component format (`.dc.html`) used only for prototyping.

Your task is to **recreate these designs in the target stack.** The project brief specifies
**Astro**:
- **Marketing pages (Home, How it works, Pricing/FAQ) are content-first Astro** — ship
  little to no JS. A fast site *is* the "respects your time" promise made visible.
- **Signup is the one interactive island** (Clerk auth). Keep the rest static.
- If Astro is not the final choice, use the most appropriate framework, but preserve the
  static-content / single-interactive-island split.

**Reuse, do not fork, the design tokens** from the app (`design_handoff_le_cahier/`). A
shared CSS-variable / token file is ideal so the site and app can never drift. **Self-host**
EB Garamond + Hanken Grotesk via the Astro asset pipeline (subset for speed) — the
prototypes load them from Google Fonts for convenience only.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows, and copy are final and
intentional — recreate the UI to match. Left open for you: real Clerk wiring, real form
validation, the founder-owned pricing values (left as visible placeholders), and any motion
polish beyond what's noted.

---

## Global system (applies to every page)

### Page shell
- **Ground:** `paper #FCFAF3` for the whole site (the app's bright warm notebook white).
  The desk tone `#E7E3D9` is used only as an occasional full-width section band for rhythm
  (Home "who it's for", How-it-works steps 02 & 04). The windfall tone `#F4EFDF` bands the
  cognate-windfall and graduation sections.
- **Max content width:** `1080px`, centered, `32px` horizontal padding. (Signup uses
  `1000px`; the FAQ column narrows to `760px`.)
- **Body font:** `Hanken Grotesk`. **Editorial/serif:** `EB Garamond`. Text color `ink
  #1E2A44`; secondary `ink-soft #55607A`; muted captions `#8A8674` / `#A69C82`.

### Header / nav (sticky)
- Sticky top, `background: rgba(252,250,243,.88)` + `backdrop-filter: blur(10px)`, bottom
  hairline `#EDE6D6`. Inner bar `padding:16px 32px`, flex space-between.
- **Wordmark:** `Le Cahier` in `EB Garamond` `25px`, color **red `#C4362F`**,
  `white-space:nowrap`. Links to Home. Match the app's wordmark exactly and keep it easy to
  swap (product name was under consideration).
- **Nav links:** `Hanken Grotesk` `14px`, weight 500, color `#55607A`, hover `#1E2A44`. The
  current page's link is weight 600 / color `#1E2A44`.
- **Start free** button: `Hanken Grotesk` `14px` weight 600, text `#FCFAF3`, bg `ink
  #1E2A44`, radius `9px`, padding `10px 18px`; hover bg `#111a30`.

### Footer
- Top hairline `#EDE6D6`, bg `#FCFAF3`, `padding:36px 32px`, flex space-between, wrap.
- Left: wordmark `EB Garamond 21px #C4362F` + tagline `Hanken 13px #8A8674` — "A French
  vocabulary primer, built to graduate you." Right: nav links `13.5px #55607A`.

### Signature devices (carry these — they are the brand)
- **Red correction margin:** two thin vertical rules, `#C4362F` at opacity `.45` and `.16`
  (or `.4`/`.14`), inset ~16–20px, ~4px apart, on the left edge of cards/panels. Content is
  left-padded (~40px on study cards) to clear them.
- **Violet Séyès ruling line:** `#C9BEE6`, ~1.5–2px, under headings, as the hero word's
  underline, as the certificate frame, and as dividers.
- **Gold wax seal:** disc with `radial-gradient(circle at 38% 34%, #E7C561, #C29A3B 60%,
  #9E7A26)`, seal text `#5E4712`, `transform: rotate(-8deg)`, soft gold shadow. Used for
  milestones / the certificate / mastery.

### Buttons & links
- **Primary:** bg `ink #1E2A44`, text `#FCFAF3`, radius `9–11px`; hover `#111a30`.
- **Secondary / outline:** white or transparent bg, `1.5px` border `#D9CEEC` or `#E0D8C4`,
  text `#1E2A44` / `#435E7E`; hover fill `#F6F1FB`.
- **Text link:** color `#C4362F`, hover `#9E2A24` (default `a` styling site-wide).
- **Motion:** small and purposeful, paper-and-ink, never a game. Row/state transitions
  `~.16s ease`. The only celebratory gesture is the **seal press** (`@keyframes sealIn`:
  scale .6 → settle at `rotate(-8deg)`), never confetti. Honor `prefers-reduced-motion`.

### Responsiveness
Prototypes use `flex-wrap` + `min-width` on flex children (typically `flex:1 1 360px;
min-width:300px`) so two-column bands collapse to stacked on narrow screens. In production,
use the codebase's real breakpoints; the audience is mobile-heavy, so verify one-column
layouts and ≥44px tap targets. Nav collapses to a menu on mobile (not built in the mock).

---

## Screens / Views

### 1. Home — `Le Cahier - Home.dc.html`
The pitch. A calm scroll, not a wall of feature cards. Sections top to bottom:

**a. Hero (direction 1a — "the word on the ruled line").** Two-column band, `padding:70px
32px 64px`, `gap:60px`, vertically centered, wraps.
- *Left column:* eyebrow `Hanken 12px .16em uppercase #8C8776` "French vocabulary, written
  by hand"; `h1` in `EB Garamond` weight 500, **52px**, line-height 1.1, `#1E2A44`,
  letter-spacing -.01em: **"A real base in French, then we wave you off."**; sub-paragraph
  `Hanken 17px/1.6 #55607A`, max 480px; CTA row = primary **Start free** (→ signup) +
  text-link **See how it works** (→ how-it-works) with a chevron; a fine-print line `Hanken
  13px #8A8674`: "No card to start · cancel anytime · export your words whenever you leave".
- *Right column:* a "ruled-paper" panel (`paper` card, border `#E8E1CF`, radius `16px`,
  shadow `0 24px 54px -30px rgba(30,42,68,.5)`, `padding:46px 44px 40px 58px`) carrying the
  **red correction margin** on its left. Eyebrow "Leçon 1 · le premier mot"; the word
  **`commencer`** in `EB Garamond` **64px** sitting on a `2px #C9BEE6` violet underline;
  below it `EB Garamond italic 20px #8B5A78` "verbe" + `Hanken 15px #55607A` "· to begin";
  then a hairline divider and a small **N1 gold seal** (44px) beside a line about the one
  honest goal — "400 words and a finished primer."

**b. Cognate windfall.** Full-width band in windfall tone `#F4EFDF` with top/bottom borders
`#E4DBC2`. Two columns: left = gold eyebrow `#B08A2E` "The cognate windfall" + `EB Garamond`
40px "You already know ~180 French words." + body; right = a `paper` card of **word chips**
(`EB Garamond 19px #1E2A44`, chip bg `#F6F2E8`, border `#E4DBC2`, radius `9px`, padding `7px
14px`): `table, nation, impossible, important, théâtre, nature`; below a hairline, one
false-friend row: `librairie` struck through (`#8B5A78`, strike color `#E0A9A3`) + gloss
"is a *bookshop*, not a library."

**c. Real surfaces — tap card + honest dashboard.** `padding:76px 32px 20px`. Section head
(max 560px): eyebrow "The actual app" + `EB Garamond` 38px "Tap to answer. Get a gentle
correction. Move on." + body. Below, a wrapping row (`gap:40px`) with:
  - **Tap card (384px):** the app's single-answer noun card, shown *resolved-correct*.
    Full red margin; header eyebrow "Nouns · tap the French"; prompt `EB Garamond 31px` "the
    house" + an **Écouter** audio button (slate `#435E7E`, border `#D9CEEC`); violet ruling
    line; option rows (radius 11px, min-height 52px, leading `6px #C9BEE6` dot, `EB Garamond
    22px`, article italic tinted `le #435E7E` / `la #8B5A78`): **la maison** correct (green
    fill `#E9F2EC`, border `#9BC6AF`, ✓ `#2E7D5B`, English gloss "house"), *la fenêtre* and
    *le jardin* dimmed to opacity .42. Footer bar: "✓ Correct — *la maison*" (green) + **Next**
    primary button.
  - **Dashboard (flex 1 1 460px):** compact honest dashboard. Header = wordmark `EB Garamond
    22px #C4362F` + "Your primer · Level 1" + quiet streak "● 7 days · welcome back" (dot
    `#C29A3B`). Coverage rows (Verbs 42/60, Nouns 55/150, Cognates 180/180 "✦ sealed") each
    with a **quiet 4px neutral progress line** (`le`-slate `#435E7E` fill on `#EDE6D6`),
    never a %. Bottom graduation strip in `#F7F2E4`: "Level 1 · base vocabulary — 277 / 400
    words toward your certificate" + 48px **N1** gold seal. Caption below: honest-numbers
    note. **Never show a bare "% of French."**

**d. Graduation payoff.** `paper` card, radius `20px`, `padding:48px`, two columns. Left:
gold eyebrow "The finish line is the feature" + `EB Garamond` 38px "You'll finish. Here's
your proof." + body + a 3-item ✓ list (certificate / word export CSV & Anki / next steps,
no upsell). Right: a **mini certificate** — `paper` with a violet double-frame (`1.5px
#C9BEE6`) and faint red margin, gold eyebrow "Certificat · Niveau 1", `EB Garamond` 30px
"Base Vocabulary", "This certifies that" + italic red name line **"your name"**, body
("built, by hand, a working base of **400 French words.**"), a date signature line, and a
54px **N1** wax seal.

**e. Who it's for / isn't.** Desk-tone band `#E7E3D9`. Centered head "Who Le Cahier is, and
isn't, for". Two `paper` cards in an `auto-fit minmax(300px,1fr)` grid: **A good fit if
you…** (green eyebrow `#2E7D5B`, ✓ items) and **Not the right tool if you…** (red eyebrow
`#C4362F`, ✕ items, `#55607A` text). Closing muted line: "Not sure? The first words are
free…". Balances both audiences (beginners + restarters).

**f. Closing CTA.** Centered, `padding:84px 32px`. A `60×2px #C9BEE6` rule, then `EB
Garamond` 44px "Start with the word you already know: *commencer.*" + body + primary **Start
free**.

### 2. How it works — `Le Cahier - How It Works.dc.html`
Earns trust by showing the method. Centered intro ("The method is the pitch. So here it is,
in full.") then **six numbered steps**, alternating two-column bands (odd steps on `paper`,
steps 02 & 04 on desk-tone `#E7E3D9` and `flex-direction:row-reverse`). Each step head =
`EB Garamond 19px #C4362F` number ("01"…"06") + `Hanken 12px .14em uppercase #8C8776` label,
then an `EB Garamond` 32px `h2` + body, paired with a **real product surface**:
- **01 · A gentle start** — the "Why are you learning French?" onboarding card (Travel
  selected: plum `#8B5A78` border + filled radio + ✓). Copy: everyone learns the same base;
  "prove it, skip it" placement.
- **02 · Find a deck** — the 2×2 deck grid (Verbs w/ progress line, Nouns category tile w/
  chevron, Cognates gold-sealed, Connectives **locked** — dashed `#D8CFBB` border, lock
  icon). "High-frequency first. A base, then the glue."
- **03 · Tap to answer** — the noun card shown mid-correction: a **wrong** pick "le maison"
  (red fill `#FBEBE9`, border `#E0A9A3`, ✕) above the correct "la maison" (green). Feedback:
  "It's *la* maison, feminine. gently noted." Teaches the gender drill; never a separate "le
  or la?" quiz.
- **04 · In context** — the connective fill-in-the-blank card, resolved: "Je voudrais un
  café *et* un croissant." with the blank filled green.
- **05 · Progress, no XP** — the 820px honest dashboard (coverage lines, cognate-windfall
  panel, growth). "Honest numbers. No points to protect."
- **06 · Graduate** — windfall-tone band, centered, big **✦ gold seal**, `EB Garamond` 34px
  "At 400 words, the primer's work is done.", body about certificate + export + honest next
  steps (no upsell), primary **Start free**.

### 3. Pricing & FAQ — `Le Cahier - Pricing & FAQ.dc.html`
Faces the SaaS-vs-graduation tension head-on. Centered intro: "Pay while you build your
base. Not a day longer." + note that the base is ~4–6 months and you stop paying at
graduation.

**Plan + trust row** (`gap:36px`, centered, wrap):
- **Plan card (flex 0 1 420px):** `paper`, `1.5px #C9BEE6` border, radius `20px`,
  `padding:38px 36px`, red correction margin inside. Gold eyebrow "The plan" + a green
  "Free to start" pill (`#E9F2EC` bg, `#9BC6AF` border). **`[ Plan name ]`** in `EB Garamond`
  30px. Price row: **`[ price ]`** in `EB Garamond` 52px + `Hanken 15px #8A8674` "/ month,
  while you learn". Italic founder note: "Founder to set: plan name, price, and exactly what
  the free start includes." Then a 5-item ✓ feature list (starts with "Start free, `[ what
  "free" includes ]`"), a full-width primary **Start free** button, and "No card required to
  begin." **These bracketed placeholders are intentional — the founder fills plan name,
  price, and the free-tier definition.**
- **"What you'll never find here" column (flex 0 1 420px):** four ✕ cards — no countdown
  timers, no "N spots left", no cancel-traps, no pre-checked upsells — each `paper`, border
  `#E8E1CF`, radius `13px`. Then a windfall-tone panel: "The absence of tricks *is* the
  pitch." **The absence of dark patterns is itself the selling point — keep this framing.**

**FAQ** (max `760px`): six native `<details>`/`<summary>` accordions (`paper`, border
`#E8E1CF`, radius `14px`). Summary = `EB Garamond` 20px + a chevron that rotates 90° when
open (`details[open] .faq-chev { transform: rotate(90deg) }`). Answers `Hanken 15px/1.65
#55607A`. Questions: beginner-or-restarter · need grammar first · how long to a base ·
what happens when I finish · why not Duolingo · offline / iOS & Android. Closing CTA:
"Try a session before you decide." + **Start free**.

### 4. Start free (signup island) — `Le Cahier - Start Free.dc.html`
Should feel like **opening the cahier**, not a generic auth box. Minimal header (wordmark +
"Already have an account? Sign in"). Two-column band (`max 1000px`, `gap:56px`):
- **Left:** framing with the red correction margin — eyebrow "Open the cahier", `EB Garamond`
  42px "Start free. Your first words are waiting.", body, then three ✓ trust points: **no
  credit card to start** (and "we'll tell you before anything is ever charged, never
  after"), **cancel in one tap** (export your words), **built to graduate you**.
- **Right — auth card (400px):** `paper`, border `#E8E1CF`, radius `16px`, shadow `0 24px
  54px -30px …`, `padding:32px`. Title `EB Garamond 26px` "Create your account" + "Free to
  begin · no card required". **Clerk** federation buttons: **Continue with Apple** and
  **Continue with Google** (white bg, `1.5px #E0D8C4` border, brand glyphs inline, hover
  `#F6F1FB`), an "or" divider, an **email** field (label + input with mail icon,
  placeholder `you@example.com`), a primary **Continue with email**, then legal microcopy
  ("By continuing you agree to our Terms & Privacy. Secured by Clerk.").
- **After-signup preview** (below): a centered `paper` card with a **✦ gold seal**, `EB
  Garamond 27px` "Bienvenue.", copy that the app owns onboarding ("we'll ask why you're
  learning… and start you on your first words"), and a **Begin onboarding** button.

**Honesty (firm):** be explicit about what "free" includes and how the trial works. If a
card is ever required, say so **before** the button, not after — ideally start free with no
card. No surprise wall, no cancel friction.

**Handoff boundary:** the **app** owns first-run onboarding ("Why French?" + optional
placement probe). Site signup is only **account + start trial**, then route into the app.
Do not duplicate or gate the app's onboarding here.

---

## Interactions & Behavior
- **Nav:** standard links between the four pages (Home / How it works / Pricing & FAQ /
  Start free) + wordmark → Home. Footer mirrors these. The prototype filenames are
  `.dc.html`; map them to real Astro routes (`/`, `/how-it-works`, `/pricing`, `/signup`).
- **FAQ accordions:** native disclosure; chevron rotates on open. In production keep them
  keyboard-accessible and expandable without JS where possible.
- **Signup (the only interactive island):** wire Clerk (Apple, Google, email federation).
  Show trial terms + any card requirement *before* the action. On success, show the brief
  on-brand confirmation, then route into the app (which begins onboarding).
- **Marketing pages ship little/no JS.** Hovers are enhancements only — the language must
  work on touch (not hover-dependent).
- **Motion:** page-turn / reveal touches at most, plus the seal. No animation carousels.
  Honor `prefers-reduced-motion`.

## State Management
- Marketing pages are **stateless** static content.
- **Signup island:** Clerk auth state (signing-in / authenticated / error), email field
  value + validation, and post-signup routing into the app. No other client state.

## Design Tokens
Inherit verbatim from the app (`design_handoff_le_cahier/README.md`). Used on the site:

| Token | Hex | Use on site |
|---|---|---|
| paper | `#FCFAF3` | site ground, card surface |
| paper-white | `#FFFFFF` | option rows, secondary/auth buttons |
| ink | `#1E2A44` | primary text; primary button bg |
| ink-soft | `#55607A` | secondary text, nav links |
| ink-muted | `#8A8674` / `#A69C82` | captions, labels, hints |
| rule-violet | `#C9BEE6` | ruling line, underlines, certificate frame, divider rules |
| row-border | `#DACFEC` | idle option-row border |
| row-hover | `#F6F1FB` | hover / selected fill |
| red | `#C4362F` | wordmark, correction margin, eyebrows on "not-for" lists, wrong ✕ |
| red-hover | `#9E2A24` | link hover |
| green | `#2E7D5B` | correct feedback, ✓ marks, "good fit" eyebrow |
| green-bg / green-border | `#E9F2EC` / `#9BC6AF` | correct row fill / border, "free" pill |
| wrong-bg / wrong-border | `#FBEBE9` / `#E0A9A3` | wrong row fill / border |
| gold | `#C29A3B` | seals; gradient `radial-gradient(circle at 38% 34%, #E7C561, #C29A3B 60%, #9E7A26)`; seal text `#5E4712` |
| gold-label | `#B08A2E` | windfall / milestone / plan eyebrows |
| windfall-bg / border | `#F4EFDF` / `#E4DBC2` | windfall & graduation bands, panels, chips |
| grad-strip-bg | `#F7F2E4` | dashboard graduation strip |
| le (article tint) | `#435E7E` | masculine article; progress-bar fill |
| la (article tint) | `#8B5A78` | feminine article; chevrons; selected accents |
| hairline | `#EDE6D6` / `#E8E1CF` | card borders, dividers, nav/footer rules |
| locked-bg / border | `#F6F2E8` / dashed `#D8CFBB` | locked deck tile |
| desk | `#E7E3D9` | occasional section band (site rhythm only) |

**Typography:** `EB Garamond` (400/500/600 + italic 400/500) for headings, French words,
editorial, certificate, seals, numbers-of-meaning. `Hanken Grotesk` (400/500/600/700) for
UI, uppercase eyebrows (`.12–.16em`), body, numerals, buttons. Site type scale (px):
hero h1 **52** · statement hero (1b) 60 · section h2 **36–40** · step h2 32 · card prompt
24–31 · hero word 60–64 · body **16–17** (line-height 1.6) · nav/labels 12–14 · uppercase
eyebrow 11–12.

**Radii:** cards 16px (plan/graduation 20px; certificate 8/4px), tiles/panels 13–14px,
buttons/rows 9–11px. **Shadows:** card `0 20px 46px -26px rgba(30,42,68,.42)`; larger hero/
panel `0 24px 54px -30px rgba(30,42,68,.5)`; tile `0 10px 22px -18px rgba(30,42,68,.5)`.
**Spacing:** section vertical padding 56–84px; content padding `32px`; common gaps 40–60px.

## Assets
- **Fonts:** EB Garamond + Hanken Grotesk. **Self-host** in production (Astro asset pipeline,
  subset). Prototypes use Google Fonts CDN for convenience only.
- **Icons:** inline stroke SVGs (`stroke-width` ~1.7–2) — chevrons, speaker (Écouter), lock,
  mail; plus Apple and Google brand glyphs on the auth buttons. Replace with the codebase's
  icon set at matching weight; use official Apple/Google sign-in marks per their brand
  guidelines.
- **Seals / gold & violet discs, certificate frame, growth curve, word chips:** pure CSS/SVG,
  no raster assets. No third-party logos beyond the auth providers.

## Copy notes
- **Voice:** warm, plain, confident, honest. No hype verbs, no fluency promises ("a base you
  can build on," never "speak French fast"), no manufactured urgency. Specific beats clever.
- **Never imply fluency**, and keep the built-to-graduate framing throughout — it is the
  product's whole differentiator.
- **Founder placeholders** (leave visible until filled): `[ Plan name ]`, `[ price ]`, and
  `[ what "free" includes ]` on the Pricing page. Do not invent pricing.
- The copy contains **no em dashes** by request; keep it that way if you edit copy.
- **Wordmark "Le Cahier"** is the current product name (was under consideration among
  Aplomb / Foothold / Socle). Keep the header wordmark trivially swappable and change it in
  lockstep with the app if it ever changes.

## Files
Design references in this bundle (open any in a browser to view):
- `Le Cahier - Home.dc.html` — Home page
- `Le Cahier - How It Works.dc.html` — How it works
- `Le Cahier - Pricing & FAQ.dc.html` — Pricing & FAQ
- `Le Cahier - Start Free.dc.html` — Start-free signup island
- `Le Cahier - Hero Options.dc.html` — internal hero A/B comparison (1a live, 1b alternate); **not a route**

Related (app system, sibling package): `design_handoff_le_cahier/` — the finished in-app
design and the authoritative token/type source. Inherit from it; do not restyle the app.
