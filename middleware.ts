import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const token = req.cookies.get("token")?.value;

  // if (!token) {
  //   const loginUrl = new URL("/login", req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname === "/admin/") {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
