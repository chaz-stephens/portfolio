import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  back?: boolean;
}

export default function Header({ back = false }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        {back ? (
          <Link href="/" className={styles.back}>
            ← Back
          </Link>
        ) : (
          <span className={styles.wordmark}>CHAZ STEPHENS</span>
        )}
        <nav className={styles.actions} aria-label="Contact and resume">
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
