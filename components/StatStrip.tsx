import Reveal from "./Reveal";
import CountUpNumber from "./CountUpNumber";
import styles from "./StatStrip.module.css";

interface StatStripItem {
  number: string;
  label: string;
  accent?: boolean;
}

interface StatStripProps {
  items: StatStripItem[];
}

// Size-chart stat strip (DESIGN_SPEC.md §4, home page only). The accent-flagged stat (the
// rarer credential) gets structural privilege — its own bordered/shadowed cell and a larger
// number — instead of just a color tint inside an otherwise-identical grid cell; the fresh-
// eyes critique's "reads as lazy" complaint was that four unequal-importance stats got
// identical typographic treatment. The remaining stats sit on a shared hairline rule,
// separated by the timeline's own bar-tack tick motif rather than a plain divider.
export default function StatStrip({ items }: StatStripProps) {
  const featuredIndex = items.findIndex((item) => item.accent);
  const featured = featuredIndex >= 0 ? items[featuredIndex] : null;
  const rest = featured ? items.filter((_, i) => i !== featuredIndex) : items;

  return (
    <div className={styles.strip}>
      {featured ? (
        <Reveal index={0} className={styles.cellFeatured}>
          <CountUpNumber value={featured.number} className={styles.featuredNumber} />
          <span className={styles.featuredLabel}>{featured.label}</span>
        </Reveal>
      ) : null}
      <div className={styles.group}>
        {rest.map((item, i) => (
          <Reveal key={item.label} index={featured ? i + 1 : i} className={styles.cell}>
            <CountUpNumber value={item.number} className={styles.number} />
            <span className={styles.label}>{item.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
