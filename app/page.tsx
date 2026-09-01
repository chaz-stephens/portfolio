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
              PRODUCT DEVELOPMENT &amp; STRATEGY
            </span>
            <h1 className={styles.name}>Chaz Stephens</h1>
            <p className={styles.positioning}>
              Program manager and PMP interested in product development:
              identifying market gaps and building the strategy to close
              them.
            </p>
            <p className={styles.bio}>
              I&apos;ve spent over a decade in and around cancer biology. It
              started with graduate research on TGF-β signaling in fibrosis
              and cancer, then became a run of program management roles:
              overseeing cancer clinical trials at the National Cancer
              Institute, cancer diagnostics at Quest Diagnostics, and now
              broader clinical data standards work at Merck. What&apos;s
              kept me in this space is the patient population at the other
              end of it: clinical trials and diagnostics only matter because
              someone is waiting on the result. What I&apos;ve found I enjoy
              most, though, is owning that whole arc myself: taking a
              product from an idea through to a real commercialization
              strategy, not just one piece of it. A hands-on product
              management course let me build a full example of that, end to
              end, and produced the SubQ-Confirm case study below: market
              sizing, product requirements, and a go-to-market plan for a
              real patient-facing need. I hold a patent and two
              peer-reviewed publications from my earlier research, and I
              write Indigo &amp; Asphalt, an independent menswear
              publication, on the side.
            </p>
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
        tags={["PORTFOLIO", "PRODUCT & PROGRAM MANAGEMENT", "CHAZ STEPHENS © 2026"]}
        activeTag="PORTFOLIO"
      />
    </>
  );
}
