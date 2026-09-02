import Link from "next/link";
import CountUpNumber from "./CountUpNumber";
import styles from "./StatTile.module.css";

interface StatTileProps {
  number: string;
  label: string;
  caption?: string;
  accent?: boolean;
  href?: string;
  size?: "sm" | "lg";
}

export default function StatTile({
  number,
  label,
  caption,
  accent = false,
  href,
  size = "sm",
}: StatTileProps) {
  const content = (
    <>
      <CountUpNumber
        value={number}
        className={`${styles.number} ${size === "lg" ? styles.lg : ""} ${
          accent ? styles.accent : ""
        }`}
      />
      <span className={styles.label}>{label}</span>
      {caption ? <span className={styles.caption}>{caption}</span> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${styles.tile} ${styles.link}`}>
        {content}
      </Link>
    );
  }

  return <div className={styles.tile}>{content}</div>;
}
