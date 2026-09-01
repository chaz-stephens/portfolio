import styles from "./Footer.module.css";

interface FooterProps {
  tags: string[];
  activeTag: string;
}

export default function Footer({ tags, activeTag }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <p className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={tag}>
              <span className={tag === activeTag ? styles.activeTag : ""}>
                {tag}
              </span>
              {i < tags.length - 1 ? " / " : ""}
            </span>
          ))}
        </p>
        <nav className={styles.contacts} aria-label="Contact">
          <a href="mailto:castephens90@gmail.com">Email</a>
          <a
            href="https://www.linkedin.com/in/chaz-stephens/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
