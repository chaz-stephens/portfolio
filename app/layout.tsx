import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-jetbrains-mono",
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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Anti-FOUC: reads the persisted denim-wash choice and sets --color-accent /
// --color-accent-on-light as inline styles on <html> before first paint (see
// DESIGN_SPEC.md §1a). Runs before any CSS renders, so no-JS visitors and first-time
// visitors both see the CSS default (Indigo) with no flash-then-jump on repeat visits.
const WASH_SCRIPT = `(function(){try{
  var WASHES={raw:"#C85A1E",indigo:"#4C6EDB",black:"#6E7A52",ecru:"#D8C9A3"};
  var ECRU_INK="#7A6A42";
  var stored=localStorage.getItem("ia-wash");
  var wash=WASHES[stored]?stored:"indigo";
  var root=document.documentElement;
  root.style.setProperty("--color-accent",WASHES[wash]);
  root.style.setProperty("--color-accent-on-light",wash==="ecru"?ECRU_INK:WASHES[wash]);
  root.dataset.wash=wash;
}catch(e){}
document.documentElement.classList.add("js");
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: WASH_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
