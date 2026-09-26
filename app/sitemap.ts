import { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators/registry";
import { listCalculators } from "@/lib/calculators/listRegistry";
import { guides } from "@/lib/guides/registry";
import { absoluteUrl } from "@/lib/seo";

/**
 * Static/public pages plus every calculator and guide, generated from their
 * registries so a new entry never needs a manual sitemap update. Split into
 * sitemap-calculators.xml / sitemap-guides.xml if the site grows large.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/calculators",
    "/guides",
    "/profit-pricing",
    "/business-finance",
    "/sales-marketing",
    "/freelancing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/affiliate-disclosure",
    "/methodology",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));

  const calculatorEntries: MetadataRoute.Sitemap = [...calculators, ...listCalculators].map((c) => ({
    url: absoluteUrl(`/calculators/${c.slug}`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const guideEntries: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absoluteUrl(`/guides/${g.slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: g.updatedAt,
  }));

  return [...staticEntries, ...calculatorEntries, ...guideEntries];
}
