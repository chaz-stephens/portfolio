import CountUpNumber from "./CountUpNumber";
import styles from "./HeroSpecStrip.module.css";

// The hero's right-column device (DESIGN_SPEC.md §4/§6) — replaces the empty space beside
// the bio at desktop width with one more spec-sheet object: a kicker, a distilled pull-line
// (not a duplicate of the bio), and one headline stat. Reuses the Stat-tile/tag-card
// vocabulary already established elsewhere rather than inventing a new component family.

interface HeroSpecStripProps {
  kicker: string;
  line: string;
  statNumber: string;
  statLabel: string;
}

export default function HeroSpecStrip({
  kicker,
  line,
  statNumber,
  statLabel,
}: HeroSpecStripProps) {
  return (
    <div className={`${styles.strip} neutralSurface`}>
      <span className={styles.kicker}>{kicker}</span>
      <p className={styles.line}>{line}</p>
      <div className={styles.stat}>
        <CountUpNumber value={statNumber} className={styles.statNumber} />
        <span className={styles.statLabel}>{statLabel}</span>
      </div>
    </div>
  );
}
