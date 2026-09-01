import Link from "next/link";
import Monogram from "./Monogram";
import WashSwitcher from "./WashSwitcher";
import styles from "./Header.module.css";

interface HeaderProps {
  back?: boolean;
}

export default function Header({ back = false }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand}>
          <Monogram />
          <span className={back ? styles.backLabel : styles.wordmark}>
            {back ? "← Back" : "CHAZ STEPHENS"}
          </span>
        </Link>
        <nav className={styles.actions} aria-label="Contact, accent color, and resume">
          <div className={styles.contactLinks}>
            <a
              href="mailto:castephens90@gmail.com"
              className={styles.contactLink}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/chaz-stephens/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              LinkedIn
            </a>
          </div>
          <WashSwitcher />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.resumeBtn}`}
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
