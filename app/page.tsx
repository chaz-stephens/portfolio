import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StatStrip from "@/components/StatStrip";
import TeaserCard from "@/components/TeaserCard";
import HeroSpecStrip from "@/components/HeroSpecStrip";
import styles from "./page.module.css";

const EXPERIENCE = [
  {
    company: "Merck",
    role: "Associate Director, Global Clinical Data Standards",
    dates: "January 2023 – Present",
  },
  {
    company: "Quest Diagnostics",
    role: "Senior Project Manager, Oncology Clinical Franchise",
    dates: "March 2021 – January 2023",
  },
  {
    company: "National Cancer Institute",
    role: "Scientific Program Manager",
    dates: "March 2017 – March 2021",
  },
  {
    company: "Smithers Avanza",
    role: "Study Coordinator II",
    dates: "June 2016 – March 2017",
  },
  {
    company: "Champions Oncology",
    role: "Project Leader",
    dates: "September 2015 – May 2016",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — two-column at desktop (DESIGN_SPEC.md §6): left column carries the H1/bio,
            right column fills what used to be empty space with the hero spec-strip. Bio copy
            is unchanged, just split into two shorter paragraphs and justified/hyphenated. */}
        <div className={`container ${styles.hero}`}>
          <div className={styles.heroGrid}>
            <span className={styles.kicker}>
              PRODUCT DEVELOPMENT &amp; STRATEGY
            </span>
            <h1 className={styles.name}>Chaz Stephens</h1>
            <p className={styles.positioning}>
              Program manager and PMP interested in product development:
              identifying market gaps and building the strategy to close
              them.
            </p>
            <div className={styles.bioGroup}>
              <p className={styles.bio}>
                I&apos;ve spent over a decade in and around cancer biology.
                It started with graduate research on TGF-β signaling in
                fibrosis and cancer, then became a run of program
                management roles: overseeing cancer clinical trials at the
                National Cancer Institute, cancer diagnostics at Quest
                Diagnostics, and now broader clinical data standards work
                at Merck. What&apos;s kept me in this space is the patient
                population at the other end of it: clinical trials and
                diagnostics only matter because someone is waiting on the
                result.
              </p>
              <p className={styles.bio}>
                What I&apos;ve found I enjoy most, though, is owning that
                whole arc myself: taking a product from an idea through to
                a real commercialization strategy, not just one piece of
                it. A hands-on product management course let me build a
                full example of that, end to end, and produced the
                SubQ-Confirm case study below: market sizing, product
                requirements, and a go-to-market plan for a real
                patient-facing need. I hold a patent and two peer-reviewed
                publications from my earlier research, and I write Indigo
                &amp; Asphalt, an independent menswear publication, on the
                side.
              </p>
            </div>
            <div className={styles.heroRight}>
              <HeroSpecStrip
                kicker="CURRENT FOCUS"
                line="Turning clinical complexity into concrete product decisions."
                statNumber="9+"
                statLabel="YRS IN PROGRAM MGMT"
              />
            </div>
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

        {/* Career stats + work-history timeline — the density-break flip to light canvas */}
        <section className={`theme-light container ${styles.section} ${styles.statsSection}`}>
          <StatStrip
            kicker="CAREER SPEC"
            items={[
              { number: "9+", label: "YRS EXP", accent: true },
              { number: "1", label: "PATENT" },
              { number: "2", label: "PUBLISHED" },
              { number: "1,115+", label: "CATALOG SKUS" },
            ]}
          />

          <div className={styles.timelineWrap}>
            <span className={styles.timelineKicker}>EXPERIENCE</span>
            <div className={styles.timeline}>
              {EXPERIENCE.map((job, i) => (
                <Reveal key={job.company} index={i} className={styles.timelineItem}>
                  <span className={styles.timelineDate}>{job.dates}</span>
                  <span className={styles.timelineRole}>{job.role}</span>
                  <span className={styles.timelineCompany}>{job.company}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Case-study teasers — flip back to dark before contact/footer */}
        <section className={`container ${styles.section} ${styles.teasersSection}`}>
          <div className={styles.teaserGrid}>
            <Reveal index={0}>
              <TeaserCard
                href="/work/subq-confirm"
                metadata={["PRODUCT MGMT", "AUG 2026", "MDPM CAPSTONE"]}
                title="SubQ-Confirm"
                description="A delivery-confirmation subsystem concept for wearable insulin pumps, developed end-to-end from clinical need through FDA pathway and go-to-market."
                stats={[
                  { number: "$110M", label: "SOM · 5 YEAR", accent: true },
                  { number: "71%", label: "GROSS MARGIN" },
                  { number: "$5.25B", label: "TAM · GLOBAL" },
                ]}
              />
            </Reveal>
            <Reveal index={1}>
              <TeaserCard
                href="/work/fit-finder"
                metadata={["SOLE BUILDER", "LIVE PRODUCT", "WEB + ANDROID + STRIPE"]}
                title="Fit Finder"
                description="A body-measurement matching tool that helps people find jeans that actually fit, built and shipped independently."
                stats={[
                  { number: "1,115+", label: "CATALOG MODELS" },
                  { number: "TOP", label: "TRAFFIC ON SITE", accent: true },
                  { number: "IN REVIEW", label: "GOOGLE PLAY STORE" },
                ]}
              />
            </Reveal>
          </div>
        </section>

        {/* Contact — button row repeated at point of exit */}
        <section className={`container ${styles.section} ${styles.contactSection}`}>
          <Reveal>
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
          </Reveal>
        </section>
      </main>
      <Footer
        tags={["PORTFOLIO", "PRODUCT & PROGRAM MANAGEMENT", "CHAZ STEPHENS © 2026"]}
        activeTag="PORTFOLIO"
      />
    </>
  );
}
