# Fresh-Eyes Design Critique — chaz-stephens.com

Reviewed live at 1440px viewport (`/` and `/work/subq-confirm`), cross-checked against `DESIGN_SPEC.md`
and the actual rendered CSS/DOM (measured, not eyeballed — exact numbers below).

## Verdict: execution/calibration problem, not a direction problem

The monochrome-plus-one-switchable-accent, hard-offset-shadow, small-radius system is a genuinely
distinctive choice for a medtech-PM portfolio — it avoids institutional blue, avoids the soft-shadow/
pill-radius SaaS template, and three rounds of real feedback have already fixed the things that were
actually broken (pixel-art monogram, wash colors that didn't read as their names, the flat button that
"read like an error"). Nothing below asks you to abandon that system.

What's actually happening: the system is being implemented **literally and uniformly** instead of being
pushed to its own stated ceiling. The spec allows 120px display type — the layout boxes it into a 656px
column so it never reads as monumental. The spec implies a hierarchy of importance — every bordered
surface gets the identical 4px shadow regardless of what it's holding. The wash-switcher is called "the
site's signature interactive toy" — it ships as a 2%-scale pulse and a shadow re-tint. Every one of these
is the same failure mode: correct ingredient, average-strength dose. Turning the intensity up means
executing the same direction less politely, not picking a new one.

The one place I'd push back harder than "just turn it up": the accent-as-shadow-everywhere rule (§1a/§3)
technically keeps to "one accent," but in practice it makes indigo the single most-repeated visual element
on the page — every card, the button, the switcher, all carry the same thin accent-colored outline. A
color that's ambient everywhere reads as trim, not as a considered accent. That's a small system-level
call worth revisiting, not just a polish pass (see Color section below).

---

## Typography & scale

**The H1 is boxed to its column instead of dominating the page.** Measured: 120px/114px line-height,
-3.6px tracking, weight 900 — but it renders inside a 656px-wide left column, so "Chaz Stephens" wraps
cleanly inside its box rather than commanding the full 1200px container. Display-to-body ratio is
120:16 = **7.5:1**. For a hero that's supposed to be "the boldest single element on the site," that's
below the 10:1+ a genuinely dramatic hero typically hits, and the type never gets to feel viewport-scale
because it's polite about staying inside its grid cell.
- **Fix:** let the H1 break the two-column grid — either span the full 1200px container (sitting behind
  or above the spec-strip card, not constrained to the left track) or give it a deliberate negative-margin
  bleed past the right column's left edge. Either move pushes the ratio past 10:1 without changing the
  type scale token itself.

**The home page peaks once, in the first 700px, then goes flat for the next ~2000px.** Confirmed live:
the case-study page has a real 64px/900-weight H2 at the top of every one of its 7 sections (measured:
`fontSize: 64px, lineHeight: 67.2px, fontWeight: 900`) — a genuine scale crescendo every 700-900px of
scroll. The home page has **no H2 at all**. "Career Spec" and "Experience" are both 12px mono kickers;
after the H1, nothing on the home page ever exceeds 40px (the stat numbers) for the rest of the page.
That asymmetry — home page loud once then quiet, case study rhythmic throughout — is a large part of why
the home page in particular reads as low-intensity.
- **Fix:** give the career-stats or experience section an actual statement headline at H2 scale
  (48-64px), not just a mono kicker — e.g., a one-line career thesis pulled from the bio copy. That's a
  second crescendo the page currently doesn't have.

**Justified body text at a 656px measure is trading one flaw for a subtler one.** Confirmed live:
`text-align: justify; hyphens: auto` on both bio paragraphs, rendered at 656px width, in Archivo — a
grotesque sans not built for justification. At this measure, justify produces uneven word-spacing
("rivers") on a short two-paragraph block; it was the fix for the previous "ragged, eyesore" complaint,
but narrow-column justify in a sans-serif is its own well-known readability wart, just a quieter one.
- **Fix:** left-align (`text-align: start`) and let the two-paragraph split (already a real improvement)
  do the balancing work instead; if justify stays, it needs a wider column (900px+) or a serif/text-heavy
  face before the word-spacing evens out.

## Composition — the "empty card" is a symptom, not a one-off

Measured directly: the hero's "Current Focus" card is **320px wide × 791px tall**. Its actual content —
kicker, one line of body-large text, gap, one stat number/label pair — totals roughly 270px. **About 65%
of the card is dead space in the middle.** This specific card is being handled by another specialist, but
it's worth naming the pattern it exposes: the component was built exactly to its written spec (bordered
box, `--radius-surface`, `--shadow-resting-accent`) without a pass checking whether real copy fills a box
at the height the grid actually gives it. That's a layout-and-content problem (vertical alignment,
content density, or box height), not a token problem — fixing it in the design system won't fix it; it
needs eyes on the built page with real copy in place.

**Every bordered surface on the home page is the identical formula, which flattens hierarchy.** The hero
spec-strip, the career-spec strip, and both teaser cards all use: 2px ink border, 6px radius, flat 4px
accent shadow, mono kicker, big number. Three structurally different components (a positioning card, a
data strip, a project teaser) end up visually indistinguishable from each other. Consistency is good;
this is consistency doing the job hierarchy should be doing — nothing on the page is visually louder than
anything else, which is a big part of "not intense."
- **Fix:** vary shadow weight by importance instead of using one flat 4px everywhere — e.g., 8px offset
  on whichever single card is most important per section (arguably the teaser cards, since they're the
  actual proof-of-work), 4px on secondary strips, 2px/neutral on tertiary elements. Let the shadow itself
  encode rank.

## Color — the accent is everywhere, which is why it doesn't feel like an accent

The design system's own rule rations accent use to ~7 sanctioned moments (§4), but the shadow
blast-radius exception means the accent-colored hard shadow appears on literally every bordered surface
on the home page simultaneously — the hero card, the stats strip, both teaser cards, the button, the
switcher. That's not restraint in practice; indigo is the single most-repeated visual element on the
page, just diluted to a thin outline glow rather than a fill. A color used at low intensity everywhere
reads as decorative trim, not as a deliberate flash — the opposite of what "one accent, used sparingly"
is supposed to buy you.
- **Fix:** pick one surface per page to carry a bold, high-coverage accent treatment (a filled panel, a
  full-bleed color band behind one stat, or an oversized accent-colored numeral) and drop the accent tint
  from the lower-priority cards in favor of a plain ink-toned hairline shadow. Save the color for one loud
  moment instead of spreading it thin across all of them — this also directly amplifies the wash
  switcher's payoff (see below), since there'd be one big, obvious thing to watch change color instead of
  several small shadow re-tints.

## Motion — competent, not choreographed

**One reveal recipe is reused for everything.** Every scroll-triggered entrance on the page — hero
content, stat cells, timeline entries, teaser cards — uses the identical `opacity 0→1 +
translateY(24px→0)`, 600ms, one easing curve (confirmed in `globals.css` `.reveal`/`.reveal-visible`).
That's correct baseline craft, but it means four structurally different content types (a number, a
timeline entry, a card, a hero) all move exactly the same way. Nothing about the motion tells you "this
is a data point" vs. "this is a project" vs. "this is a career milestone."
- **Fix:** differentiate the reveal by content type — stat numbers count up from 0 instead of only
  fading in; timeline entries draw their connecting vertical rule as they enter instead of just
  translating; teaser cards combine the lift with a border-color sweep. Distinct motion per content type
  reads as choreography; identical motion reads as a checkbox that got ticked once and copy-pasted.

**The wash-swap "signature moment" is under-amplified relative to its own billing.** `DESIGN_SPEC.md`
calls this "the site's signature interactive toy" (§1a), but the actual effect is a 2% scale pulse
(`scale(1) → scale(1.02) → scale(1)`) plus a shadow-color crossfade on bordered surfaces. Measured
against that billing, it's genuinely subtle — you would not register it happened unless told to watch for
it. This is the real version of "the payoff doesn't match the attention it commands": the fix isn't a
bigger switcher button (already addressed in the last pass), it's a bigger *event*. A 2% scale nudge on a
handful of shadows is not a moment worth building a whole personality layer around.
- **Fix:** on swap, add one unmistakable, page-wide beat — e.g., a full-width 2px accent rule sweeping
  across the header on trigger, or a brief accent-colored flash on the H1 itself — something that reads
  as "the whole page just changed" rather than "some outlines re-tinted."

**The primary CTA has a plainer hover than a secondary content card.** The Resume button's hover only
inverts fill/border and deepens its shadow; the teaser cards additionally get `translateY(-2px)`. The
site's single highest-intent interactive element (the one a hiring manager is most likely to click) has
less hover presence than a project card. That's a small thing, but it's backwards for signaling what
matters most.
- **Fix:** give the primary button its own lift (`translateY(-1px)` or a matching scale) on hover, on top
  of the existing fill invert — cheap to add, and it's currently the one interactive element on the page
  that moves *less* than its neighbors.

## The case study is the stronger page — worth noticing why

Confirmed live: `/work/subq-confirm` genuinely alternates dark/white canvas across all 7 sections
(measured background-color per section: `#0a0a0a` → `#fafaf8` → `#0a0a0a`...), each section opens with a
real 64px/900-weight H2, and the stat trios/tables/pull-quotes stay cleanly restrained exactly as the
spec intends — no personality-layer clutter competing with the argument. This page has a beat roughly
every 700-900px of scroll, all the way down. If "intensity" is the complaint, it's a home-page problem
much more than a case-study problem. Worth stating plainly: the imbalance between the two pages (home
peaks once and flattens; case study keeps a rhythm throughout) is itself part of the diagnosis — the
system knows how to do this well, it's just not applying that same discipline to the page meant to make
the first impression.

## Summary — where to spend effort first

1. Break the H1 out of its 656px column (biggest single lever on "intensity," cheapest to test).
2. Give the home page a second scale crescendo (an H2-scale statement) so it doesn't flatten after the
   fold.
3. Vary shadow weight by hierarchy instead of flat 4px everywhere, so importance is visible at a glance.
4. Concentrate the accent into one bold moment per page instead of spreading it as ambient shadow tint
   across every card — this also makes the wash switcher's payoff bigger for free.
5. Differentiate scroll-reveal motion by content type instead of one recipe for everything.
6. Amplify the wash-swap moment itself (a page-wide beat, not just a shadow re-tint) — separate from,
   and in addition to, the switcher's button-size fix already in progress.
