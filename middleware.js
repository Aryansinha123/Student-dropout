import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};

