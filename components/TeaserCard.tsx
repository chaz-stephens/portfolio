import Link from "next/link";
import StatTile from "./StatTile";
import styles from "./TeaserCard.module.css";

interface TeaserStat {
  number: string;
  label: string;
  accent?: boolean;
}

interface TeaserCardProps {
  href: string;
  /** Rendered "/"-separated, e.g. ["PRODUCT MGMT", "2026", "MDPM CAPSTONE"]. */
  metadata: string[];
  title: string;
  description: string;
  stats: TeaserStat[];
}

// Tag-styled case-study teaser card (DESIGN_SPEC.md §4, home page only): a die-cut top-right
// corner via clip-path, a single dashed seam along the cut, metadata line first, then
// title/description/embedded stat row.
export default function TeaserCard({ href, metadata, title, description, stats }: TeaserCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.seam} aria-hidden="true" />
      <span className={styles.metadata}>{metadata.join(" / ")}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.statRow}>
        {stats.map((stat) => (
          <StatTile key={stat.label} number={stat.number} label={stat.label} accent={stat.accent} />
        ))}
      </div>
    </Link>
  );
}
