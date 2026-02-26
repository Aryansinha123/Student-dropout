// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token")?.value;
//   const { pathname } = request.nextUrl;

//   if (pathname === "/") {
//     if (!token) {
//       const loginUrl = new URL("/login", request.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   if ((pathname === "/login" || pathname === "/register") && token) {
//     const homeUrl = new URL("/", request.url);
//     return NextResponse.redirect(homeUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/", "/login", "/register"],
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Public routes (no protection)
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Protect only root "/"
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};