import styles from "./Monogram.module.css";

// Path-built "CS" monogram: a chain-stitched border (generated perimeter of overlapping,
// alternating-tilt ellipses — verified at 128px/32px/16px to read as stitched thread, not a
// dashed UI rule or pixel art), four corner bar-tack ticks in a fixed accent color, and real
// Archivo Black glyph outlines for "C"/"S" (extracted from the typeface, not a pixel grid).
// No live <text> in the SVG, no raster asset. See DESIGN_SPEC.md §4. Purely decorative: the
// adjacent wordmark carries the accessible name, so this is aria-hidden.

// Chain-link perimeter generator — walks a square path and emits small ellipses tangent to
// each edge, alternating tilt ±20° so adjacent links read as caught by one another. Exact
// parameters (spacing 2.4, rx 1.5, ry 0.85, stroke-width 0.5) are verified, not arbitrary —
// see DESIGN_SPEC.md §4 for the render tests this construction was checked against.
function chainLinkPerimeter(x0: number, y0: number, side: number, spacing: number) {
  const perim = side * 4;
  const n = Math.round(perim / spacing);
  const links: { cx: number; cy: number; angle: number }[] = [];
  for (let i = 0; i < n; i++) {
    const d = (i * spacing) % perim;
    let x: number, y: number, angle: number;
    if (d < side) {
      x = x0 + d;
      y = y0;
      angle = 0;
    } else if (d < side * 2) {
      x = x0 + side;
      y = y0 + (d - side);
      angle = 90;
    } else if (d < side * 3) {
      x = x0 + side - (d - side * 2);
      y = y0 + side;
      angle = 0;
    } else {
      x = x0;
      y = y0 + side - (d - side * 3);
      angle = 90;
    }
    links.push({ cx: x, cy: y, angle: angle + (i % 2 ? 20 : -20) });
  }
  return links;
}

const CHAIN_LINKS = chainLinkPerimeter(4, 4, 24, 2.4);

const CORNERS = [
  { cx: 2, cy: 2 },
  { cx: 30, cy: 2 },
  { cx: 2, cy: 30 },
  { cx: 30, cy: 30 },
];

// Archivo Black "C"/"S" outlines (unitsPerEm 1000, y-up, extracted via fontTools) placed into
// the 32x32 viewBox at cap-height ~9 units, centered as a pair with a small ligature gap.
const GLYPH_C =
  "M733 405H522Q522 465 490.5 500.0Q459 535 401 535Q334 535 302.5 493.0Q271 451 271 376V312Q271 238 302.5 195.5Q334 153 399 153Q463 153 496.0 186.0Q529 219 529 279H733Q733 138 646.5 63.0Q560 -12 402 -12Q226 -12 135.5 78.0Q45 168 45 344Q45 520 135.5 610.0Q226 700 402 700Q555 700 644.0 623.5Q733 547 733 405Z";
const GLYPH_S =
  "M667 488V476H460V480Q460 510 438.0 530.0Q416 550 371 550Q327 550 303.5 537.0Q280 524 280 505Q280 478 312.0 465.0Q344 452 415 438Q498 421 551.5 402.5Q605 384 645.0 342.0Q685 300 686 228Q686 106 603.5 47.0Q521 -12 383 -12Q222 -12 132.5 42.0Q43 96 43 233H252Q252 181 279.0 163.5Q306 146 363 146Q405 146 432.5 155.0Q460 164 460 192Q460 217 429.5 229.5Q399 242 330 256Q246 274 191.0 293.5Q136 313 95.0 358.0Q54 403 54 480Q54 593 141.5 646.5Q229 700 363 700Q495 700 580.0 646.5Q665 593 667 488Z";
const GLYPH_SCALE = 0.013;

export default function Monogram() {
  return (
    <svg
      viewBox="0 0 32 32"
      className={styles.svg}
      aria-hidden="true"
      focusable="false"
    >
      {/* Chain-stitched border */}
      <g fill="none" stroke="currentColor" strokeWidth="0.5">
        {CHAIN_LINKS.map((l, i) => (
          <ellipse
            key={i}
            cx={l.cx}
            cy={l.cy}
            rx="1.5"
            ry="0.85"
            transform={`rotate(${l.angle} ${l.cx} ${l.cy})`}
          />
        ))}
      </g>
      {/* Corner bar-tack ticks — fixed accent, not currentColor: a permanent, glanceable
          confirmation of the current wash selection (§1a), not just a hover state. */}
      {CORNERS.map(({ cx, cy }) => (
        <g key={`${cx}-${cy}`} stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round">
          <line x1={cx - 2} y1={cy - 2} x2={cx + 2} y2={cy + 2} />
          <line x1={cx - 2} y1={cy + 2} x2={cx + 2} y2={cy - 2} />
        </g>
      ))}
      {/* "CS" monogram — real Archivo Black glyph outlines, not a pixel grid */}
      <g fill="currentColor">
        <path d={GLYPH_C} transform={`translate(5.85 20.55) scale(${GLYPH_SCALE} ${-GLYPH_SCALE})`} />
        <path d={GLYPH_S} transform={`translate(16.764 20.55) scale(${GLYPH_SCALE} ${-GLYPH_SCALE})`} />
      </g>
    </svg>
  );
}
