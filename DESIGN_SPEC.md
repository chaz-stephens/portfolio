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
stark canvases and weight-driven type contrast are unchanged — the flat/no-shadow/sharp-corner
surface treatment originally specified alongside them was revisited in the next revision below,
once it shipped and was actually tested.

**Revision note (this pass, third):** Chaz reviewed the built site and gave five pieces of direct
feedback. The monogram reads as pixel art, not stitching. The hero/bio layout is imbalanced, with
dead space on the right. The Raw and Black wash colors don't read as their names. The wash
switcher's visible payoff is too small for the attention it commands. And — the deepest issue,
confirmed as a system-wide question, not a buttons-only patch — bordered surfaces with zero radius
and zero shadow read as unstyled/broken; the Resume button specifically "reads like an error." This
pass answers all five directly: the monogram is rebuilt as an actual chain-stitch construction
(§4); the hero gets a real two-column composition instead of one wide paragraph (§6); Raw and Black
get new hex values chosen for at-a-glance recognizability over technical backstory (§1a); the wash
switcher's swap now recolors shadows across every bordered surface on the page, not just a couple
of small elements (§1a, §4); and the flat/no-shadow/sharp-corner rule is replaced with a small
corner radius plus a deliberate hard-edged offset shadow — still monochrome, still with no implied
light source, but no longer reading as an empty box (§3). None of this touches the type system, the
binary canvas-inversion mechanic, the tailoring/denim concept itself, or the case-study-stays-
restrained rule — those tested fine and aren't in question here.

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

**The four washes, exact hex — Raw and Black revised this pass, Indigo and Ecru unchanged:**

| Wash | Hex | Where it comes from |
|---|---|---|
| **Indigo** *(default)* | `#4C6EDB` | Unchanged. A true, recognizable blue, and the quiet nod to Indigo & Asphalt. Loads on first visit, before any JS preference is read. |
| **Raw** | `#B17030` | Revised. The old `#C85A1E` tested as "red," not raw denim — it sat at a saturated ~21° hue, which reads hot/red at that saturation regardless of the denim-fading rationale behind it. This value moves the hue to ~30° (the point most viewers place squarely in "orange," not "red-orange") and drops saturation from 74% to ~57% — the same register as real copper (`#B87333`, hue ~29°) — so it reads as burnt-orange/copper/tan on sight, no denim-nerd footnote required. |
| **Black** | `#767C86` | Revised. The old `#6E7A52` was a technically-real sulfur-black-fade color, but it reads as olive/green, not black, on sight — which is the whole test a labeled swatch has to pass. This value is a genuinely dark, desaturated graphite/gunmetal (hue ~215°, saturation ~11% — barely a hue at all) — visible against the near-black canvas the same way the old value was, but reading as "a dark neutral, i.e. black" instead of drifting into a different color family. |
| **Ecru** | `#D8C9A3` | Unchanged. Undyed cotton — pale, warm, off-white. The one wash that needs a special case, below. |

```css
:root {
  /* Fixed wash palette — never referenced directly by components, see the two-tier rule below */
  --wash-raw:      #B17030;
  --wash-indigo:   #4C6EDB;
  --wash-black:    #767C86;
  --wash-ecru:     #D8C9A3;
  --wash-ecru-ink: #7A6A42; /* Ecru's light-canvas-safe twin, see below */
}
```

**Contrast, WCAG-checked** (relative luminance basis, same method as the previous pass):

| Pair | Dark canvas | Light canvas |
|---|---|---|
| Raw text/graphic on canvas | 4.93:1 | 3.84:1 |
| Indigo text/graphic on canvas | 4.31:1 | 4.41:1 |
| Black (graphite) text/graphic on canvas | 4.71:1 | 4.02:1 |
| Ecru text/graphic on canvas | 12.07:1 | **1.57:1 — fails outright** |
| Ecru's light-canvas twin (`--wash-ecru-ink`, `#7A6A42`) on light canvas | — | 5.07:1 |

All four washes clear the 3:1 floor the universal accent-text rule (below) requires, on both
canvases. Raw's 3.84:1 on the light canvas is the tightest of the four — still comfortably clear
of the floor, and an improvement in balance over the old value's 4.65/4.08 split.

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
with a light-canvas twin; Raw, Indigo, and Black are close enough in luminance to work identically
on both canvases under the rule above.

**Token architecture — two tiers, don't skip this:** `--wash-raw` / `--wash-indigo` /
`--wash-black` / `--wash-ecru` / `--wash-ecru-ink` are the fixed palette definition and never
change. `--color-accent` and `--color-accent-on-light` are the live semantic pointer the switcher
repoints. **Components reference `--color-accent` / `--color-accent-on-light` only — never a
`--wash-*` token directly.** Referencing a wash token in a component would hardcode that one wash
into it and break switchability; this is the same "semantic name, not value name" discipline the
rest of this system already requires, just applied to a value that now moves.

**Where the switcher lives:** header, right cluster, between the contact icons and the Resume
button. Four swatches in a row, now sized to match their own tap target (24px, 6px gaps — the
previous pass drew a visually smaller 20px swatch inside a 24px hit area, which undersold it before
a single click happened). Each filled with its wash hex, `--radius-control` corners (§3), and the
same hard-edged accent shadow (`--shadow-resting-accent`, §3) every other interactive control on the
home page now carries — the switcher already looks like the substantial control it's meant to be,
before it's touched. At ≥1024px a small mono label row (`RAW  INDIGO  BLACK  ECRU`, 10px, tracked,
`--color-ink-muted`) sits above the row; below that breakpoint the labels drop to `aria-label` +
native `title` tooltip only, icon row stays. The active swatch gets a permanent 2px ink ring plus
the same corner-stitch tick detail used on the monogram (§4) — a deliberate visual echo tying the
badge and the switcher to one "stitch" language.

**Making the payoff match the attention it commands (the actual complaint):** the fix isn't a
bigger button, it's a bigger effect. §3 rebuilds this system's elevation model around a hard-edged
shadow rendered in `--color-accent` — every bordered surface that carries `--shadow-resting-accent`
(the primary button, both teaser cards, the size-chart strip, the hero spec-strip, the switcher
itself) recolors the instant a new wash is picked, because the shadow reads `var(--color-accent)`
the same as everything else that already did. That's the entire home page's visible surface area
responding, not two or three small UI elements — the switch was already wired to change one token;
it's the token's blast radius across the page that was too small, and the shadow system fixes that
without adding a second mechanism. On top of that, the monogram's corner-tack ticks (§4) now render
in `--color-accent` permanently, not only on hover, so the header mark itself visibly confirms the
current wash at a glance. And the swap gets a matching one-time beat: every element carrying an
accent shadow gets a synchronized scale pulse for the duration of the color transition (§5) — the
whole page visibly "resets" together, which is the moment that was missing before (a smooth color
fade under the hood, with nothing on the surface to actually notice).

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

  --radius-control: 4px; /* buttons, wash swatches, inputs — small, deliberate, not SaaS-pill */
  --radius-surface: 6px; /* stat tiles, size-chart strip, teaser cards, hero spec-strip */
  --radius-chip:    2px; /* inline mono tags/chips only, if used */
  --radius-none:    0;   /* tables, footer/nav rules — flat data surfaces stay square */

  --container-max: 1200px;
  --prose-max: 720px;

  --border-width-hairline: 1px; /* dividers: nav/footer edges, table rules, prose separators */
  --border-width-bold: 2px;     /* stat tile edges, card edges, button outlines, hover borders */

  --shadow-offset:    4px; /* home-page personality-layer surfaces */
  --shadow-offset-sm: 2px; /* case-study restrained surfaces */
  --shadow-resting-accent:  var(--shadow-offset) var(--shadow-offset) 0 0 var(--color-accent);
  --shadow-resting-neutral: var(--shadow-offset-sm) var(--shadow-offset-sm) 0 0 var(--color-border-hairline);
}
```

Horizontal page padding: 20px mobile, `--space-6` tablet, `--space-8` desktop.

**Elevation and corner treatment — revised this pass, on direct stakeholder feedback.** The
previous two passes specified `--radius-none` everywhere and zero shadow of any kind, reasoned as
"architectural confidence" and "no light source in this palette." Built and reviewed, it read the
opposite way: a bordered box with a square corner and no shadow sitting alone on a black canvas
looks like a broken/unstyled element, not a confident one — Chaz's exact description of the Resume
button was "reads like an error... no raised borders or shadows, looks incomplete." That's real
signal a design rationale can't argue past once it's shipped and someone has to actually use it.

The fix keeps the monochrome, no-gradient, no-tint-surface discipline intact — it does not
reintroduce a raised-gray-card system or a soft blurred drop shadow, both still on the avoid list
(§7/§8) for the reasons already documented. What changes is narrower: a small corner radius
(`--radius-control` / `--radius-surface`, 4–6px — enough to read as a made object, nowhere near the
12–24px "rounded-everything" SaaS convention this system still avoids), and a hard-edged, zero-blur
offset shadow (`--shadow-resting-accent` / `--shadow-resting-neutral`) as the one elevation idiom,
replacing "no elevation idiom at all." A hard offset shadow — a flat duplicate silhouette pushed
2–4px down-right, no blur radius, no falloff — doesn't imply a light source the way a soft drop
shadow does; it reads as one flat plane sitting in front of another, the same flat/graphic
vocabulary this system already uses everywhere else (the notched teaser card, the `clip-path`
cuts), just extended to cover the one case — bordered surfaces sitting on bare canvas — that flat
vocabulary hadn't actually solved yet.

Two shadow registers, matching the two registers this doc already keeps for home vs. case study:

- **`--shadow-resting-accent`** — home-page personality-layer surfaces (primary button, both
  teaser cards, the size-chart strip, the hero spec-strip, the wash switcher). Rendered in
  `--color-accent`, which is also what makes the wash switcher's payoff legible across the whole
  page instead of two small elements (§1a).
- **`--shadow-resting-neutral`** — case-study surfaces (Stat tile, in-body cards) that keep the
  restrained register §6 already establishes. Rendered in `--color-border-hairline`, not accent —
  case-study bodies still carry zero accent outside their one CTA button, and this shadow doesn't
  change that; it just stops those surfaces from reading as unstyled the same way the home page's
  did.

Interaction: on hover, the offset increases by 2px (`--shadow-offset` 4px → 6px, or 2px → 4px for
the neutral register) alongside whatever color/border hover the component already specifies; on
`:active` (mousedown), the shadow collapses to `0 0` and the element translates by the resting
offset, so it visually presses flat against the canvas and springs back on release. Both are
transform/box-shadow only, 150ms, `--ease-standard` — no new duration token needed. Full spec by
component is in §4.

Corners are still a brand decision, not a default: radius stays small and deliberate
(`--radius-control` / `--radius-surface`) everywhere it's used, `--radius-chip` remains the one
smaller exception for inline tags, and tables/footer/nav rules stay perfectly square
(`--radius-none`) — flat data surfaces don't get the treatment components do. (The teaser-card
notch in §4 is a `clip-path` cut layered on top of `--radius-surface`, not a separate radius value —
there is still no curve anywhere in the system, only straight edges at two small radii.)

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
2. **Border, radius, and shadow — not background fill — carry the "heavy contrast."** Stat tiles
   and cards never get a raised gray surface (`--color-canvas-raised` is intentionally identical to
   `--color-canvas` — there is no elevated-surface color in this system, unchanged from the previous
   pass). Elevation is a 2px ink-colored outline plus a small radius plus a hard offset shadow
   (above), not a background tint. That keeps every section's background binary (pure black or pure
   white) while still giving components visible edges and real, legible depth.

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

A "CS" mark, chain-stitched, not a woven/pixel tag anymore. **Revised this pass:** the previous
construction (a pixel-grid "CS" inside a `stroke-dasharray`-bordered square) was built to suggest
stitching but tested as pixel art / 8-bit instead, on direct review. One visual idea — *this is
chain-stitched, by hand, with care* — carried by a stitch texture that actually resembles chain
stitch, not a dashed line borrowed from the same `border: dashed` convention every visitor already
associates with computer UI, not embroidery.

**Why the old version read as pixel art, specifically:** two compounding problems, both fixed
below. (1) The letterforms were quantized to a visible grid — blocky, stepped diagonals — which is
literally what pixel art *is*. (2) The border used thin, flat, evenly-spaced dashes — also literally
what a dashed CSS border *is* — nothing in the construction pointed at thread rather than at a UI
convention.

**Border — literal chain-link, not a beaded dash.** A second revision, made after the first draft
of this pass proposed a thickened "beaded" dash as a proxy for chain stitch, reasoning a literal
interlocking-link texture "couldn't read at this size." That claim was untested and turned out to
be wrong: rendered and checked directly at 128px zoom, 32px (actual header size), and 16px (the
evaluation floor), a genuine chain-link border — small overlapping ellipses running the full
perimeter, alternating tilt so each link reads as caught by the next — holds up clearly at 32px and
degrades gracefully (to a soft continuous texture, not noise) at 16px. It reads as stitched thread
at a glance, which the beaded dash did not manage as convincingly. Use this construction, not the
beaded dash:

**Construction**, following this doc's existing SVG discipline (viewBox-based, no `<text>`, no
raster):

- `viewBox="0 0 32 32"`, built at 32×32 then scaled by CSS to its header size (28–32px).
- **Letterforms — smooth, not gridded.** "CS" set in Archivo Black, converted to path outlines,
  same "no live `<text>`" rule as the main logo. The path must not be quantized to a visible grid
  or step pattern at any zoom level — every diagonal and curve renders exactly as Archivo Black's
  outline defines it. This is the one non-negotiable fix carried over from the first draft of this
  pass: a smooth letterform reads as a typeface; a stepped one reads as pixel art regardless of
  anything else on the mark.
- **Border — a generated chain-link perimeter.** A square path inset from the edge (`x0=4, y0=4`,
  `side=24` in the 32-unit viewBox), traced by small ellipses (`rx=1.5, ry=0.85`,
  `stroke-width="0.5"`, `fill="none"`, `stroke="currentColor"`) spaced every `2.4` units of arc
  length around the perimeter (`n = round(perimeter / spacing)`, perimeter `= side * 4`). Each
  ellipse is placed at its position along the perimeter (walking the four edges in order) and
  rotated to lie tangent to that edge, with an added alternating tilt of `+20deg` / `-20deg` on
  every other link — the alternation is what makes adjacent links read as interlocked rather than
  as a uniform row of identical marks, the actual visual signature of a chain stitch. This is a
  generated pattern (loop/formula), not a hand-placed one — implement it as a small helper that
  walks the perimeter and emits the ellipses, so the spacing/tilt stays exact if the badge's size
  ever changes. A working reference implementation (validated at 128/32/16px) is available in this
  session's scratch verification; reproduce the same parameters (spacing 2.4, rx 1.5, ry 0.85,
  stroke-width 0.5, alternating ±20°) rather than re-deriving them from scratch.
- **Corner ticks** — four short diagonal bar-tack marks at each corner, same rounded linecap as the
  chain-link's implied thread weight (material consistency: nothing on the mark should read as a
  thin "computer line" next to the stitched border). Corner ticks render in `--color-accent` **at
  all times**, not only on hover — a small, low-legibility-risk detail that now doubles as a
  permanent, glanceable confirmation of the current wash selection (§1a).
- Chain-link border and the "CS" letterform fill both use `currentColor` (ink at rest) — one file
  works on both canvases via ordinary CSS inheritance, unchanged from the previous pass.

**Placement:** top-left of the header, badge first, a small wordmark ("Chaz Stephens", Sans 700,
16px, existing nav spec) immediately beside it. The badge becomes the anchor mark; the wordmark
stays for fast name-recognition on a first scan — badge carries the primary visual weight, wordmark
keeps the name legible.

**Hover state:** the chain-link border and the "CS" fill (not the always-accent corner ticks, which
have nothing left to transition to) flash to `var(--color-accent)`, 300ms, `--ease-standard`,
reverting on mouseout/blur. This is sanctioned accent use #6 (§4, accent-use list) and is the one
place the badge and the wash switcher visibly confirm they're the same system.

**Evaluation, same bar as the primary logo:** works at 16px (test it — this is the floor, header
renders it at 28–32px so there's margin; already verified in this pass, see above), works in
monochrome (it's built in one color by construction), works on both canvases (currentColor),
meaning is discoverable without explanation. If re-implementing from this spec rather than the
verified reference, re-check the smooth-letterform, chain-link-border construction at actual 16px
*and* at the 28–32px header size before calling it done — letterform quantization and a too-sparse
or too-uniform link spacing are exactly the two things that silently regress back into "pixel art"
or "generic dashed line" if this is free-handed from memory instead
of the spec above.

### Hero spec-strip (positioning card)

New this pass — the right-column device that replaces the empty space beside the hero bio (§6).
Reuses the Stat-tile/tag-card vocabulary already established elsewhere in this doc rather than
inventing a new component family: bold outline, `--radius-surface`, `--shadow-resting-accent` (§3)
— visually "one more spec-sheet object," not a new visual idea competing with the hero's H1.

**Structure, top to bottom**, inside one bordered container (`--border-width-bold` solid
`--color-border-bold`, no fill, `--space-5` padding):
- Mono label kicker, e.g. `CURRENT FOCUS`, `--color-ink-muted`, `--space-3` gap, hairline rule
  underneath (same head-rule idiom as the size-chart strip's kicker row).
- One short line of body-large text — a single distilled positioning statement (not the full bio;
  a pull-line sourced from the bio copy, not a duplicate of it).
- `--space-5` gap → one Stat number (sm) + mono label pair (a single headline figure — e.g. years
  in medtech PM, the one number a hiring manager should register fastest), same construction as a
  Stat tile's number/label pair but without a second nested border — this card is the container,
  not a wrapper around another bordered tile.

**Placement:** desktop hero grid, right column (§6). Mobile: stacks full-width below the bio
paragraphs, above the button row, same bordered-card treatment — the component is width-agnostic
by construction, no special-casing needed.

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
7. **New this pass:** the hard offset shadow (`--shadow-resting-accent`, §3) on home-page bordered
   surfaces — the primary button, both teaser cards, the size-chart strip, the wash switcher, and
   the hero spec-strip. Deliberately a bigger surface-area use than the other six: it's what makes
   the wash switcher's payoff visible across the whole page (§1a) instead of a couple of small
   elements.

Never a background wash, never a gradient, never the default color of a whole component. If a
design question can't be answered by one of these seven, the answer is ink, not accent.

**Exempt from this list, not a violation of it:** the wash-switcher swatches themselves (§1a) and
the active-swatch selection ring. They render the wash palette *as* palette — that's their literal
job, not an eighth "spend" of a rationed color. The rationing rule governs how accent is used
*once selected*; the switcher is the selection mechanism, not a consumer of it.

### Stat tile
No fill — sits directly on the section's canvas. `--border-width-bold` (2px) solid
`--color-border-bold`, `--radius-surface` (6px), `--shadow-resting-neutral` (§3) — the neutral,
ink-toned shadow, since Stat tile's primary home is the case study's restrained register. Padding
`--space-5`. Number on top (Mono 700, tabular, per role above), `--space-2` gap, then label (mono
label role), then optional one-line caption in caption role, `--color-ink-secondary`. Grid: 2–3
tiles per row, `--space-4` gap, single column under 640px. Used inside a case-study teaser card's
embedded stat row, and inside case-study in-body sections (static, no hover). This is a different
component from the size-chart stat strip below — see that section for the distinction.

**Exception — nested inside a teaser card:** the 3-tile row embedded in a case-study teaser card
(below) drops its own shadow and radius entirely and sits flush against the teaser card's inner
padding, borderless dividers only (`--border-width-hairline` verticals between cells, same idiom as
the size-chart strip). The teaser card already carries `--shadow-resting-accent`; stacking a second
shadow on a tile inside it would read as shadow-on-shadow clutter, not more elevation. This is the
one place Stat tile's own contract is superseded by its container's.

### Size-chart stat strip (home page career stats)

Numeric career stats (years experience, patents, publications, Fit Finder's catalog size, etc.)
presented the way measurements sit on a spec sheet — one ruled strip, not a grid of separate
boxes. This is the deliberate difference from Stat tile above: a size chart is one table with
column dividers, not N independent bordered tiles.

**Structure**, top to bottom:
- Optional kicker row: mono label (e.g. `CAREER SPEC`), `--color-ink-muted`, `--space-3` gap,
  then a `--border-width-hairline` rule underneath — a head rule, like a chart's title row.
- One horizontal strip, wrapped in the standard bold-outline card contract (2px solid
  `--color-border-bold`, no fill, `--radius-surface`, `--shadow-resting-accent`, §3) — a single
  container, not per-stat containers.
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
`--ease-standard`. No border/accent color change beyond the shadow's own hover-deepen (§3) — this
component isn't in the seven sanctioned accent-color uses beyond its shadow, and doesn't need to
be; the tactile confirmation carries it.

### Case-study teaser card (tag-styled)

Home page hosts two of these — SubQ-Confirm and Fit Finder. Same no-fill, bold-outline contract as
a stat tile at container scale, now also carrying `--radius-surface` and `--shadow-resting-accent`
(§3) — this is one of the home-page surfaces the "reads unfinished" feedback was about, so it gets
the full revised treatment, not just the notch/seam detail. Padding `--space-6`, with one added
quotation: a die-cut corner, the way a hang tag is notched, plus a stitched seam along the cut.
Restrained — one notch, one short dashed line, not a fully dashed outline or a literal punched
grommet hole (that would tip into illustrated-tag-graphic territory, which the brief explicitly
avoids).

**Structure, top to bottom:**
- Top-right corner clipped via `clip-path`, ~16px 45° cut (`polygon(0 0, calc(100% - 16px) 0,
  100% 16px, 100% 100%, 0 100%)`) — layered on top of the card's own `--radius-surface`; the three
  un-notched corners keep the 6px radius, only the notch itself is a hard cut.
- A `::before` pseudo-element sits exactly on that diagonal cut: `border-top: 1px dashed
  var(--color-border-bold)`, rotated to match — the "seam" the die-cut implies is stitched shut.
  This is the only dashed element on the card; the rest of the border stays the standard 2px
  solid contract from §3/Cards.
- Metadata line, positioned first (like a care tag's fabric-content line sits near the top): mono
  label role, `--color-ink-muted`, `/`-separated — reusing the exact separator convention the
  footer already establishes (`ROLE / TIMELINE / STACK`, e.g. `PRODUCT MGMT / 2023–2025 / REACT,
  PYTHON, FDA 510(k)`).
- `--space-3` gap → H3 project title → one-line description → `--space-5` gap → embedded Stat
  tile row (3 tiles, headline metrics, borderless/shadowless per the Stat-tile nesting exception
  above) that links through to the case study.
- Hover: border → accent (sanctioned use #4), shadow offset deepens 4px → 6px (§3), plus a 2px
  `translateY(-2px)` lift via transform. 150ms, `--ease-standard`. The shadow now visibly sells the
  lift — previously the transform had nothing reinforcing it, which was part of why the hover felt
  thin.
- `:active` (mousedown): shadow collapses to 0 and the card translates by the resting offset, per
  §3's press interaction.

### Wash switcher
See §1a for hex values, tokens, the expanded payoff, and the transition mechanism. Component
placement: header right cluster. Visual form: four 24px swatches (matching their own tap target,
revised from the previous pass's smaller 20px), `--radius-control`, `--shadow-resting-accent` — the
one piece of chrome that now shares the same elevation contract as the content it controls, active
one ringed + corner-stitched to match the monogram.

### Buttons
**Primary (Resume, PDF CTA) — revised this pass, the component "reads like an error" was
specifically about.** `--color-accent` fill, `--color-ink` text (black-on-accent, never white —
see contrast table), Sans 700, 16px, padding 14px 32px, `--radius-control` (4px), no border,
`--shadow-resting-accent` (§3). Fill and text color are unchanged from the previous pass — the
missing pieces were the radius and the shadow, and adding them is the whole fix; this button didn't
need new colors or new copy, it needed to look like a built object instead of a flat rectangle with
nothing defining its edges beyond a color change.

Hover: inverts — transparent fill, 2px accent border, accent text, same as before — plus the shadow
offset deepens 4px → 6px, same interaction every other accent-shadowed surface now has. 150ms,
`--ease-standard`. `:active`: shadow collapses to 0, button translates by the resting offset (§3) —
the "press" reads as a real button press for the first time.

Secondary/ghost: transparent fill, `--border-width-bold` solid `--color-ink`, `--color-ink` text,
`--radius-control`, `--shadow-resting-neutral` (ink-toned, not accent — this button isn't the
primary CTA and doesn't need to compete for accent-shadow surface area). Hover: border and text →
accent, shadow offset deepens 2px → 4px, 150ms, `--ease-standard`.

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
Every bordered element (stat tile, size-chart strip, case-study teaser card, hero spec-strip, any
grouped block in a case study) shares one contract: no fill, `--border-width-bold` solid
`--color-border-bold`, a small radius (`--radius-surface`, 6px), and a hard offset shadow — accent
on home-page personality-layer surfaces, neutral/ink-toned on case-study surfaces (§3). **Revised
this pass:** the previous contract was radius-none plus zero shadow, "stroke weight is the only
elevation idiom" — that's the rule direct stakeholder feedback was against, so it's no longer the
rule. What's unchanged: still no fill, still no background tint, still no gradient — the canvas
shows through every bordered surface exactly as before; radius and shadow are additions to the
outline contract, not a replacement of it. The teaser card's notch + single stitched seam is still
the one sanctioned exception to "border is always solid," still scoped to that one component only —
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

**Wash-swap pulse (new this pass)** — the visual event that makes switching washes feel worth
doing, alongside the shadow-recoloring described in §1a:
- Trigger: the wash switcher's click handler adds a `.wash-swap` class to
  `document.documentElement` for `--duration-transition` (500ms), removing it after, so it can fire
  again on the next click.
- Effect: every element carrying `--shadow-resting-accent` (button, teaser cards, size-chart strip,
  hero spec-strip, switcher swatches) gets `transform: scale(1) → scale(1.02) → scale(1)` for the
  duration of the class, `--ease-standard`, keyframe midpoint at 250ms — halfway through the color
  transition, not at the end — so the whole set of accent-shadowed surfaces visibly "resets"
  together, in sync with the color itself finishing its interpolation.
- One shared CSS animation keyed off one class toggle, not a per-component script — the same "one
  mechanism, wide blast radius" principle the shadow-recoloring already uses.

**Hover / tactile states** — `--duration-micro` (150ms), `--ease-standard`, unless noted:
- Buttons: fill/border invert (§4).
- Links, teaser card border: color → accent.
- Buttons, teaser cards, size-chart strip, hero spec-strip: shadow offset deepens on hover, then
  collapses to 0 with a matching translate on `:active` (§3) — one timing value governs the whole
  hover/press moment per component, not a separate one for the shadow.
- Teaser card: additionally `translateY(-2px)` on hover, reinforced by its own shadow-deepen above.
- Wash switcher swatch: `transform: scale(1.08)` on hover.
- Size-chart stat cell: label color shift + underline draw, 200ms.
- Monogram: chain-link border and "CS" fill → accent, 300ms (slightly slower than a standard hover —
  it's a discovery moment, not a functional affordance, allowed to breathe a little longer). Corner
  ticks stay accent at rest (§4) — nothing to transition.

**`prefers-reduced-motion: reduce`:**
- Scroll reveals disable entirely — content renders at final state (opacity 1, no transform) with
  no observer-driven delay. Nothing "waits" for scroll under reduced motion.
- Transform-based hovers (teaser card lift, swatch scale, and the new shadow-offset/press-flatten
  transforms) are removed (`transform: none`); color-only hover transitions (border→accent,
  link→accent) remain, since a color change alone isn't the kind of motion this preference targets.
  Shadow offset stays fixed at its resting value under reduced motion — no hover-deepen, no
  press-collapse — while the shadow itself (a static `box-shadow`, not a transform) keeps rendering;
  only its *animation* is removed.
- The wash-swap pulse (above) is removed entirely — no scale transform — leaving only the
  (already-reduced, below) color interpolation.
- The wash-swap transition (§1a) collapses to near-instant (treat as 0–50ms) rather than 500ms —
  a color change is arguably safe under reduced motion, but flattening it costs nothing and avoids
  relitigating the judgment call.
- The canvas flip was already instant and unaffected either way.

## 6. Page application

**Home — rebuilt as the site's full hero.** One long scrolling page, header (monogram + wordmark
+ wash switcher + contact + Resume, §4) fixed on top throughout:

1. **Hero — revised this pass, real compositional work, not a CSS alignment toggle.** Direct
   feedback: one dense bio paragraph, left-aligned, in a much wider viewport, reading as unbalanced
   overall — "an eyesore," his words, more about general imbalance than text alignment alone (he
   confirmed both when asked directly). The H1 treatment itself is untouched — still the boldest
   single element on the site, still flat black, no vignette, no gradient. What changes is
   everything around it.

   **Structure, ≥1024px — two-column grid**, `grid-template-columns: minmax(0, 1fr) 320px`,
   `--space-9` (96px) column gap, inside the standard `--container-max` (1200px) container — not
   `--prose-max`. The previous version capped the *whole hero* at a narrow prose width instead of
   just the paragraph, which is what left the right side of a wide viewport empty:
   - **Left column:** label `MEDICAL DEVICE PRODUCT MANAGEMENT` → H1 = name → body-large one-line
     positioning statement → **two shorter bio paragraphs**, split from the previous single dense
     block (first covers who/what — current role, domain, years; second covers the differentiator —
     how he works, what's specific to him — each capped at ~3–4 lines at this column's width, not
     one 8-line block) → button row (Resume + Email + LinkedIn, `--space-5` gaps). Bio paragraphs
     get `text-align: justify; hyphens: auto;` — he asked directly whether alignment was part of
     it, and it is, applied to the paragraphs only, not the H1 or the single-line positioning
     statement, where justify does nothing on a one-line block and looks broken on a short
     paragraph's last line.
   - **Right column:** the hero spec-strip (§4) — a bordered, radius+shadow card carrying a
     distilled positioning pull-line and one headline stat, in the same tag/spec-sheet language as
     the size-chart strip below it. This is the actual answer to "unused space on the right": a
     real second thing to look at, built from a component this system already has, not a CSS trick
     and not a new illustration. A portrait can replace or sit alongside this card later if one
     becomes available — the grid slot is sized to make that swap trivial, not to require it now.
   - Result: a left-heavy typographic mass balanced against a compact right-anchored card — an
     asymmetric, editorial composition, not a forced symmetric one, which fits "bold monochrome"
     better than false balance would.

   **Structure, <1024px:** single column, order = label → H1 → positioning line → bio paragraphs
   (still justified/hyphenated) → hero spec-strip (full width) → button row. No grid, no
   positioning changes needed — the card's contract is width-agnostic by construction (§4).
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
| Rounded-everything SaaS geometry | Small, deliberate radius (4–6px: `--radius-control` / `--radius-surface`) — revised this pass from a zero-radius default that tested as unfinished, not architectural — still nowhere near the 12–24px pill-shaped radius this row exists to avoid | A 4–6px corner reads as "a made object with a considered edge"; a 16px+ corner reads as a default-component-library card. The distance between those two is the point of this row, not the existence of any radius at all |
| Subtle multi-tint backgrounds for section rhythm | Full binary black/white canvas inversion per section | A tint ladder is a colored-palette technique borrowed into monochrome; a real inversion is native to this system |
| Blue/purple gradient accent | One flat accent at a time (now user-switchable, still one at a time, still no gradient) | Restraint is the entire point of "monochrome + one accent" even once the value is variable |
| Soft, blurred drop-shadow elevation (the generic `box-shadow: 0 4px 12px rgba(0,0,0,.1)` card-elevation tell) | A hard-edged, zero-blur offset shadow (`--shadow-resting-accent` / `--shadow-resting-neutral`, §3) — a flat duplicate plane, not simulated directional light | Revised this pass: the previous rule (zero shadow, period) tested as "looks incomplete," not "consistent." A *soft* shadow was never the right fix — it implies a light source this palette doesn't have and is itself the generic tell. A *hard* shadow with no blur stays inside the flat/graphic vocabulary already used everywhere else on the site (the notch, the `clip-path` cuts) while still giving real elevation |
| Single dense hero paragraph with unused space beside it | Two shorter paragraphs + a bordered hero spec-strip claiming the right column (§4, §6) | A wall of left-aligned text in a wide, otherwise-empty container is a common unstyled-template symptom; splitting the copy and giving the layout a second considered element fixes the actual imbalance, not just the line length |
| Technically-justified but unrecognizable palette names ("raw" that reads red, "black" that reads olive) | Hue and saturation chosen for at-a-glance name recognition first, denim backstory second (§1a) | A labeled color picker only works if a viewer can confirm the label by looking — a correct-but-counterintuitive technical justification doesn't survive contact with an actual user, which is exactly what happened here |
| Inter/Poppins/Montserrat at flat 400–600 weights | Archivo run 400→900, hierarchy built from weight extremes | Documented, deliberate weight range instead of default-font flat hierarchy |
| Zebra-striped tables | Hairline row rules only | Zebra striping is a default-component-library tell |
| Color-only link affordance | Always-on underline, ink-colored at rest | Accessible without relying on the one accent color; also keeps accent rationed |
| Illustrated/cartoon tag or badge graphic | CSS `clip-path` notch + one dashed stitch line; SVG path-built monogram, no raster asset | A literal tag illustration reads as decoration bolted on, not a system; the die-cut and stitch quotations do the same job with one line of `clip-path` and a `stroke-dasharray` |
| Generic "spin the color wheel" theme picker with no meaning | Four named, sourced denim washes with documented hex derivations | The switcher has to trace back to something real about Chaz, not be delight for its own sake |
| Dotted/dashed UI border read as a "stitch" | A generated chain-link perimeter (small alternating-tilt ellipses walking the border path) on the monogram border (§4) — tested and verified at 128/32/16px, not a proxy | A thin flat dash is a literal CSS `border: dashed` — instantly reads as UI chrome, not embroidery. A thickened "beaded" dash was tried first and still read as a dotted line; the literal interlocking-link pattern is what actually reads as chain stitch, and it was confirmed to hold up at real header size rather than assumed to fail there |

## 8. Don't use

- No navy, no blue of any kind as the *default* accent register beyond the Indigo wash's own
  hex — this direction exists specifically to break from institutional-blue convention; Indigo
  wash is the one deliberate, sourced exception, not an opening to add more blues
- No gradients — text, background, mesh, or button
- No soft/blurred drop shadows anywhere — shadow is always a hard, zero-blur offset
  (`--shadow-resting-accent` / `--shadow-resting-neutral`, §3); a soft shadow implies a light
  source this palette still doesn't have
- No shadow color other than `--color-accent` (home-page surfaces) or `--color-border-hairline`
  (case-study surfaces) — no black rgba shadow, no per-component custom shadow value
- No fill/tint on cards, stat tiles, or the size-chart strip — canvas shows through, outline only
- No radius above 6px (`--radius-surface`) on any bordered surface, no radius above 4px
  (`--radius-control`) on any interactive control, no radius at all on tables/footer/nav rules —
  revised from the previous zero-radius rule, but still nowhere near pill-shaped/SaaS-default
  radius values
- No pixel-grid-quantized letterforms or thin flat dashes in the monogram construction — that
  combination is what read as pixel art the last time; letterforms stay smooth vector outlines,
  stitch texture stays a generated chain-link perimeter, not a dash and not a beaded-dash proxy
  for one (§4)
- No single uncapped-width dense paragraph in the hero with empty space beside it — the hero is a
  two-column grid at ≥1024px (§6), not a narrow text block adrift in a wide container
- No wash color chosen for technical/backstory accuracy alone — a new or revised wash must pass the
  same at-a-glance name-recognition test Raw/Indigo/Black/Ecru were held to this pass, not just a
  contrast check (§1a)
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
  exception check for the new color, and confirming it clears the name-recognition test above
- No tag-styled cards, spec-sheet stat strips, or wash-switcher duplication inside case-study
  body content — that personality layer is chrome- and home-page-only (§6)
