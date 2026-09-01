import type { JSX } from "react";
import styles from "./Monogram.module.css";

// Path-built "CS" monogram, styled like a woven clothing tag: a stitched (dashed) border,
// four corner bar-tack ticks, and blocky path-built letterforms — no live <text> in the SVG,
// no raster asset. See DESIGN_SPEC.md §4. Purely decorative: the adjacent wordmark carries
// the accessible name, so this is aria-hidden.

const CELL = 2;

// 5x7 pixel-grid letterforms, kept blocky/square to match the system's sharp-corner discipline.
const C_BITMAP = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
];

const S_BITMAP = [
  [0, 1, 1, 1, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
];

const CORNERS = [
  { cx: 2, cy: 2 },
  { cx: 30, cy: 2 },
  { cx: 2, cy: 30 },
  { cx: 30, cy: 30 },
];

function glyphRects(bitmap: number[][], originX: number, originY: number, keyPrefix: string) {
  const rects: JSX.Element[] = [];
  bitmap.forEach((row, r) => {
    row.forEach((on, c) => {
      if (on) {
        rects.push(
          <rect
            key={`${keyPrefix}-${r}-${c}`}
            x={originX + c * CELL}
            y={originY + r * CELL}
            width={CELL}
            height={CELL}
          />
        );
      }
    });
  });
  return rects;
}

export default function Monogram() {
  return (
    <svg
      viewBox="0 0 32 32"
      className={styles.svg}
      aria-hidden="true"
      focusable="false"
    >
      {/* Stitched outer border */}
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 1.5"
      />
      {/* Corner bar-tack ticks */}
      {CORNERS.map(({ cx, cy }) => (
        <g key={`${cx}-${cy}`} stroke="currentColor" strokeWidth="1">
          <line x1={cx - 2} y1={cy - 2} x2={cx + 2} y2={cy + 2} />
          <line x1={cx - 2} y1={cy + 2} x2={cx + 2} y2={cy - 2} />
        </g>
      ))}
      {/* "CS" monogram, path-built via a pixel grid */}
      <g fill="currentColor">
        {glyphRects(C_BITMAP, 5, 9, "c")}
        {glyphRects(S_BITMAP, 17, 9, "s")}
      </g>
    </svg>
  );
}
