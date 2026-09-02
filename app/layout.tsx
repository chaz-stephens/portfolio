import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

// Label/kicker face — same superfamily as the display face (same foundry, same grotesque
// skeleton) rather than a second, unrelated typeface. Deliberately not a monospace: heavy
// mono-for-labels is a common "AI-generated portfolio" tell. Only 600/700 are loaded; label
// styles must not use font-weight 500 (it would fall back to a synthetic/regular weight).
const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-archivo-narrow",
  display: "swap",
});

const SITE_URL = "https://chaz-stephens.com";
const TITLE = "Chaz Stephens | Product Development & Strategy";
const DESCRIPTION =
  "Program manager and PMP focused on product development: identifying market gaps and building the strategy to close them. Case study: SubQ-Confirm, a delivery-confirmation subsystem for wearable insulin pumps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Chaz Stephens",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

// Anti-FOUC: reads the persisted denim-wash choice and sets --color-accent /
// --color-accent-on-light / --color-on-accent / --color-btn-fill as inline styles on <html>
// before first paint (see DESIGN_SPEC.md §1a). Runs before any CSS renders, so no-JS visitors
// and first-time visitors both see the CSS default (Indigo) with no flash-then-jump on repeat
// visits.
const WASH_SCRIPT = `(function(){try{
  var WASHES={raw:"#7A5CFF",indigo:"#4C6EDB",stone:"#98A8D8",ecru:"#EBE6D6"};
  var INKS={stone:"#253B7F",ecru:"#7A6A42"};
  var ON_ACCENT_DARK={stone:1,ecru:1};
  var FILLS={raw:"#624ACC",indigo:"#3D58AF",stone:"#7A86AD",ecru:"#BCB8AB"};
  var stored=localStorage.getItem("ia-wash");
  var wash=WASHES[stored]?stored:"indigo";
  var root=document.documentElement;
  root.style.setProperty("--color-accent",WASHES[wash]);
  root.style.setProperty("--color-accent-on-light",INKS[wash]||WASHES[wash]);
  root.style.setProperty("--color-on-accent",ON_ACCENT_DARK[wash]?"#0a0a0a":"#f4f4f0");
  root.style.setProperty("--color-btn-fill",FILLS[wash]);
  root.dataset.wash=wash;
}catch(e){}
document.documentElement.classList.add("js");
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoNarrow.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: WASH_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
