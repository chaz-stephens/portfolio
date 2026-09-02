import Reveal from "./Reveal";
import styles from "./SkillsGrid.module.css";

interface SkillCategory {
  label: string;
  items: string[];
}

interface SkillsGridProps {
  categories: SkillCategory[];
}

// Capability strip (home page, career-spec section): grouped skill chips, not stat tiles —
// this is scannable text content, not headline numbers, so it stays in the neutral/tertiary
// register (no accent shadow, no bold treatment) rather than competing with the teaser cards.
export default function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className={styles.grid}>
      {categories.map((cat, i) => (
        <Reveal key={cat.label} index={i} className={styles.category}>
          <span className={styles.categoryLabel}>{cat.label}</span>
          <ul className={styles.chipList}>
            {cat.items.map((item) => (
              <li key={item} className={styles.chip}>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
