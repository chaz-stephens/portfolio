import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatTile from "@/components/StatTile";
import ImageLightbox from "@/components/ImageLightbox";
import styles from "./page.module.css";

const TITLE = "Denim Fit Finder: Product Case Study | Chaz Stephens";
const DESCRIPTION =
  "Denim Fit Finder: a garment-measurement matching tool that helps people find jeans that actually fit, conceived and built independently. Now the highest-traffic product on the site, outperforming every other piece of content combined.";

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
              number="01"
              total="05"
              title="Denim Fit Finder"
              lede="A garment-measurement matching tool that helps people find jeans that actually fit, conceived and built independently. It's now the highest-traffic product on the site, outperforming every other piece of content combined."
              level={1}
            />
            <div className={styles.metaBlock}>
              <p className={styles.metaLine}>
                <strong>Role:</strong> Sole builder. Product concept,
                catalog/data pipeline, premium feature design, mobile app.
              </p>
              <p className={styles.metaLine}>
                <strong>Status:</strong> Live web tool; Android app
                published on the Google Play Store.
              </p>
            </div>
            <div className={styles.statRow}>
              <Reveal index={0}>
                <StatTile number="3,500+" label="CATALOG MODELS" size="lg" />
              </Reveal>
              <Reveal index={1}>
                <StatTile number="TOP" label="TRAFFIC ON SITE" accent size="lg" />
              </Reveal>
              <Reveal index={2}>
                <StatTile number="LIVE" label="ON GOOGLE PLAY" size="lg" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* 02 — The problem */}
        <section className={`theme-light ${styles.section} ${styles.s2}`}>
          <div className="container">
            <SectionHeading
              number="02"
              total="05"
              title="The number on the size tag is not a measurement"
            />
            <p className={styles.body}>
              A tag size 32 from one brand can measure 35 inches at the waist
              from another, and almost no retailer publishes the numbers that
              actually determine fit: rise, thigh, knee, leg opening. That is
              not a rounding error, it is vanity sizing and plain data
              ignorance, and it pushes the real work of finding a pair that
              fits onto the customer through trial, error, and returns. Fit
              Finder works around it by ignoring the tag. Every pair in the
              catalog is stored by its garment measurements, taken flat, so a
              user can start from a pair they already own and get the models
              whose measurements are closest to it, or filter the whole
              catalog by the measurements that matter to them. Tag sizes still
              show up in the results, because that is what you have to order,
              but nothing is ever matched on them.
            </p>
          </div>
        </section>

        {/* 03 — What shipped */}
        <section className={`${styles.section} ${styles.s3}`}>
          <div className="container">
            <SectionHeading
              number="03"
              total="05"
              title="A free tool, a premium layer, and a native app"
            />
            <p className={styles.body}>
              Browse, Compare, and Find Similar are free on the web and in the
              app, and stay that way. Premium adds three things that only work
              if something is watching the catalog for you: fit-match alerts,
              which fire when a newly added model matches your saved
              measurements; price-drop and restock alerts tied to the exact
              size you own rather than the model in general; and Closet
              Insights, a read on how you actually run in each brand you own,
              built from your own saved pairs instead of a generic size chart.
              It is $5.99 a month or $35 for the first year. Billing runs
              through Stripe on the website, never inside the app, which
              keeps the Play Store billing rules out of the product design. A
              native Android app wrapping the same tool is published on Google
              Play.
            </p>
            <div className={styles.mediaGrid}>
              <Reveal index={0}>
                <figure className={styles.shot}>
                  <ImageLightbox
                    src="/fit-finder/tool-find-similar.png"
                    alt="Denim Fit Finder's Find Similar tab: measurement inputs beside a diagram showing where waist, rise, thigh, knee, and leg opening are taken on a pair of jeans"
                    width={2000}
                    height={1250}
                    className={styles.shotImg}
                  />
                  <figcaption className={styles.shotCaption}>Find Similar: start from a pair you already own</figcaption>
                </figure>
              </Reveal>
              <Reveal index={1}>
                <figure className={styles.shot}>
                  <ImageLightbox
                    src="/fit-finder/tool-browse.png"
                    alt="Denim Fit Finder's Browse and Filter tab, with measurement range filters above a results table of denim models grouped by brand"
                    width={2000}
                    height={1250}
                    className={styles.shotImg}
                  />
                  <figcaption className={styles.shotCaption}>Browse &amp; Filter: every model, by the numbers</figcaption>
                </figure>
              </Reveal>
              <Reveal index={2}>
                <figure className={styles.shot}>
                  <ImageLightbox
                    src="/fit-finder/tool-compare.png"
                    alt="Denim Fit Finder's Compare tab showing an Iron Heart 888 and a Momotaro 0605 lined up size by size, with a difference column for waist, rise, thigh, knee, leg opening, and inseam"
                    width={2000}
                    height={1250}
                    className={styles.shotImg}
                  />
                  <figcaption className={styles.shotCaption}>Compare: four models, measurement by measurement</figcaption>
                </figure>
              </Reveal>
              <Reveal index={3}>
                <figure className={styles.shot}>
                  <ImageLightbox
                    src="/fit-finder/tool-closet.png"
                    alt="Denim Fit Finder's My Closet tab, where a user saves their own measurements and the jeans they already own as a fit reference"
                    width={2000}
                    height={1250}
                    className={styles.shotImg}
                  />
                  <figcaption className={styles.shotCaption}>My Closet: your own pairs as the reference</figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 04 — Built from real usage, not a spec */}
        <section className={`theme-light ${styles.section} ${styles.s4}`}>
          <div className="container">
            <SectionHeading
              number="04"
              total="05"
              title="Two features that came from user feedback"
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
              number="05"
              total="05"
              title="A problem I couldn&apos;t stop thinking about"
            />
            <p className={styles.body}>
              Denim Fit Finder is a product I noticed a real gap for, built alone,
              shipped, and have kept iterating on since, based on how people
              actually use it rather than how I assumed they would. It also
              says something about how I work outside a job description. I had no
              background in the field, so I learned what I needed to and built
              it anyway.
            </p>
            <div className={styles.cta}>
              <a
                href="https://indigoandasphalt.com/fit-finder/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Try Denim Fit Finder
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.indigoandasphalt.fitfinder"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Get the Android app
              </a>
              <span className={styles.ctaCaption}>
                Live web tool at indigoandasphalt.com, Android app on Google
                Play.
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer
        tags={["Case study", "Denim Fit Finder", "2026"]}
        activeTag="Denim Fit Finder"
      />
    </>
  );
}
