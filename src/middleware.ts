import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Only touch /articles/*
  if (!pathname.startsWith("/articles/")) return NextResponse.next();

  // Preserve trailing slash exactly as-is (optional choice)
  const hasTrailingSlash = pathname.endsWith("/") && pathname !== "/";

  // Normalize only the slug part, not the whole site
  const parts = pathname.split("/").filter(Boolean); // ["articles", "SlugHere"]
  if (parts.length >= 2 && parts[0] === "articles") {
    const slug = parts[1];
    const normalizedSlug = slug.toLowerCase();

    // If there's any uppercase, redirect to lowercase
    if (slug !== normalizedSlug) {
      const newUrl = url.clone();
      newUrl.pathname =
        "/articles/" +
        normalizedSlug +
        (hasTrailingSlash ? "/" : "") +
        (parts.length > 2 ? "/" + parts.slice(2).join("/") : "");
      return NextResponse.redirect(newUrl, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
