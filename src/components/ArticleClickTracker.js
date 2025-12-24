"use client";

import { useEffect } from "react";

export default function ArticleClickTracker() {
  useEffect(() => {
    function handleClick(event) {
      const target = event.target;
      const link = target && target.closest ? target.closest("a") : null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore external links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Only track article-to-article clicks
      if (!href.startsWith("/articles/")) return;

      if (window.gtag) {
        window.gtag("event", "internal_article_click", {
          link_url: href,
          link_text: (link.textContent || "").trim().slice(0, 80),
        });
      }
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () =>
      document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
