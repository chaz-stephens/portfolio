import type { MetadataRoute } from "next";

const SITE_URL = "https://chaz-stephens.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work/subq-confirm`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work/fit-finder`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
