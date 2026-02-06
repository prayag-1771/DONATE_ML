import { NextResponse } from "next/server";

export function middleware(request) {
  const jwtToken = request.cookies.get("token");

  const nextAuthToken =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token");

  if (!jwtToken && !nextAuthToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ["/donation/:path*"],
};
