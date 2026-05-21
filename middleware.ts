import { NextResponse, type NextRequest } from "next/server";
import { refreshSupabaseSession } from "@/lib/supabase/middleware";

const productionPausedPath = "/production-paused";

function isAssetOrFrameworkPath(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export async function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") {
    return refreshSupabaseSession(request, NextResponse.next());
  }

  const { pathname } = request.nextUrl;

  if (pathname === productionPausedPath || isAssetOrFrameworkPath(pathname)) {
    return refreshSupabaseSession(request, NextResponse.next());
  }

  const url = request.nextUrl.clone();
  url.pathname = productionPausedPath;
  url.search = "";

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
