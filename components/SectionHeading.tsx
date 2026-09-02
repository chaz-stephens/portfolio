import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  /** Section index, e.g. "01". The case study is a genuine numbered sequence, so the
      folio number stays — it just no longer repeats the heading as a caps label. */
  number: string;
  total: string;
  title: string;
  lede?: string;
  /** Section 01 is the page's own title and needs to be the page's one <h1>; every other
      section is a subsection of it. Defaults to 2 so existing call sites don't need to
      change. */
  level?: 1 | 2;
}

export default function SectionHeading({
  number,
  total,
  title,
  lede,
  level = 2,
}: SectionHeadingProps) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div>
      <span className={styles.folio}>
        {number}
        <span className={styles.folioTotal}>/{total}</span>
      </span>
      <Heading className={styles.heading}>{title}</Heading>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  );
}
