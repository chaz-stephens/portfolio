import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import StatTile from "@/components/StatTile";
import styles from "./page.module.css";

const TITLE = "Fit Finder — Product Case Study | Chaz Stephens";
const DESCRIPTION =
  "Fit Finder: a body-measurement matching tool that helps people find jeans that actually fit, conceived and built independently. Now the highest-traffic product on the site, outperforming every other piece of content combined.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/work/fit-finder",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/work/fit-finder",
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

export default function FitFinderCaseStudy() {
  return (
    <>
      <Header back />
      <main>
        {/* 01 — Overview */}
        <section className={`${styles.section} ${styles.s1}`}>
          <div className="container">
            <SectionHeading
              kicker="01 — OVERVIEW"
              title="Fit Finder"
              lede="A body-measurement matching tool that helps people find jeans that actually fit, conceived and built independently. It's now the highest-traffic product on the site, outperforming every other piece of content combined."
            />
            <div className={styles.metaBlock}>
              <p className={styles.metaLine}>
                <strong>Role</strong> — Sole builder — product concept,
                catalog/data pipeline, premium feature design, mobile app.
              </p>
              <p className={styles.metaLine}>
                <strong>Status</strong> — Live web tool; Android app has
                completed alpha testing and is in Google Play Store review.
              </p>
            </div>
            <div className={styles.statRow}>
              <StatTile number="1,115+" label="CATALOG MODELS" size="lg" />
              <StatTile number="TOP" label="TRAFFIC ON SITE" accent size="lg" />
              <StatTile number="IN REVIEW" label="GOOGLE PLAY STORE" size="lg" />
            </div>
          </div>
        </section>

        {/* 02 — The problem */}
        <section className={`theme-light ${styles.section} ${styles.s2}`}>
          <div className="container">
            <SectionHeading
              kicker="02 — THE PROBLEM"
              title="Sizing on a jeans tag is close to meaningless"
            />
            <p className={styles.body}>
              A &ldquo;32&rdquo; from one brand can measure 35 inches at the
              waist from another, and almost no retailer publishes the numbers
              that actually determine fit: rise, thigh opening, leg shape.
              That&apos;s not a rounding error, it&apos;s vanity sizing and
              plain data ignorance, and it pushes the real work of finding a
              pair that fits onto the customer through trial, error, and
              returns. Fit Finder solves it by cross-referencing a
              user&apos;s actual body measurements against a database of
              thousands of individually measured pairs of jeans, surfacing the
              ones that fit their specific body rather than a size label.
            </p>
          </div>
        </section>

        {/* 03 — What shipped */}
        <section className={`${styles.section} ${styles.s3}`}>
          <div className="container">
            <SectionHeading
              kicker="03 — WHAT SHIPPED"
              title="A free tool, a premium layer, and a native app"
            />
            <p className={styles.body}>
              The core matching tool is free and web-based. A premium tier
              adds four things: a Closet where users store the jeans they own
              as a fit reference, synced across devices; a Wishlist that
              tracks price drops and restocks on jeans they want; Insights,
              which shows how a given pair compares to others in its category
              (wider, slimmer, higher rise, and so on) against the user&apos;s
              own measurements; and notifications when a new catalog entry
              matches their profile. The premium tier is built on Stripe
              billing. A native Android app, wrapping the same tool, has
              cleared alpha testing and is currently in Google Play Store
              review.
            </p>
            <img
              src="/fit-finder/tool-browse.png"
              alt="Fit Finder's web tool filter UI, with controls for waist, inseam, rise, and fit category"
              width={1440}
              height={900}
              className={styles.mediaWeb}
              loading="lazy"
            />
            <div className={styles.mediaPhones}>
              <img
                src="/fit-finder/app-my-closet.png"
                alt="Fit Finder Android app Closet Insights screen, comparing a saved pair's measurements against the user's profile"
                width={1080}
                height={1920}
                className={styles.mediaPhone}
                loading="lazy"
              />
              <img
                src="/fit-finder/app-premium.png"
                alt="Fit Finder Android app premium upgrade screen, listing Closet, Wishlist, Insights, and notification features"
                width={1080}
                height={1920}
                className={styles.mediaPhone}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* 04 — Built from real usage, not a spec */}
        <section className={`theme-light ${styles.section} ${styles.s4}`}>
          <div className="container">
            <SectionHeading
              kicker="04 — BUILT FROM REAL USAGE, NOT A SPEC"
              title="Two features that came from watching how people actually used it"
            />
            <p className={styles.body}>
              The catalog originally listed waist, inseam, and rise. Real
              usage showed two gaps worth closing: fabric composition, so a
              user can tell whether a pair will shrink with washing before
              they buy it, and a thigh-to-waist ratio, which turned out to
              matter more to fit than either measurement on its own for a lot
              of body types. Neither was in the original plan; both came from
              watching what the data and the users were actually asking for.
            </p>
          </div>
        </section>

        {/* 05 — What this demonstrates */}
        <section className={`${styles.section} ${styles.s5}`}>
          <div className="container">
            <SectionHeading
              kicker="05 — WHAT THIS DEMONSTRATES"
              title="A different kind of evidence than a class project"
            />
            <p className={styles.body}>
              Fit Finder isn&apos;t a capstone exercise, it&apos;s a product I
              noticed a real gap for, built alone, shipped, and have kept
              iterating on since, based on how people actually use it rather
              than how I assumed they would. It&apos;s also a fair signal of
              who I am outside of a job description: curious enough to go
              build the thing when I run into a problem I can&apos;t stop
              thinking about, regardless of what field it&apos;s in.
            </p>
            <div className={styles.cta}>
              <a
                href="https://indigoandasphalt.com/fit-finder/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Try Fit Finder
              </a>
              <span className={styles.ctaCaption}>
                LIVE WEB TOOL · INDIGOANDASPHALT.COM
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer
        tags={["CASE STUDY", "FIT FINDER", "2026"]}
        activeTag="FIT FINDER"
      />
    </>
  );
}
