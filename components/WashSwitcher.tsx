"use client";

import { useSyncExternalStore } from "react";
import styles from "./WashSwitcher.module.css";

// The denim-wash accent switcher (DESIGN_SPEC.md §1a). Repoints --color-accent /
// --color-accent-on-light as inline styles on <html> — the same mechanism the anti-FOUC
// script in app/layout.tsx uses on first paint — and persists the choice to localStorage.
// Active-swatch state is read from the DOM (dataset.wash) via a tiny external store rather
// than component state, so selecting a wash doesn't need a setState-in-effect round trip.

// `ink` is a darker/lighter twin used only for --color-accent-on-light, for any wash whose
// true hex is too light to read as accent-colored text/graphics on the light canvas (§1a) —
// Raw and Indigo are saturated enough to work as-is on both canvases; Stone and Ecru aren't.
const WASHES = [
  { id: "raw", label: "Raw", hex: "#7A5CFF", gloss: "Raw: unwashed indigo dye, deep violet-blue before break-in and fade" },
  { id: "indigo", label: "Indigo", hex: "#4C6EDB", gloss: "Indigo: the classic denim blue, fully saturated dye" },
  { id: "stone", label: "Stone", hex: "#98A8D8", ink: "#253B7F", gloss: "Stone: stone-washed denim, faded to a lighter blue" },
  { id: "ecru", label: "Ecru", hex: "#EBE6D6", ink: "#7A6A42", gloss: "Ecru: undyed cotton, warm off-white" },
] as const;

const WASH_SWAP_CLASS = "wash-swap";

type WashId = (typeof WASHES)[number]["id"];

const STORAGE_KEY = "ia-wash";

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot(): WashId {
  const current = document.documentElement.dataset.wash;
  return WASHES.some((w) => w.id === current) ? (current as WashId) : "indigo";
}

function getServerSnapshot(): WashId {
  return "indigo";
}

function selectWash(id: WashId) {
  const wash = WASHES.find((w) => w.id === id);
  if (!wash) return;
  const root = document.documentElement;
  root.style.setProperty("--color-accent", wash.hex);
  root.style.setProperty("--color-accent-on-light", "ink" in wash ? wash.ink : wash.hex);
  root.dataset.wash = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // localStorage unavailable — selection still applies for this session.
  }
  // Wash-swap pulse (DESIGN_SPEC.md §5): every accent-shadowed surface gets a synchronized
  // scale pulse for the duration of the color transition, so switching washes reads as one
  // visible event across the page, not just a color fade under the hood.
  root.classList.add(WASH_SWAP_CLASS);
  window.setTimeout(() => root.classList.remove(WASH_SWAP_CLASS), 520);
  listeners.forEach((listener) => listener());
}

export default function WashSwitcher() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className={styles.switcher} role="group" aria-label="Accent color, denim wash">
      {/* Names the category once, always visible — the actual comprehension fix. Individual
          swatch names moved to aria-label + an extended hover title (below); a second text
          row here was tried already (§1a) and didn't land. */}
      <span className={styles.caption}>Denim Wash</span>
      <div className={styles.swatches}>
        {WASHES.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`${styles.swatch} neutralSurface ${active === w.id ? styles.active : ""}`}
            style={{ backgroundColor: w.hex }}
            onClick={() => selectWash(w.id)}
            aria-label={`${w.label} accent`}
            aria-pressed={active === w.id}
            title={w.gloss}
          />
        ))}
      </div>
    </div>
  );
}
