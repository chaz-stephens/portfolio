import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatTile from "@/components/StatTile";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className={`container ${styles.hero}`}>
          <div className={styles.heroInner}>
            <span className={styles.kicker}>
              MEDICAL DEVICE PRODUCT MANAGEMENT
            </span>
            <h1 className={styles.name}>Chaz Stephens</h1>
            <p className={styles.positioning}>
              Program manager and PMP moving into medical device product
              management.
            </p>
            <p className={styles.bio}>Bio coming soon.</p>
            <div className={styles.buttonRow}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Resume
              </a>
              <a
                href="mailto:castephens90@gmail.com"
                className="btn btn-ghost"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/chaz-stephens/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="container">
          <Link href="/work/subq-confirm" className={styles.teaser}>
            <span className={styles.teaserKicker}>FEATURED CASE STUDY</span>
            <h3 className={styles.teaserTitle}>SubQ-Confirm</h3>
            <p className={styles.teaserDescription}>
              A delivery-confirmation subsystem concept for wearable insulin
              pumps, developed end-to-end from clinical need through FDA
              pathway and go-to-market.
            </p>
            <div className={styles.statRow}>
              <StatTile number="$110M" label="SOM · 5 YEAR" accent />
              <StatTile number="71%" label="GROSS MARGIN" />
              <StatTile number="$5.25B" label="TAM · GLOBAL" />
            </div>
          </Link>
        </div>

        <div className={styles.footerSpacer} />
      </main>
      <Footer
        tags={["PORTFOLIO", "MEDICAL DEVICE PM", "CHAZ STEPHENS © 2026"]}
        activeTag="PORTFOLIO"
      />
    </>
  );
}
