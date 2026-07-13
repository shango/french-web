# Handoff: Default Profile Avatar (Le Cahier)

## Overview
A default profile avatar for users with no uploaded photo, on-brand for Le Cahier. It
replaces the generic stock person icon currently in use. **Shared by both the app and the
marketing/site** — implement once, use everywhere.

Two variants of one system:
- **Ink portrait** — a hand-drawn ink head-and-shoulders on a paper disc. The default when
  no display name is known.
- **Monogram** — the person's initial(s) in EB Garamond with a short violet ruling line
  beneath, on the same paper disc. Preferred once a name exists.

Both sit on a `paper` disc with a single **violet ruling ring** — the notebook's Séyès rule,
curved into a circle — so the mark reads "written by hand," never like a stock glyph.

## About the Design File
`Le Cahier - Profile Avatar.dc.html` is a **design reference created in HTML** — a showcase
of the two variants across sizes, accents, and contexts. It is authored in a bespoke
prototyping format (`.dc.html`). Do not ship it. **Recreate the avatar as a small reusable
component** in the target stack (React/Vue/SwiftUI/etc.) using the exact geometry, tokens,
and SVG below.

## Fidelity
**High-fidelity.** Geometry, colors, stroke weights, and typography are final — match them.

---

## Anatomy & construction

The avatar is a **circular disc** with an inset ring and centered content.

**Disc (all variants):**
- `border-radius: 50%`, size = the avatar size `S` (square).
- `background: #FCFAF3` (paper). **Never** a solid fill or gradient.
- Ring: `box-shadow: inset 0 0 0 R px #C9BEE6` (violet ruling). Ring width `R` scales with
  size: `1.5px` at ≥48px, `1.25px` at 32px, `1px` at ≤24px.
- `overflow: hidden`, content centered (flex, column, center/center).

**Variant A — Ink portrait (SVG, `viewBox="0 0 48 48"`, scaled to `S`):**
```html
<svg width="S" height="S" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="18" r="7.2" stroke="{accent}" stroke-width="2.2"/>
  <path d="M12 38C12 30.5 17.4 26 24 26C30.6 26 36 30.5 36 38"
        stroke="{accent}" stroke-width="2.2" stroke-linecap="round"/>
</svg>
```
Head circle + open shoulders arc, no fill, rounded caps. Because the stroke width is in
viewBox units, it scales proportionally with the disc. The drawing insets to coordinates
6–42 of 48, giving a natural margin inside the ring.

**Variant B — Monogram:**
- Initial(s) in `EB Garamond`, weight **500**, color `{accent}`, `line-height: 1`.
  Font size ≈ **`0.42 × S`** (e.g. 54px at 128, 40px at 96, 31px at 72, 27px at 64).
- A short violet ruling line beneath: `width ≈ 0.34 × S`, `height: 1.5px`,
  `background: #C9BEE6`, `border-radius: 1px`, `margin-top ≈ 0.07 × S`.
- One initial for a single name; two for "First Last". Uppercase.

## Sizes
Ships crisp at any size. Reference stops used in the app + site:
`128` (profile/account hero) · `96` · `72` · `64` · `52` · `48` (row/list) · `36` (nav) ·
`32` · `24` (inline).

**Small-size rule:** below ~40px, **drop the monogram underline rule** and **prefer the
monogram over the portrait** — the portrait's fine strokes get muddy at tiny sizes. Keep the
ring.

## Accent (the ink/initial color)
The disc and ring stay constant; only the **glyph/initial** takes an accent, drawn from the
app palette. Assign it **deterministically** from a stable key (user id or name hash) so a
given user's avatar never changes between sessions or devices.

| Accent | Hex | Notes |
|---|---|---|
| ink (default) | `#1E2A44` | the safe default |
| slate (`le`) | `#435E7E` | masculine-article tint, reused as a neutral accent |
| plum (`la`) | `#8B5A78` | feminine-article tint |
| gold-label | `#B08A2E` | use sparingly; do **not** use the wax-seal gradient here |

Suggested assignment: `accentIndex = hash(userId) % palette.length`. Keep the palette to
these four; all meet contrast on the `#FCFAF3` disc.

## Behavior
- **Static.** No animation, no hover state by default (it is an identity mark, not a
  control). If it is also a button (opens account menu), apply the app's standard focus ring
  and a subtle `background`/scale affordance on the *wrapper*, never on the disc art.
- **Fallback order:** user photo → monogram (if display name) → ink portrait.
- **Accessibility:** the disc is decorative; expose the user's name via `alt` / `aria-label`
  on the element (e.g. `aria-label="Amélie"` or `"Profile"` when anonymous). Contrast of all
  accents on paper meets WCAG AA. Honor `prefers-reduced-motion` (there is no motion to
  begin with).
- **On dark grounds:** the paper disc keeps the mark readable on the ink `#1E2A44` header —
  do not invert it; the paper-on-ink contrast is intentional.

## Design Tokens
| Token | Hex | Use |
|---|---|---|
| paper | `#FCFAF3` | disc fill (constant) |
| rule-violet | `#C9BEE6` | inset ring + monogram underline (constant) |
| ink | `#1E2A44` | default glyph/initial; dark-header ground |
| le / slate | `#435E7E` | accent option |
| la / plum | `#8B5A78` | accent option |
| gold-label | `#B08A2E` | accent option (sparing) |

- **Type:** `EB Garamond` 500 for the monogram (self-hosted in production).
- **Geometry:** disc `50%`; ring inset `1–1.5px`; monogram font `0.42×S`, rule `0.34×S ×
  1.5px`; portrait strokes `2.2` in a `48`-unit viewBox with round caps.

## Reference implementation (React + inline SVG)
```jsx
const ACCENTS = { ink:'#1E2A44', slate:'#435E7E', plum:'#8B5A78', gold:'#B08A2E' };

function pickAccent(key) {
  let h = 0; for (const c of String(key)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return Object.values(ACCENTS)[h % 4];
}
function initials(name) {
  const p = (name || '').trim().split(/\s+/).filter(Boolean);
  if (!p.length) return '';
  return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

function LeCahierAvatar({ name, userId, size = 48 }) {
  const accent = pickAccent(userId ?? name ?? 'anon');
  const ring = size >= 48 ? 1.5 : size >= 32 ? 1.25 : 1;
  const showRule = size >= 40;
  const label = name || 'Profile';
  const mono = initials(name);
  const disc = {
    width: size, height: size, borderRadius: '50%', background: '#FCFAF3',
    boxShadow: `inset 0 0 0 ${ring}px #C9BEE6`, overflow: 'hidden',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  };
  return (
    <div style={disc} role="img" aria-label={label}>
      {mono ? (
        <>
          <span style={{ fontFamily: "'EB Garamond', serif", fontWeight: 500,
            fontSize: size * 0.42, color: accent, lineHeight: 1 }}>{mono}</span>
          {showRule && <span style={{ width: size * 0.34, height: 1.5,
            background: '#C9BEE6', marginTop: size * 0.07, borderRadius: 1 }} />}
        </>
      ) : (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="18" r="7.2" stroke={accent} strokeWidth="2.2" />
          <path d="M12 38C12 30.5 17.4 26 24 26C30.6 26 36 30.5 36 38"
                stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
```

## Static SVG (portrait, for non-React targets / a raster export)
Self-contained 48×48 default portrait, ink accent:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="23.25" fill="#FCFAF3" stroke="#C9BEE6" stroke-width="1.5"/>
  <circle cx="24" cy="18" r="7.2" stroke="#1E2A44" stroke-width="2.2"/>
  <path d="M12 38C12 30.5 17.4 26 24 26C30.6 26 36 30.5 36 38" stroke="#1E2A44" stroke-width="2.2" stroke-linecap="round"/>
</svg>
```
(For a standalone SVG the ring is a `stroke`ed circle at `r = 23.25` instead of an inset
box-shadow.) Export to PNG at 2×/3× for platforms that need raster app assets.

## Do / Don't
**Do:** keep the paper disc + single violet ring on every ground · prefer the monogram once
a name exists · assign the accent deterministically per user.
**Don't:** fill the disc with a solid color or gradient · use the gold **wax seal** here
(reserved for mastery/graduation) · substitute a generic stock person glyph or emoji.

## Files
- `Le Cahier - Profile Avatar.dc.html` — the design reference / showcase (open in a browser).
- Tokens & type are inherited from the app system (`design_handoff_le_cahier/`).
