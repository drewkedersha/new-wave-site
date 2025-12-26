// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { createClient } from "@sanity/client";

// Re-generate at most once per hour (no redeploy needed)
export const revalidate = 3600;

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: false, // freshness > speed for sitemaps
});

type PostRow = { slug: string; _updatedAt: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.newwavechristian.org";

  const posts: PostRow[] = await sanity.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
    | order(_updatedAt desc)
  `);

  const latestUpdatedAt = posts[0]?._updatedAt;
  const latestDate = latestUpdatedAt ? new Date(latestUpdatedAt) : undefined;

  const corePages = [
    "/",
    "/articles",
    "/podcast",
    "/about",
    "/contact",
  ];

  return [
    // Core site pages
    ...corePages.map((path) => ({
      url: `${siteUrl}${path === "/" ? "" : path}`,
      ...(latestDate ? { lastModified: latestDate } : {}),
    })),

    // Article pages
    ...posts.map((p) => ({
      url: `${siteUrl}/articles/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
