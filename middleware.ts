import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userId = req.cookies.get("userId")?.value;
  const role = req.cookies.get("role")?.value;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token || !userId) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (role === "GUEST") {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = "/dashboard";
      return NextResponse.redirect(homeUrl);
    }

    if (pathname === "/admin" || pathname === "/admin/") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/dashboard" && !token && !userId) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
