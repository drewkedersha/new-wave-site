import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Exact, case-sensitive match (string compare)
  if (pathname === "/articles/Daniel-ceasar-son-of-spergy") {
    const url = req.nextUrl.clone();
    url.pathname = "/articles/daniel-ceasar-son-of-spergy";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
