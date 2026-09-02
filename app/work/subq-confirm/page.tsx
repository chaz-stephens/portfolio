import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatTile from "@/components/StatTile";
import styles from "./page.module.css";

const TITLE = "SubQ-Confirm — Medical Device Case Study | Chaz Stephens";
const DESCRIPTION =
  "SubQ-Confirm: a delivery-confirmation subsystem concept for wearable insulin pumps, developed end-to-end from clinical need through FDA pathway and go-to-market.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/work/subq-confirm",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/work/subq-confirm",
    siteName: "Chaz Stephens",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function SubQConfirmCaseStudy() {
  return (
    <>
      <Header back />
      <main>
        {/* 01 — Overview */}
        <section className={`${styles.section} ${styles.s1}`}>
          <div className="container">
            <SectionHeading
              kicker="01 — OVERVIEW"
              title="SubQ-Confirm"
              lede="A delivery-confirmation subsystem for wearable insulin pumps, designed for integration by pump manufacturers. Built as an individual capstone project for a graduate Medical Device Product Management course, covering the full lifecycle a PM owns: clinical need and market sizing, product requirements, FDA regulatory and reimbursement strategy, clinical evidence planning, risk and human factors, and go-to-market economics."
            />
            <div className={styles.metaBlock}>
              <p className={styles.metaLine}>
                <strong>Role</strong> — Sole product manager: market analysis,
                PRD, regulatory strategy, risk analysis, business case.
              </p>
              <p className={styles.metaLine}>
                <strong>Timeline</strong> — August 2026.
              </p>
            </div>
          </div>
        </section>

        {/* 02 — The problem */}
        <section className={`theme-light ${styles.section} ${styles.s2}`}>
          <div className="container">
            <SectionHeading
              kicker="02 — THE PROBLEM"
              title="Silent infusion-site failures go undetected"
            />
            <p className={styles.body}>
              People using wearable insulin pumps can have a site failure — the
              cannula backs out, the tissue can&apos;t absorb, or insulin leaks
              at the hub — 18 to 36 hours into wear, and current pumps never
              know it. Occlusion alarms only watch line pressure, so leakage and
              displacement stay invisible until blood glucose climbs and, in the
              worst cases, ketoacidosis develops. Clinicians can&apos;t tell
              device failure from patient dosing error at a follow-up visit;
              patients find out hours later, from a glucose reading, not an
              alarm.
            </p>
            <div className={styles.statRow}>
              <Reveal index={0}>
                <StatTile
                  number="$5.25B"
                  label="TAM · GLOBAL"
                  caption="3.5M pump users worldwide × ~$1,500/yr of confirmation disposables"
                  size="lg"
                />
              </Reveal>
              <Reveal index={1}>
                <StatTile
                  number="$2.25B"
                  label="SAM · UNITED STATES"
                  caption="1.5M US pump users; closed-loop beachhead ~900K ≈ $1.35B"
                  size="lg"
                />
              </Reveal>
              <Reveal index={2}>
                <StatTile
                  number="$110M"
                  label="SOM · 5 YEAR"
                  caption="5% of the US pump base — ~75,000 users on subscription sets"
                  accent
                  size="lg"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 03 — The solution */}
        <section className={`${styles.section} ${styles.s3}`}>
          <div className="container">
            <SectionHeading
              kicker="03 — THE SOLUTION"
              title="Dual-modality sensing in the infusion set"
            />
            <p className={styles.body}>
              SubQ-Confirm splits the job across three components. The
              disposable infusion set carries a pressure sensor at the cannula
              hub plus two electrodes under the adhesive that detect when fluid
              bridges them. A reusable module snaps onto the set and runs the
              detection logic, sending an authenticated signal to the pump. The
              partner pump surfaces the fault on its own existing alarm system
              within 500 milliseconds — SubQ-Confirm never issues a delivery
              command itself.
            </p>
            <p className={styles.body}>
              The logic tracks four states from just two signals, pressure and
              moisture: normal delivery, occlusion (pressure high, site dry),
              site leak (pressure below 60% of normal, site wet), and
              cannula-out (pressure low, site dry). A leak only reports after 3
              of 5 consecutive deliveries stay below that threshold within 30
              seconds — the debounce that keeps sweat and showering from
              triggering a false alarm. Constraints were set to disappear into
              existing pump wear: under 5 grams, under 3mm added height,
              IP-rated to 1m for 30 minutes, and a minimum 96-hour run time
              between charges.
            </p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">State</th>
                  <th scope="col">Pressure</th>
                  <th scope="col">Site</th>
                </tr>
              </thead>
              <tbody>
                <Reveal as="tr" index={0} className={styles.tableRow}>
                  <td>Normal delivery</td>
                  <td>Normal</td>
                  <td>Dry</td>
                </Reveal>
                <Reveal as="tr" index={1} className={styles.tableRow}>
                  <td>Occlusion</td>
                  <td>High</td>
                  <td>Dry</td>
                </Reveal>
                <Reveal as="tr" index={2} className={styles.tableRow}>
                  <td>Site leak</td>
                  <td>&lt; 60% of normal</td>
                  <td>Wet</td>
                </Reveal>
                <Reveal as="tr" index={3} className={styles.tableRow}>
                  <td>Cannula-out</td>
                  <td>Low</td>
                  <td>Dry</td>
                </Reveal>
              </tbody>
            </table>
          </div>
        </section>

        {/* 04 — Regulatory & reimbursement */}
        <section className={`theme-light ${styles.section} ${styles.s4}`}>
          <div className="container">
            <SectionHeading
              kicker="04 — REGULATORY & REIMBURSEMENT"
              title="A sequenced pathway for two components"
            />
            <p className={styles.body}>
              The disposable set and the electronics module needed different
              FDA tracks. The set follows a straightforward 510(k) against an
              existing predicate (BD FlowSmart / MiniMed Pro-Set) — same device
              class, same regulation, and the added hub sensor changes no lumen
              dimension or delivery accuracy. The electronics module has no
              matching product code, so it goes through either an accessory
              request under §513(f)(6) or a De Novo pathway, run in parallel
              with the set&apos;s 510(k).
            </p>
            <p className={styles.body}>
              The design was also built to avoid needing a new billing code:
              the set bills under the existing pump-supply pathway, the module
              under the existing pump code. The economic case to a
              hospital&apos;s value-analysis committee rests on one averted DKA
              hospital admission (~$27,000) against roughly $1,300 of a
              patient&apos;s annual sets.
            </p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">US</th>
                  <th scope="col">EU</th>
                  <th scope="col">Canada</th>
                </tr>
              </thead>
              <tbody>
                <Reveal as="tr" index={0} className={styles.tableRow}>
                  <td>510(k) 4–8 mo · accessory/De Novo 9–18 mo</td>
                  <td>MDR 2017/745 Class IIa, 18–24 months</td>
                  <td>MDB Class II, 15-day target</td>
                </Reveal>
              </tbody>
            </table>
          </div>
        </section>

        {/* 05 — Evidence & risk */}
        <section className={`${styles.section} ${styles.s5}`}>
          <div className="container">
            <SectionHeading
              kicker="05 — EVIDENCE & RISK"
              title="Evidence sized to event incidence, not enrollment"
            />
            <p className={styles.body}>
              Clearance doesn&apos;t need a powered clinical trial — substantial
              equivalence rests on bench verification: a gel-block rig run
              through all four detection states 30 times each, plus
              induced-fault testing confirming every fault code reaches the
              pump within 500ms. A 30-subject pre-market cohort checks
              tolerability and false-positive rate, not accuracy. Real accuracy
              evidence — sensitivity and specificity of the alarm — accrues
              post-market through a 465-subject registry, co-funded with the
              OEM partner, tracking DKA admissions per 1,000 user-years against
              baseline.
            </p>
            <p className={styles.body}>
              Risk and human factors: the top hazards all trace back to the
              same failure shape — a silent, undetected non-alarm. A module
              that seats but doesn&apos;t latch, electrodes that never make
              contact, a lost wireless link, or a detached electrode reading as
              &ldquo;no fault&rdquo; would each let monitoring quietly stop
              while the user believes it&apos;s active. Every one of these was
              closed at the design or software stage — a keyed snap that
              can&apos;t seat wrong, a power-on self-test of electrode
              continuity, an authenticated link with a heartbeat and its own
              loss-of-monitoring alarm, and a third &ldquo;indeterminate&rdquo;
              state instead of defaulting failures to &ldquo;no fault.&rdquo;
              Usability testing (IEC 62366-1) targets zero prompting and 100%
              critical-task success across adolescents, adults, and caregivers
              in a simulated home environment.
            </p>
            <Reveal as="span" className={styles.callout}>
              100% critical-task success in summative usability testing
            </Reveal>
          </div>
        </section>

        {/* 06 — Go-to-market */}
        <section className={`theme-light ${styles.section} ${styles.s6}`}>
          <div className="container">
            <SectionHeading
              kicker="06 — GO-TO-MARKET"
              title="Commercialization through the OEM channel"
            />
            <p className={styles.body}>
              SubQ-Confirm sells through pump manufacturers, not direct to
              patients — no sales force of its own. The set runs a
              razor-and-blade model: a $10–12 per-set premium to the OEM
              against roughly $3.20 in cost of goods, a 71% gross margin, while
              the reusable module is placed as capital at $180 against $62 in
              cost, a 66% margin. At 122 sets per user per year and 75,000
              users by year five, that&apos;s roughly 9.2 million sets and
              $101M in set revenue alone.
            </p>
            <p className={styles.body}>
              Two academic endocrinology centers anchor the accuracy registry
              and its publications. The funding path is a $3.5M seed to resolve
              the electronics module&apos;s regulatory route, then a $12M
              Series A to carry the disposable set through verification,
              clearance, and launch. Likely acquirers at exit: Medtronic
              Diabetes, Abbott, Dexcom.
            </p>
            <div className={styles.statRow}>
              <Reveal index={0}>
                <StatTile
                  number="71%"
                  label="GROSS MARGIN · DISPOSABLE"
                  accent
                  size="lg"
                />
              </Reveal>
              <Reveal index={1}>
                <StatTile number="66%" label="GROSS MARGIN · MODULE" size="lg" />
              </Reveal>
              <Reveal index={2}>
                <StatTile
                  number="$101M"
                  label="PROJECTED SET REVENUE AT SCALE"
                  size="lg"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 07 — What this demonstrates */}
        <section className={`${styles.section} ${styles.s7}`}>
          <div className="container">
            <SectionHeading
              kicker="07 — WHAT THIS DEMONSTRATES"
              title="Full-lifecycle product management, end to end"
            />
            <p className={styles.body}>
              SubQ-Confirm was built to exercise the full scope a medical
              device PM actually owns: sizing a clinical need into a real
              market, writing requirements a hardware and firmware team could
              build against, choosing and defending a regulatory strategy,
              planning the evidence a submission and a payer both need, running
              risk and human-factors analysis to ALARP, and turning all of it
              into a fundable business case. The full requirements
              traceability, hazard analysis, and financial model live in the
              executive pitch deck below.
            </p>
            <div className={styles.cta}>
              <a
                href="/subq-confirm-executive-pitch.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Download the full pitch deck (PDF)
              </a>
              <span className={styles.ctaCaption}>
                EXECUTIVE PITCH · AUGUST 2026 · PDF
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer
        tags={["CASE STUDY", "SUBQ-CONFIRM", "MDPM CAPSTONE", "2026"]}
        activeTag="SUBQ-CONFIRM"
      />
    </>
  );
}
