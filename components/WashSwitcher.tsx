"use client";

import { useSyncExternalStore } from "react";
import styles from "./WashSwitcher.module.css";

// The denim-wash accent switcher (DESIGN_SPEC.md §1a). Repoints --color-accent /
// --color-accent-on-light as inline styles on <html> — the same mechanism the anti-FOUC
// script in app/layout.tsx uses on first paint — and persists the choice to localStorage.
// Active-swatch state is read from the DOM (dataset.wash) via a tiny external store rather
// than component state, so selecting a wash doesn't need a setState-in-effect round trip.

const WASHES = [
  { id: "raw", label: "Raw", hex: "#C85A1E" },
  { id: "indigo", label: "Indigo", hex: "#4C6EDB" },
  { id: "black", label: "Black", hex: "#6E7A52" },
  { id: "ecru", label: "Ecru", hex: "#D8C9A3" },
] as const;

type WashId = (typeof WASHES)[number]["id"];

const ECRU_INK = "#7A6A42";
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
  root.style.setProperty("--color-accent-on-light", id === "ecru" ? ECRU_INK : wash.hex);
  root.dataset.wash = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // localStorage unavailable — selection still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

export default function WashSwitcher() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className={styles.switcher} role="group" aria-label="Accent color, denim wash">
      <div className={styles.labels} aria-hidden="true">
        {WASHES.map((w) => (
          <span key={w.id} className={styles.labelText}>
            {w.label}
          </span>
        ))}
      </div>
      <div className={styles.swatches}>
        {WASHES.map((w) => (
          <button
            key={w.id}
            type="button"
            className={`${styles.swatch} ${active === w.id ? styles.active : ""}`}
            style={{ backgroundColor: w.hex }}
            onClick={() => selectWash(w.id)}
            aria-label={`${w.label} accent`}
            aria-pressed={active === w.id}
            title={w.label}
          />
        ))}
      </div>
    </div>
  );
}
