import Reveal from "./Reveal";
import CountUpNumber from "./CountUpNumber";
import styles from "./StatStrip.module.css";

interface StatStripItem {
  number: string;
  label: string;
  accent?: boolean;
}

interface StatStripProps {
  kicker?: string;
  items: StatStripItem[];
}

// Size-chart stat strip (DESIGN_SPEC.md §4, home page only) — one ruled strip with internal
// hairline column dividers, distinct from StatTile's grid of independently bordered tiles.
// Cells are individually reveal-animated per §5 ("cells staggered 80ms").
export default function StatStrip({ kicker, items }: StatStripProps) {
  return (
    <div>
      {kicker ? (
        <div className={styles.kickerRow}>
          <span className={styles.kicker}>{kicker}</span>
        </div>
      ) : null}
      <div className={styles.strip}>
        {items.map((item, i) => (
          <Reveal key={item.label} index={i} className={styles.cell}>
            <CountUpNumber
              value={item.number}
              className={`${styles.number} ${item.accent ? styles.accent : ""}`}
            />
            <span className={styles.label}>{item.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
