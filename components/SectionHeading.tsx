import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  lede?: string;
}

export default function SectionHeading({
  kicker,
  title,
  lede,
}: SectionHeadingProps) {
  return (
    <div>
      <span className={styles.kicker}>{kicker}</span>
      <h2 className={styles.heading}>{title}</h2>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  );
}
