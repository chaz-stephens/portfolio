import Reveal from "./Reveal";
import CountUpNumber from "./CountUpNumber";
import styles from "./StatStrip.module.css";

interface StatStripItem {
  number: string;
  label: string;
  accent?: boolean;
  /** External proof link (a DOI, a patent record) — makes a bare count a verifiable fact. */
  href?: string;
}

interface StatStripProps {
  items: StatStripItem[];
}

function StatContent({
  item,
  numberClassName,
  labelClassName,
}: {
  item: StatStripItem;
  numberClassName: string;
  labelClassName: string;
}) {
  return (
    <>
      <CountUpNumber value={item.number} className={numberClassName} />
      <span className={labelClassName}>{item.label}</span>
    </>
  );
}

// Size-chart stat strip (DESIGN_SPEC.md §4, home page only). The accent-flagged stat (the
// rarer credential) gets structural privilege — its own bordered/shadowed cell and a larger
// number — instead of just a color tint inside an otherwise-identical grid cell; the fresh-
// eyes critique's "reads as lazy" complaint was that four unequal-importance stats got
// identical typographic treatment. The remaining stats sit on a shared hairline rule,
// separated by the timeline's own bar-tack tick motif rather than a plain divider. Stats with
// an `href` (the patent, the flagship publication) render as links to the real record, so a
// small count reads as a verifiable fact rather than an unsubstantiated number.
export default function StatStrip({ items }: StatStripProps) {
  const featuredIndex = items.findIndex((item) => item.accent);
  const featured = featuredIndex >= 0 ? items[featuredIndex] : null;
  const rest = featured ? items.filter((_, i) => i !== featuredIndex) : items;

  return (
    <div className={styles.strip}>
      {featured ? (
        <Reveal index={0} className={styles.cellFeatured}>
          {featured.href ? (
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cellLink}
            >
              <StatContent
                item={featured}
                numberClassName={styles.featuredNumber}
                labelClassName={styles.featuredLabel}
              />
            </a>
          ) : (
            <StatContent
              item={featured}
              numberClassName={styles.featuredNumber}
              labelClassName={styles.featuredLabel}
            />
          )}
        </Reveal>
      ) : null}
      <div className={styles.group}>
        {rest.map((item, i) => (
          <Reveal key={item.label} index={featured ? i + 1 : i} className={styles.cell}>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cellLink}
              >
                <StatContent item={item} numberClassName={styles.number} labelClassName={styles.label} />
              </a>
            ) : (
              <StatContent item={item} numberClassName={styles.number} labelClassName={styles.label} />
            )}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
