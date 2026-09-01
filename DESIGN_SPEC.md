---
adjectives: [bold, authoritative, precise, confident, unmistakable, tactile, inventive]
anti_adjectives: [quiet, decorative, templated, corporate-generic, timid]
primary_color: "#4C6EDB"
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

**Revision note (this pass):** the live site tested as credible but static — "not fun, interactive,
or memorable." This spec adds a personality layer on top of the system above, not a replacement of
it: a monogram, a live-switchable accent (denim washes — Raw / Indigo / Black / Ecru), tag- and
spec-sheet-styled components, and real scroll/hover motion. The metaphor is tailoring/denim, used
lightly, drawn from Chaz's own work (he runs a denim publication; one case study is literally a
garment-measurement tool) — not borrowed decoration. It lands hardest on the home page, which is
being rebuilt as the site's full hero (see §6). Case-study sub-pages keep the original restrained,
data-forward register — that's where the medtech hiring manager reads technical depth, and it
should not compete with a personality layer. The accent is no longer a single fixed hex (see §1a);
everything else in §0 — stark canvases, sharp corners, no gradients/shadows, weight-driven type
contrast — is unchanged and still governs both the home page and the case studies.

**Single dark-default theme, no user-facing light/dark toggle.** What looks like "light mode"
below is a structural device — specific sections invert to a white canvas as a rhythm technique,
not as a user preference. Both canvases get explicit token values, never a computed inversion
(no `filter: invert()`, no opacity tricks) — same discipline dark-mode tokens require. (The one
user-facing toggle this system now has is the accent-color switcher in §1a, which is a different
mechanism: it repoints one token's value, it does not invert or compute anything.)

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

  /* Accent — switchable, see §1a. --color-accent is a live pointer JS repoints on wash selection. */
  --color-accent:          var(--wash-indigo);      /* current selection; default = Indigo */
  --color-accent-on-light: var(--wash-indigo);       /* text/thin-stroke-safe twin for light canvas, see §1a */
  --color-accent-bright:   color-mix(in srgb, var(--color-accent) 80%, white 20%);  /* hover on dark canvas */
  --color-accent-deep:     color-mix(in srgb, var(--color-accent) 80%, black 20%);  /* hover on light canvas */

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

  /* accent tokens are set by JS on :root and inherit into every scope, incl. .theme-light —
     see §1a for why --color-accent-on-light sometimes differs from --color-accent */
}
```

### 1a. The denim-wash accent switcher

This replaces the old spec's single fixed `#E85015`. The discipline is unchanged — **one accent
color, used consistently everywhere it appears, no gradient, no second accent** — but the *value*
of that one accent is now a client-side personalization the visitor picks, not a value baked into
the CSS. This is the site's signature interactive toy: attention-grabbing, zero functional
purpose, pure delight, built from Chaz's own material (real denim wash names) rather than a
borrowed gimmick.

**The four washes, exact hex:**

| Wash | Hex | Where it comes from |
|---|---|---|
| **Indigo** *(default)* | `#4C6EDB` | The true dye color, and the quiet nod to Indigo & Asphalt. Loads on first visit, before any JS preference is read. |
| **Raw** | `#C85A1E` | Unwashed selvedge denim's warm, coppery cast — the color raw indigo throws before repeated washing cools it down. Deliberately close in register to the old brand orange: "raw" is the material this identity started from. |
| **Black** | `#6E7A52` | *Not* literal black — literal black would vanish against the near-black canvas, which defeats the point of an accent. This is what black denim actually fades to: sulfur-black dye breaks down to an olive/moss cast with wear, a real and well-known denim fact, not an invented workaround. |
| **Ecru** | `#D8C9A3` | Undyed cotton — pale, warm, off-white. The one wash that needs a special case, below. |

**Contrast, WCAG-checked** (relative luminance basis, same method as the original spec's table):

| Pair | Dark canvas | Light canvas |
|---|---|---|
| Raw text/graphic on canvas | 4.65:1 | 4.08:1 |
| Indigo text/graphic on canvas | 4.31:1 | 4.41:1 |
| Black (olive) text/graphic on canvas | 4.31:1 | 4.40:1 |
| Ecru text/graphic on canvas | 12.07:1 | **1.57:1 — fails outright** |
| Ecru's light-canvas twin (`--wash-ecru-ink`, `#7A6A42`) on light canvas | — | 5.07:1 |

**Simplified universal accent-text rule (tightened from the original spec):** because the accent
value now changes underneath the same CSS, this system adopts one rule that holds for all four
washes rather than certifying each one separately: **accent renders as text only at 24px+ bold, or
as a non-text graphical element (rules, borders, icons) at any size.** Never small body-copy-sized
accent text, on either canvas, regardless of wash. This is a slightly stricter version of the old
per-canvas rule, traded for not needing conditional accessibility logic per color.

**The Ecru exception:** true Ecru (`#D8C9A3`) is light enough that it fails even the large-text/
non-text threshold against the light canvas (1.57:1 — nowhere close to the 3:1 floor). On the dark
canvas it's excellent (12:1) and used as-is. On the light canvas, any accent usage — text or
graphical — substitutes `--wash-ecru-ink` (`#7A6A42`, a dark khaki) instead. This is the only wash
with a light-canvas twin; Raw, Indigo, and Black-olive are close enough in luminance to work
identically on both canvases under the rule above.

**Token architecture — two tiers, don't skip this:** `--wash-raw` / `--wash-indigo` /
`--wash-black` / `--wash-ecru` / `--wash-ecru-ink` are the fixed palette definition and never
change. `--color-accent` and `--color-accent-on-light` are the live semantic pointer the switcher
repoints. **Components reference `--color-accent` / `--color-accent-on-light` only — never a
`--wash-*` token directly.** Referencing a wash token in a component would hardcode that one wash
into it and break switchability; this is the same "semantic name, not value name" discipline the
rest of this system already requires, just applied to a value that now moves.

**Where the switcher lives:** header, right cluster, between the contact icons and the Resume
button. Four small swatches in a row (~20px, 6px gaps), each filled with its wash hex. At ≥1024px
a small mono label row (`RAW  INDIGO  BLACK  ECRU`, 10px, tracked, `--color-ink-muted`) sits above
the row; below that breakpoint the labels drop to `aria-label` + native `title` tooltip only, icon
row stays. The active swatch gets a permanent 2px ink ring plus the same corner-stitch tick detail
used on the monogram (§4) — a deliberate visual echo tying the badge and the switcher to one
"stitch" language. Minimum tap target 24×24px per swatch even at the compact size.

**Interaction — the transition has to feel deliberate, not instant:**

```css
@property --color-accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #4C6EDB;
}

:root {
  --duration-transition: 500ms;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}

:root, .theme-light {
  transition: --color-accent var(--duration-transition) var(--ease-standard);
}
```

Registering `--color-accent` via `@property` with `<color>` syntax makes the browser interpolate
its computed value smoothly over 500ms instead of jumping instantly — every element consuming
`var(--color-accent)` (button fills, borders, link hovers, stat numbers) follows that interpolated
value automatically, frame by frame, with no per-component code beyond the existing `var()`
reference. This is independent of the 150ms hover-state transitions already on borders/links (§4)
— those still fire at 150ms on `:hover`/`:focus`; the 500ms curve only governs the wash swap
itself. `@property` and `color-mix()` are both solid baseline in 2026 evergreen browsers; where
unsupported, the swap simply becomes instant with no interpolation — acceptable degradation for a
decorative toy, not a functional regression.

**Persistence:** `localStorage`, key `ia-wash`, values `raw` / `indigo` / `black` / `ecru`. Read
and applied via a small blocking inline script in `<head>` — before first paint, before any CSS
renders — that sets `--color-accent` (and `--color-accent-on-light`, computed per the Ecru rule
above) as inline styles on `document.documentElement`. This avoids a flash of default Indigo
followed by a jump to the saved wash on repeat visits, the same anti-FOUC pattern a dark-mode
toggle uses. No preference stored → Indigo, full stop, matching the CSS default so no-JS visitors
see the correct color too.

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
appear in Sans body prose, so a number never wobbles mid-sentence even outside a stat tile. The
size-chart stat strip (§4) and the career-stats section (§6) both depend on this already-specified
discipline; nothing new is needed there beyond using the existing roles.

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
never a card or button. (The teaser-card notch in §4 is a `clip-path` cut, not a radius — it stays
inside this discipline; there is still no curve anywhere in the system.)

**The monotony risk, addressed directly:** a colored palette gets section rhythm for free — swap
background tints and you're done. Monochrome doesn't have that lever without diluting the
"stark black/white" premise into a gray-tint gradient, which would just be the old deck's
approach with the hue removed. Instead, rhythm comes from two levers that are native to bold
monochrome rather than borrowed from a color system:

1. **Full binary canvas inversion.** Sections don't shift tint, they flip — black canvas to
   white canvas and back — using the `.theme-light` scope from §1. This is a bigger, more
   deliberate beat than a tint change, and it's a real convention in this reference category
   (agency/studio sites), not an invented workaround. This flip stays an instant hard cut — it is
   never eased or animated (see §5); only content *within* a section gets scroll motion.
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

The Fit Finder case study (§6) reuses this exact rhythm mechanism — section count and beats may
differ with its content, but the dark/light narrative-flip logic and the padding scale are the
same contract, not a second system.

## 4. Component specs

### Monogram badge

A "CS" mark styled like a woven clothing tag: a corner-stitched border with the initials set
inside, small enough to sit in the header at all times. One visual idea — *this is a made
garment, stitched together with care* — not three ideas competing.

**Construction**, following this doc's existing SVG discipline (viewBox-based, no `<text>`, no
raster):

- `viewBox="0 0 32 32"`, built at 32×32 then scaled by CSS to its header size (28–32px) —
  scalability-first per this doc's logo principles.
- Outer border: a rect inset 2px from the edge, `stroke-dasharray="2 1.5"` — a stitched line, not
  a solid outline. This is what separates it from every other 2px-solid-bordered element in the
  system (§3's card contract); the dash *is* the point here.
- Four corner ticks: short diagonal line pairs crossing the border at each corner, echoing a
  bar-tack/corner lockstitch reinforcement on a real tag.
- "CS" monogram: Archivo Black letterforms converted to path outlines (same "no live `<text>` in
  logo SVGs" rule as the main logo spec), centered in the inner square.
- Every stroke and fill uses `currentColor` — one file works on both canvases via ordinary CSS
  color inheritance, not a computed inversion (this is standard cascade behavior, not the
  `filter: invert()` this doc already forbids).

**Placement:** top-left of the header, badge first, a small wordmark ("Chaz Stephens", Sans 700,
16px, existing nav spec) immediately beside it. The badge becomes the anchor mark; the wordmark
stays for fast name-recognition on a first scan — this satisfies "replacing or accompanying" by
doing both: badge carries the primary visual weight, wordmark keeps the name legible.

**Hover state:** stroke color (border dashes + corner ticks + CS fill) transitions to
`var(--color-accent)`, 300ms, `--ease-standard`, reverting on mouseout/blur. This is sanctioned
accent use #6 (§4, accent-use list) and is the one place the badge and the wash switcher visibly
confirm they're the same system.

**Evaluation, same bar as the primary logo:** works at 16px (test it — this is the floor, header
renders it at 28–32px so there's margin), works in monochrome (it's built in one color by
construction), works on both canvases (currentColor), meaning is discoverable without
explanation (a tag-stitched monogram on a menswear-adjacent portfolio reads without a caption).

### Nav / header
Always dark canvas regardless of the section scrolled beneath it — fixed chrome, not content, so
it does not participate in the section-inversion rhythm. Height 64–72px, `--border-width-hairline`
solid `--color-border-hairline` bottom edge, no scroll-elevation shadow. Left: monogram badge +
wordmark (see above). Right: inline contact links (email, LinkedIn — icon + label, never
icon-only/color-only), the wash switcher (§1a), then the primary Resume button. No hamburger:
three pages don't need one; stack or icon-only under 640px, wash switcher collapses to icon-only
with tooltips first.

### Section heading pattern
Label (`SECTION NUMBER — TITLE`, e.g. `04 — REGULATORY & REIMBURSEMENT`) in the mono label role,
`--color-ink-muted` → `--space-3` gap → H2 → optional `--space-4` gap → body-large lede,
`--color-ink-secondary`, capped at `--prose-max`. The label is data-typography (mono, muted), not
a colored kicker motif — accent doesn't appear here; it's rationed for the uses below.

### The places accent appears — and nowhere else
1. Primary button fill (Resume, final PDF CTA).
2. Exactly one number per stat group — the headline metric, rendered in accent instead of ink.
3. Inline link hover/focus state (rest state is ink + always-on underline, see below).
4. Case-study teaser card: border shifts from `--color-border-hairline` to accent on hover.
5. The current-page indicator in the footer tag line.
6. Monogram hover state (above) — stroke color flashes to accent, confirming mark ↔ switcher.

Never a background wash, never a gradient, never the default color of a whole component. If a
design question can't be answered by one of these six, the answer is ink, not accent.

**Exempt from this list, not a violation of it:** the wash-switcher swatches themselves (§1a) and
the active-swatch selection ring. They render the wash palette *as* palette — that's their literal
job, not a seventh "spend" of a rationed color. The rationing rule governs how accent is used
*once selected*; the switcher is the selection mechanism, not a consumer of it.

### Stat tile
No fill — sits directly on the section's canvas. `--border-width-bold` (2px) solid
`--color-border-bold`, `--radius-none`, padding `--space-5`. Number on top (Mono 700, tabular,
per role above), `--space-2` gap, then label (mono label role), then optional one-line caption in
caption role, `--color-ink-secondary`. Grid: 2–3 tiles per row, `--space-4` gap, single column
under 640px. Used inside a case-study teaser card's embedded stat row, and inside case-study
in-body sections (static, no hover). This is a different component from the size-chart stat strip
below — see that section for the distinction.

### Size-chart stat strip (home page career stats)

Numeric career stats (years experience, patents, publications, Fit Finder's catalog size, etc.)
presented the way measurements sit on a spec sheet — one ruled strip, not a grid of separate
boxes. This is the deliberate difference from Stat tile above: a size chart is one table with
column dividers, not N independent bordered tiles.

**Structure**, top to bottom:
- Optional kicker row: mono label (e.g. `CAREER SPEC`), `--color-ink-muted`, `--space-3` gap,
  then a `--border-width-hairline` rule underneath — a head rule, like a chart's title row.
- One horizontal strip, wrapped in the standard bold-outline card contract (2px solid
  `--color-border-bold`, no fill, `--radius-none`) — a single container, not per-stat containers.
- Inside: equal-width cells in a row, each holding one measurement. Number: Mono 700, tabular,
  Stat number (sm) role, centered in its cell. `--space-2` gap. Label below: mono label role,
  uppercase, tracked, `--color-ink-muted`, also centered (e.g. `YRS EXP`, `PATENTS`, `PUBLISHED`,
  `CATALOG SKUS`).
- Cell dividers: `--border-width-hairline` solid `--color-border-hairline` vertical rules between
  adjacent cells — internal divisions inside one bordered group, not new bordered surfaces. This
  is what makes it read as a chart's column rules rather than a card grid.
- Responsive: wraps to 2 columns under 640px with the same hairline-divider logic; strip never
  breaks into individual per-stat cards at any width.

**Hover (tactile, informational not a link):** on a cell's hover, its label transitions
`--color-ink-muted` → `--color-ink` and a 1px underline draws under the number, 200ms,
`--ease-standard`. No border/accent change — this component isn't in the six sanctioned accent
uses, and doesn't need to be; the tactile confirmation carries it.

### Case-study teaser card (tag-styled)

Home page hosts two of these — SubQ-Confirm and Fit Finder. Same no-fill, bold-outline contract
as a stat tile at container scale, padding `--space-6`, with one added quotation: a die-cut
corner, the way a hang tag is notched, plus a stitched seam along the cut. Restrained — one notch,
one short dashed line, not a fully dashed outline or a literal punched grommet hole (that would
tip into illustrated-tag-graphic territory, which the brief explicitly avoids).

**Structure, top to bottom:**
- Top-right corner clipped via `clip-path`, ~16px 45° cut (`polygon(0 0, calc(100% - 16px) 0,
  100% 16px, 100% 100%, 0 100%)`).
- A `::before` pseudo-element sits exactly on that diagonal cut: `border-top: 1px dashed
  var(--color-border-bold)`, rotated to match — the "seam" the die-cut implies is stitched shut.
  This is the only dashed element on the card; the rest of the border stays the standard 2px
  solid contract from §3/Cards.
- Metadata line, positioned first (like a care tag's fabric-content line sits near the top): mono
  label role, `--color-ink-muted`, `/`-separated — reusing the exact separator convention the
  footer already establishes (`ROLE / TIMELINE / STACK`, e.g. `PRODUCT MGMT / 2023–2025 / REACT,
  PYTHON, FDA 510(k)`).
- `--space-3` gap → H3 project title → one-line description → `--space-5` gap → embedded Stat
  tile row (3 tiles, headline metrics) that links through to the case study.
- Hover: border → accent (sanctioned use #4), plus a 2px `translateY(-2px)` lift via transform
  only — no shadow, this system doesn't have a light source. 200ms, `--ease-standard`.

### Wash switcher
See §1a for hex values, tokens, and the transition mechanism. Component placement: header right
cluster. Visual form: four small swatches, active one ringed + corner-stitched to match the
monogram. No card/border contract applies here — it's chrome, not content.

### Buttons
Primary (Resume, PDF CTA): `--color-accent` fill, `--color-ink` text (black-on-accent, never
white — see contrast table), Sans 700, 16px, padding 14px 32px, `--radius-none`, no border.
Hover: inverts — transparent fill, 2px accent border, accent text. This invert-on-hover (rather
than a lighten/darken shift) is the deliberate "crafted" hover for this system. 150ms,
`--ease-standard`.

Secondary/ghost: transparent fill, `--border-width-bold` solid `--color-ink`, `--color-ink` text.
Hover: border and text → accent, 150ms, `--ease-standard`.

Focus-visible (all interactive elements): 2px solid `--color-focus` outline, 2px offset.

### Links (inline body text)
`--color-ink`, underline always on (not hover-only) — this reserves accent for the sanctioned
moments instead of spending it on every inline link, and keeps the affordance color-independent.
Hover/focus: text and underline → accent (sanctioned moment #3), 150ms, `--ease-standard`.

### Footer
Always dark canvas, mirroring the nav. `--border-width-hairline` top edge. Mono label role,
`--color-ink-muted`, items separated by ` / `; the current-page tag renders in accent (sanctioned
moment #5). Example, home: `PORTFOLIO / MEDICAL DEVICE PM / CHAZ STEPHENS © 2026`. Example, case
study: `CASE STUDY / SUBQ-CONFIRM / 2026` with `SUBQ-CONFIRM` in accent. Contact icon row
right-aligned on wider viewports. No wash switcher duplicated here — one instance, in the header,
is enough; footer stays purely informational.

### Table (regulatory comparison)
Lives in the light-canvas section (§3, #4) — a paper-white table reads as an audited document,
which fits a regulatory-timeline comparison better than the same table on black. Header row: Sans
700, 13px, uppercase, tracked 0.04em. Body cells: caption role; any duration/date figures in Mono
for tabular alignment. Row separators: `--border-width-hairline` horizontal rules only, no
vertical rules, no zebra striping — zebra stripes are a default-template tell this system avoids
on purpose.

### Cards / bordered surfaces (general)
Every bordered element (stat tile, size-chart strip, case-study teaser card, any grouped block in
a case study) shares one contract: no fill, `--border-width-bold` solid `--color-border-bold`,
`--radius-none`. There is exactly one elevation idiom in this system — stroke weight, not
background tint or shadow. The teaser card's notch + single stitched seam (above) is the one
sanctioned exception to "border is always solid," and it's scoped to that one component only —
don't extend the dashed treatment to stat tiles, tables, or any other bordered surface.

## 5. Motion & scroll behavior

The color switcher and the tag/spec-sheet motifs above are half of "interactive and memorable" —
this is the other half. Two named easing curves, three named durations, everything else specified
against them so nothing gets an ad hoc animation value.

```css
:root {
  --duration-micro:      150ms; /* hover/focus state changes */
  --duration-transition: 500ms; /* wash-switcher color swap (§1a) */
  --duration-reveal:     600ms; /* scroll-triggered entrance */

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);   /* symmetric, quick — hovers, the wash swap */
  --ease-reveal:   cubic-bezier(0.16, 1, 0.3, 1);   /* decelerate, settles — scroll entrances */
}
```

**Scroll-triggered reveal** (home page sections, career-stats cells, timeline entries, teaser
cards):
- Trigger: `IntersectionObserver`, `threshold: 0.15`, `rootMargin: "0px 0px -10% 0px"` — fires
  slightly before the element's bottom edge fully clears the viewport, not exactly on entry.
- Effect: `opacity 0 → 1` + `transform: translateY(24px) → translateY(0)`.
- Duration/easing: `--duration-reveal` (600ms), `--ease-reveal`.
- Stagger: sibling elements in a group (career-stats cells, timeline entries, the two teaser
  cards) stagger 80ms apart, capped at 5 staggered items — longer lists don't get a longer wait,
  remaining items animate together with the 5th.
- Fires once per element: unobserve after the first trigger. No re-animating on scroll-back-up.
- **The canvas flip itself is never part of this.** Section background inversion (§3) stays an
  instant hard cut, unanimated, by design — motion applies to content revealing *within* a
  section, never to the black/white swap that gives the system its rhythm.

**Hover / tactile states** — `--duration-micro` (150ms), `--ease-standard`, unless noted:
- Buttons: fill/border invert (§4).
- Links, teaser card border: color → accent.
- Teaser card: additionally `translateY(-2px)` on hover (transform only, no shadow).
- Wash switcher swatch: `transform: scale(1.08)` on hover.
- Size-chart stat cell: label color shift + underline draw, 200ms.
- Monogram: stroke → accent, 300ms (slightly slower than a standard hover — it's a discovery
  moment, not a functional affordance, allowed to breathe a little longer).

**`prefers-reduced-motion: reduce`:**
- Scroll reveals disable entirely — content renders at final state (opacity 1, no transform) with
  no observer-driven delay. Nothing "waits" for scroll under reduced motion.
- Transform-based hovers (teaser card lift, swatch scale) are removed (`transform: none`); color-
  only hover transitions (border→accent, link→accent) remain, since a color change alone isn't the
  kind of motion this preference targets.
- The wash-swap transition (§1a) collapses to near-instant (treat as 0–50ms) rather than 500ms —
  a color change is arguably safe under reduced motion, but flattening it costs nothing and avoids
  relitigating the judgment call.
- The canvas flip was already instant and unaffected either way.

## 6. Page application

**Home — rebuilt as the site's full hero.** One long scrolling page, header (monogram + wordmark
+ wash switcher + contact + Resume, §4) fixed on top throughout:

1. **Hero** — unchanged from the original spec: label `MEDICAL DEVICE PRODUCT MANAGEMENT` → H1 =
   name, the boldest single element on the site → body-large one-line positioning directly under
   → bio paragraph (existing copy, untouched) → button row (Resume + Email + LinkedIn,
   `--space-5` gaps). Flat black, no vignette, no gradient — the H1's weight is still the entire
   visual event. The personality layer does not intrude here; this section is the one place bold
   monochrome carries the whole scene alone, same as before.
2. **Career stats** — the size-chart stat strip (§4), reveal-animated in on scroll, cells
   staggered 80ms.
3. **Work-history / experience timeline** — reuses existing tokens rather than inventing a new
   component family: a vertical `--border-width-hairline` rule, entries as mono date labels +
   Sans role/company text, each entry reveal-animated on scroll with the same stagger logic as
   the stats. No new visual system here; this is existing typography and spacing applied to new
   content, kept deliberately plain so it doesn't compete with the stats and teasers around it.
4. **Case-study teasers** — both, SubQ-Confirm and Fit Finder, in the tag-styled card from §4,
   reveal-animated on scroll.
5. **Contact** — button row repeated at point of exit (Resume + Email + LinkedIn), same button
   spec as the hero.
6. **Footer** — as specified in §4.

Canvas inversion (§3) still applies across these sections for rhythm — the hero opens dark; career
stats and timeline can flip to light for the density break the original doc used for the
regulatory table; teasers and contact return to dark before the footer. Exact assignment is a
narrative call at build time, following the same "flip marks a beat, doesn't alternate
mechanically" logic as §3's case-study table.

**Case study (`/work/subq-confirm`, `/work/fit-finder`): stays restrained.** Header (wordmark or a
`← Back` affordance, monogram optional/small — this is not where the personality layer plays) → 7
sections (or however many the content needs; Fit Finder's case study is new and may not map to
exactly 7) per §3's rhythm table, each following the section-heading pattern with Stat tile
groupings (not the size-chart strip — that's a home-page-only component) where the copy has
numbers to show → final section closes with the primary CTA button → footer. **No tag-styled
cards, no wash-switcher duplication, no monogram hover flourish inside the body content** — the
personality layer belongs to shared chrome (header/footer, present everywhere) and to the home
page; case-study bodies stay data-forward on purpose, since that's where a hiring manager reads
technical depth and any added personality would read as noise competing with the argument being
made.

## 7. Generic AI-template patterns avoided

| Generic pattern avoided | What's specified instead | Why |
|---|---|---|
| Centered hero, gradient-blob background | Full-flat black hero, huge left-aligned Black-weight name, zero gradient | The weight jump alone is the visual event; a gradient blob is the single most recognizable AI-template tell |
| Soft gray card-on-card surfaces | Zero-fill tiles, 2px ink-colored outline directly on true canvas | "Bold monochrome" means the canvas itself is pure black/white — a gray card box is a diluted middle value that undercuts the whole premise |
| Rounded-everything SaaS geometry | `--radius-none` default, one 2px exception for inline chips | Sharp edges read as architectural confidence, not consumer-app friendliness |
| Subtle multi-tint backgrounds for section rhythm | Full binary black/white canvas inversion per section | A tint ladder is a colored-palette technique borrowed into monochrome; a real inversion is native to this system |
| Blue/purple gradient accent | One flat accent at a time (now user-switchable, still one at a time, still no gradient) | Restraint is the entire point of "monochrome + one accent" even once the value is variable |
| Drop-shadow elevation | Border-weight elevation only (`--border-width-bold`); hover "lift" uses `transform` only | Consistent with a flat, stroke-driven system; shadows imply a light source this palette doesn't have |
| Inter/Poppins/Montserrat at flat 400–600 weights | Archivo run 400→900, hierarchy built from weight extremes | Documented, deliberate weight range instead of default-font flat hierarchy |
| Zebra-striped tables | Hairline row rules only | Zebra striping is a default-component-library tell |
| Color-only link affordance | Always-on underline, ink-colored at rest | Accessible without relying on the one accent color; also keeps accent rationed |
| Illustrated/cartoon tag or badge graphic | CSS `clip-path` notch + one dashed stitch line; SVG path-built monogram, no raster asset | A literal tag illustration reads as decoration bolted on, not a system; the die-cut and stitch quotations do the same job with one line of `clip-path` and a `stroke-dasharray` |
| Generic "spin the color wheel" theme picker with no meaning | Four named, sourced denim washes with documented hex derivations | The switcher has to trace back to something real about Chaz, not be delight for its own sake |

## 8. Don't use

- No navy, no blue of any kind as the *default* accent register beyond the Indigo wash's own
  hex — this direction exists specifically to break from institutional-blue convention; Indigo
  wash is the one deliberate, sourced exception, not an opening to add more blues
- No gradients — text, background, mesh, or button
- No drop shadows for elevation anywhere — border weight only; hover "lift" is `transform` only
- No fill/tint on cards, stat tiles, or the size-chart strip — canvas shows through, outline only
- No radius above 2px (chip exception only) — buttons/cards/tiles/tables/notched teaser cards are
  otherwise square; the teaser notch is a `clip-path` cut, not a radius
- No Inter, Poppins, or Montserrat
- No font weights below 400 for body text
- No white text on the accent color, any wash — fails AA, use `--color-ink` (black)
- No accent-colored small body-copy-sized text on either canvas, any wash — see §1a's tightened
  universal rule
- No zebra-striped tables
- No color-only status/success indicators
- No mono-label kicker used as a decorative hero motif — the mono role here is functional
  (data/numerals only), not a branding flourish
- No more than the two specified typefaces
- No `filter: invert()` or computed color inversion for the canvas system — both canvases get
  explicit hex values (the monogram's `currentColor` is ordinary CSS inheritance, not this)
- No component referencing a `--wash-*` token directly — always `--color-accent` /
  `--color-accent-on-light`, or switching washes silently breaks that component
- No raster image for the monogram or the teaser-card tag detail — both are CSS/SVG constructions
- No animating the binary canvas-inversion flip — it stays an instant hard cut; motion is for
  content revealing within a section, never the section swap itself
- No fifth wash added without updating this spec's hex table, contrast table, and the Ecru-style
  exception check for the new color
- No tag-styled cards, spec-sheet stat strips, or wash-switcher duplication inside case-study
  body content — that personality layer is chrome- and home-page-only (§6)
