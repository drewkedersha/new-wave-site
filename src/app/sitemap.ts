import type { MetadataRoute } from "next";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.newwavechristian.org";

  const posts: { slug: string; _updatedAt: string }[] = await sanity.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/articles`, lastModified: new Date() },

    ...posts.map((p) => ({
      url: `${siteUrl}/articles/${p.slug}`,
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
