---
adjectives: [bold, authoritative, precise, confident, unmistakable]
anti_adjectives: [quiet, decorative, templated, corporate-generic, timid]
primary_color: "#E85015"
---

# Portfolio Design System Spec — Chaz Stephens

Single deliverable: token contract + component specs for a Next.js/React engineer to implement
in plain CSS custom properties + CSS Modules. No app code, no scaffolding — this file only.

## 0. Direction

**Bold monochrome + one accent.** Stark black/white base, heavy contrast, one striking color used
sparingly, confident/authoritative type. Reference register: a high-end design studio or agency
portfolio site — not a SaaS product page, not a pitch-deck aesthetic.

Positioning driving this: Chaz is applying to medical device PM roles. That category's default
visual convention is institutional blue — hospital blue, corporate blue, pharma-deck blue. A
portfolio in navy-and-blue reads as one more device-company one-pager. Bold black/white with a
single non-blue accent is the opposite convention inside this category — it reads designed, not
templated, and it's the fastest way for a hiring manager to register "this person has taste"
before reading a word.

**Single dark-default theme, no user-facing light/dark toggle.** What looks like "light mode"
below is a structural device — specific sections invert to a white canvas as a rhythm technique,
not as a user preference. Both canvases get explicit token values, never a computed inversion
(no `filter: invert()`, no opacity tricks) — same discipline dark-mode tokens require.

## 1. Color tokens

Two canvases, same semantic names, values swapped by scope. Default (`:root`) is the dark
canvas; wrap a section in `.theme-light` to flip it. This is the entire "theme" mechanism — no
per-component dark/light logic beyond which class wraps the section.

```css
:root {
  /* Canvas */
  --color-canvas:          #0A0A0A; /* near-black, not pure #000 — avoids OLED smear/crush */
  --color-canvas-raised:   #0A0A0A; /* no elevated-surface tint in this system — see §4 */

  /* Ink (text) */
  --color-ink:             #F4F4F0; /* headlines, body, stat numbers */
  --color-ink-secondary:   #9C9C96; /* ledes, supporting copy */
  --color-ink-muted:       #7A7A75; /* captions, timestamps, fine print */

  /* Borders */
  --color-border-hairline: #262626; /* dividers: nav/footer edges, table rules */
  --color-border-bold:     var(--color-ink); /* stat tiles, cards, button outlines — full-strength ink, not a gray step */

  /* Accent — one color, sparing use only (see §4) */
  --color-accent:          #E85015;
  --color-accent-bright:   #FF6B2C; /* hover state on dark canvas only */
  --color-accent-deep:     #C43D0E; /* hover state on light canvas only */

  --color-focus: var(--color-accent);
}

.theme-light {
  --color-canvas:          #FAFAF8; /* near-white, not pure #FFF — a hair of warmth keeps it from reading as clinical hospital-white */
  --color-canvas-raised:   #FAFAF8;

  --color-ink:             #0A0A0A;
  --color-ink-secondary:   #5C5C56;
  --color-ink-muted:       #737370;

  --color-border-hairline: #E4E4E0;
  --color-border-bold:     var(--color-ink);

  /* accent tokens do not change — same hex on both canvases, see §1 contrast notes */
}
```

**Contrast, WCAG-checked:**

| Pair | Ratio | Result |
|---|---|---|
| `--color-ink` on dark `--color-canvas` | 17.9:1 | AAA |
| `--color-ink-secondary` on dark canvas | 7.2:1 | AAA |
| `--color-ink-muted` on dark canvas | 4.6:1 | AA (floor — never use for paragraph body) |
| `--color-ink` on light canvas | 19.0:1 | AAA |
| `--color-ink-secondary` on light canvas | 6.4:1 | AA+ |
| `--color-ink-muted` on light canvas | 4.55:1 | AA (floor) |
| `--color-accent` text on dark canvas | 5.3:1 | AA (normal text) |
| `--color-accent` text on light canvas | 3.6:1 | **fails AA for body-size text** — see use rule below |
| `--color-ink` (black) on `--color-accent` fill | 5.3:1 | AA — use for all accent-filled buttons/chips |
| white text on `--color-accent` fill | 3.2:1 | **fails** — never put white text on the accent |

**Accent use rule, derived from the table above:** on the dark canvas, accent can be used as
text (links, headline stat) at any size. On the light canvas, accent only clears AA at large/bold
sizes (24px+ bold) or as a non-text graphical element at 3px+ weight (rules, tile borders, icons)
— never as light-canvas body-copy-sized text. Any accent-filled surface (button, chip) gets
`--color-ink` on top of it, i.e. black text on the orange fill, never white — white-on-accent
fails AA on both canvases.

## 2. Type system

**Archivo (identity + body, weights 400–900) / JetBrains Mono (stat numbers, data labels).**
Two typefaces. Loaded via `next/font/google`.

```ts
import { Archivo, JetBrains_Mono } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-mono',
  display: 'swap',
})
```

```css
:root {
  --font-sans: var(--font-sans), 'Archivo', system-ui, sans-serif;
  --font-mono: var(--font-mono), 'JetBrains Mono', ui-monospace, monospace;
}
```

**Why this reads cutting-edge, not default:** the "heavy contrast" the brief asks for is built
into one family's weight range, not into a second decorative font. Archivo runs 400 (body) to
900/Black (hero, H2, H3) — the jump from a light paragraph to a Black-weight headline on the
same typeface *is* the visual contrast system, which is a bolder move than pairing two
mid-weight humanist sans fonts the way Inter/Poppins/Montserrat templates do (everything sitting
at 400–600, hierarchy carried by size alone). JetBrains Mono is reserved for anything numeric:
fixed-width digits solve the literal problem of a case study dense with exact figures ($5.25B,
$110M, 71%) shifting width mid-sentence, and a monospace numeral register reads as
engineering/instrument-panel precision — apt for a device case study, and distinct from a
typical portfolio's all-prose numbers.

**Type scale** (base 16px, ~1.25–1.33 step, rounded to role):

| Role | Size (px/rem) | Family / weight | Line-height | Tracking | Notes |
|---|---|---|---|---|---|
| Label / kicker | 12 / 0.75rem | Mono 500 | 1.4 | 0.10em | uppercase, `--color-ink-muted`; accent only where §4 sanctions it |
| Caption / table cell | 13 / 0.8125rem | Sans 400 | 1.5 | normal | fine print, table body |
| Body | 16 / 1rem | Sans 400 | 1.65 | normal | default paragraph |
| Body large | 20 / 1.25rem | Sans 400 | 1.55 | normal | ledes, hero one-liner |
| H4 | 24 / 1.5rem | Sans 700 | 1.25 | -0.005em | card/tile titles |
| H3 | 32 / 2rem | Sans 800 | 1.15 | -0.01em | sub-sections, tertiary headings |
| Stat number (sm) | 40 / 2.5rem | Mono 700 | 1.05 | normal | home teaser stat tiles |
| H2 (section headline) | 48→64 / 3→4rem | Sans 900 | 1.05 | -0.02em | mobile → desktop |
| Stat number (lg) | 64 / 4rem | Mono 700 | 1.0 | normal | case-study in-body stat tiles |
| H1 (hero) | 72→120 / 4.5→7.5rem | Sans 900 | 0.95 | -0.03em | mobile → desktop; the single boldest move on the site |

Every numeral gets `font-variant-numeric: tabular-nums` — including inline dollar figures that
appear in Sans body prose, so a number never wobbles mid-sentence even outside a stat tile.

## 3. Spacing, layout, section rhythm

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px;  --space-10: 128px; --space-11: 160px;

  --radius-none: 0;   /* buttons, stat tiles, cards, table, nav, footer — default everywhere */
  --radius-chip: 2px; /* inline mono tags/chips only, if used — the one exception */

  --container-max: 1200px;
  --prose-max: 720px;

  --border-width-hairline: 1px; /* dividers: nav/footer edges, table rules, prose separators */
  --border-width-bold: 2px;     /* stat tile edges, card edges, button outlines, hover borders */
}
```

Horizontal page padding: 20px mobile, `--space-6` tablet, `--space-8` desktop.

**Sharp corners are a brand decision, not an oversight.** Radius above 2px reads as
friendly-SaaS; a studio portfolio in this register uses square edges as a signal of
architectural confidence. The one exception (`--radius-chip`) exists only for a small inline tag,
never a card or button.

**The monotony risk, addressed directly:** a colored palette gets section rhythm for free — swap
background tints and you're done. Monochrome doesn't have that lever without diluting the
"stark black/white" premise into a gray-tint gradient, which would just be the old deck's
approach with the hue removed. Instead, rhythm comes from two levers that are native to bold
monochrome rather than borrowed from a color system:

1. **Full binary canvas inversion.** Sections don't shift tint, they flip — black canvas to
   white canvas and back — using the `.theme-light` scope from §1. This is a bigger, more
   deliberate beat than a tint change, and it's a real convention in this reference category
   (agency/studio sites), not an invented workaround.
2. **Border and fill, not background, carry the "heavy contrast."** Stat tiles and cards never
   get a raised gray surface (`--color-canvas-raised` is intentionally identical to
   `--color-canvas` — there is no elevated-surface color in this system). Elevation is a 2px
   ink-colored outline directly on the true canvas. That keeps every section's background
   binary (pure black or pure white) while still giving components visible edges.

Canvas assignment across the case study's 7 sections is narrative, not mechanical alternation:

| # | Section | Canvas | Padding-top | Why |
|---|---|---|---|---|
| 1 | Overview | dark | `--space-10` (128) | opens on the hero's register, most air |
| 2 | The problem | light | `--space-9` (96) | first flip — marks the turn into narrative tension |
| 3 | The solution | dark | `--space-9` (96) | flips back — problem/solution as a literal black/white pairing |
| 4 | Regulatory & reimbursement | light | `--space-11` (160) | dense/technical content and a comparison table read cleaner on a paper-white canvas; extra top air signals the register shift |
| 5 | Evidence & risk | dark | `--space-9` (96) | returns to dark for the heaviest, most serious section |
| 6 | Go-to-market | light | `--space-10` (128) | opens back up before the close |
| 7 | Closing reflection | dark | `--space-11` (160) top/bottom | bookends the hero's dark register; final accent-filled CTA gets maximum pop against black |

## 4. Component specs

### Nav / header
Always dark canvas regardless of the section scrolled beneath it — fixed chrome, not content, so
it does not participate in the section-inversion rhythm. Height 64–72px, `--border-width-hairline`
solid `--color-border-hairline` bottom edge, no scroll-elevation shadow. Left: name set in Sans
700, 16px, normal case (not a mono kicker treatment — that's reserved for data, see below). Right:
inline contact links (email, LinkedIn — icon + label, never icon-only/color-only) plus the primary
Resume button. No hamburger: two pages don't need one; stack or icon-only under 640px.

### Section heading pattern
Label (`SECTION NUMBER — TITLE`, e.g. `04 — REGULATORY & REIMBURSEMENT`) in the mono label role,
`--color-ink-muted` → `--space-3` gap → H2 → optional `--space-4` gap → body-large lede,
`--color-ink-secondary`, capped at `--prose-max`. The label is data-typography (mono, muted), not
a colored kicker motif — accent doesn't appear here; it's rationed for the five uses below.

### The five places accent appears — and nowhere else
1. Primary button fill (Resume, final PDF CTA).
2. Exactly one number per stat group — the headline metric, rendered in accent instead of ink.
3. Inline link hover/focus state (rest state is ink + always-on underline, see below).
4. Featured-project teaser card: border shifts from `--color-border-hairline` to accent on hover.
5. The current-page indicator in the footer tag line.

Never a background wash, never a gradient, never the default color of a whole component. If a
design question can't be answered by one of these five, the answer is ink, not accent.

### Stat tile
No fill — sits directly on the section's canvas. `--border-width-bold` (2px) solid
`--color-border-bold`, `--radius-none`, padding `--space-5`. Number on top (Mono 700, tabular,
per role above), `--space-2` gap, then label (mono label role), then optional one-line caption in
caption role, `--color-ink-secondary`. Grid: 2–3 tiles per row, `--space-4` gap, single column
under 640px. Home-page teaser tiles link into the case study: hover → border to accent, 150ms
ease, no transform/shadow. Case-study in-body tiles are static data, no hover state.

### Featured-project teaser card (home page)
Same no-fill, bold-outline contract as a stat tile at container scale, padding `--space-6`.
Contains: label (`FEATURED CASE STUDY`), H3 project title, one-line description, then a 3-tile
stat row (headline metrics — e.g. market size, margin, adoption rate) that links through. Hover:
border → accent (one of the five sanctioned accent moments).

### Buttons
Primary (Resume, PDF CTA): `--color-accent` fill, `--color-ink` text (black-on-orange, never
white — see contrast table), Sans 700, 16px, padding 14px 32px, `--radius-none`, no border.
Hover: inverts — transparent fill, 2px accent border, accent text. This invert-on-hover (rather
than a lighten/darken shift) is the deliberate "crafted" hover for this system.

Secondary/ghost: transparent fill, `--border-width-bold` solid `--color-ink`, `--color-ink` text.
Hover: border and text → accent.

Focus-visible (all interactive elements): 2px solid `--color-focus` outline, 2px offset.

### Links (inline body text)
`--color-ink`, underline always on (not hover-only) — this reserves accent for the five sanctioned
moments instead of spending it on every inline link, and keeps the affordance color-independent.
Hover/focus: text and underline → accent (sanctioned moment #3).

### Footer
Always dark canvas, mirroring the nav. `--border-width-hairline` top edge. Mono label role,
`--color-ink-muted`, items separated by ` / `; the current-page tag renders in accent (sanctioned
moment #5). Example, home: `PORTFOLIO / MEDICAL DEVICE PM / CHAZ STEPHENS © 2026`. Example, case
study: `CASE STUDY / SUBQ-CONFIRM / 2026` with `SUBQ-CONFIRM` in accent. Contact icon row
right-aligned on wider viewports.

### Table (regulatory comparison)
Lives in the light-canvas section (§3, #4) — a paper-white table reads as an audited document,
which fits a regulatory-timeline comparison better than the same table on black. Header row: Sans
700, 13px, uppercase, tracked 0.04em. Body cells: caption role; any duration/date figures in Mono
for tabular alignment. Row separators: `--border-width-hairline` horizontal rules only, no
vertical rules, no zebra striping — zebra stripes are a default-template tell this system avoids
on purpose.

### Cards / bordered surfaces (general)
Every bordered element (stat tile, teaser card, any grouped block in the case study) shares one
contract: no fill, `--border-width-bold` solid `--color-border-bold`, `--radius-none`. There is
exactly one elevation idiom in this system — stroke weight, not background tint or shadow — so
nothing needs a special case.

## 5. Page application

**Home:** header → hero (label `MEDICAL DEVICE PRODUCT MANAGEMENT` → H1 = name, the boldest single
element on the site → body-large one-line positioning directly under → body paragraph, currently
"Bio coming soon." — do not add visual weight or a placeholder-avoidance treatment around this
line; a short italicized or muted line is enough, it doesn't need to compete with the H1 → button
row: primary Resume + ghost Email + ghost LinkedIn, `--space-5` gaps) → `--space-10` gap →
featured-project teaser card → `--space-10` gap → footer. Hero stays flat black — no vignette, no
radial glow, no gradient of any kind; the H1's weight is the entire visual event.

**Case study:** header (or wordmark swapped for a `← Back` affordance) → 7 sections per §3's
rhythm table, each following the section-heading pattern with stat-tile groupings where the copy
has numbers to show → final section closes with the primary CTA button linking to the PDF
(`Download the full pitch deck (PDF)`, small caption underneath) → footer.

## 6. Generic AI-template patterns avoided

| Generic pattern avoided | What's specified instead | Why |
|---|---|---|
| Centered hero, gradient-blob background | Full-flat black hero, huge left-aligned Black-weight name, zero gradient | The weight jump alone is the visual event; a gradient blob is the single most recognizable AI-template tell |
| Soft gray card-on-card surfaces | Zero-fill tiles, 2px ink-colored outline directly on true canvas | "Bold monochrome" means the canvas itself is pure black/white — a gray card box is a diluted middle value that undercuts the whole premise |
| Rounded-everything SaaS geometry | `--radius-none` default, one 2px exception for inline chips | Sharp edges read as architectural confidence, not consumer-app friendliness |
| Subtle multi-tint backgrounds for section rhythm | Full binary black/white canvas inversion per section | A tint ladder is a colored-palette technique borrowed into monochrome; a real inversion is native to this system |
| Blue/purple gradient accent | One flat, non-blue accent, five explicit sanctioned uses, no gradient anywhere | Restraint is the entire point of "monochrome + one accent"; blue is also the exact convention this category needs to break from |
| Drop-shadow elevation | Border-weight elevation only (`--border-width-bold`) | Consistent with a flat, stroke-driven system; shadows imply a light source this palette doesn't have |
| Inter/Poppins/Montserrat at flat 400–600 weights | Archivo run 400→900, hierarchy built from weight extremes | Documented, deliberate weight range instead of default-font flat hierarchy |
| Zebra-striped tables | Hairline row rules only | Zebra striping is a default-component-library tell |
| Color-only link affordance | Always-on underline, ink-colored at rest | Accessible without relying on the one accent color; also keeps accent rationed |

## 7. Don't use

- No navy, no blue of any kind as an accent — this direction exists specifically to break from
  that category convention
- No gradients — text, background, mesh, or button
- No drop shadows for elevation anywhere — border weight only
- No fill/tint on cards or stat tiles — canvas shows through, outline only
- No radius above 2px, and that only for inline chips — buttons/cards/tiles/tables are square
- No Inter, Poppins, or Montserrat
- No font weights below 400 for body text
- No white text on the accent color — fails AA on both canvases, use `--color-ink` (black)
- No accent-colored body-copy-sized text on the light canvas — fails AA, see §1
- No zebra-striped tables
- No color-only status/success indicators
- No mono-label kicker used as a decorative hero motif — the mono role here is functional
  (data/numerals only), not a branding flourish
- No more than the two specified typefaces
- No `filter: invert()` or computed color inversion — both canvases get explicit hex values
