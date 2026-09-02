import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  /** Section index, e.g. "01". The case study is a genuine numbered sequence, so the
      folio number stays — it just no longer repeats the heading as a caps label. */
  number: string;
  total: string;
  title: string;
  lede?: string;
}

export default function SectionHeading({
  number,
  total,
  title,
  lede,
}: SectionHeadingProps) {
  return (
    <div>
      <span className={styles.folio}>
        {number}
        <span className={styles.folioTotal}>/{total}</span>
      </span>
      <h2 className={styles.heading}>{title}</h2>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  );
}
