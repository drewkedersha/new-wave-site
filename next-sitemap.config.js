/** @type {import('next-sitemap').IConfig} */

const { createClient } = require("@sanity/client");

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});

module.exports = {
  siteUrl: "https://www.newwavechristian.org",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  trailingSlash: false,

  additionalPaths: async () => {
    const posts = await sanity.fetch(`
      *[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    return posts.map((p) => ({
      loc: `/articles/${p.slug}`,
      lastmod: p._updatedAt,
      changefreq: "weekly",
      priority: 0.8,
    }));
  },
};
