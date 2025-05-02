import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { IDecodedJWT } from "./interfaces/auth/auth";

export function middleware(request: NextRequest) {
  // const encryptedUserCookie: any = request.cookies.get("token")?.value;
  // const { pathname } = request.nextUrl;

  // if (
  //   pathname === "/" ||
  //   pathname.startsWith("/_next/") ||
  //   pathname.includes(".") ||
  //   pathname.startsWith("/api/")
  // ) {
  //   return NextResponse.next();
  // }

  // if (!encryptedUserCookie) {
  //   console.log("No token found, redirecting...");
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // }

  // let parsedToken;
  // try {
  //   parsedToken = JSON.parse(encryptedUserCookie);
  // } catch (error) {
  //   console.error("Error parsing token:", error);
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // }

  // const decodedUserData: IDecodedJWT = jwtDecode(parsedToken.accessToken);


  // if (decodedUserData.role === "employee" && pathname.startsWith("/admin")) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // }

  // if (decodedUserData.role === "admin" || decodedUserData.role === "SuperAdmin" && pathname.startsWith("/employee")) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // }

  // const isTokenValid =
  //   parsedToken.accessToken &&
  //   parsedToken.refreshToken &&
  //   new Date(parsedToken.expiresAt) > new Date();

  // if (!isTokenValid) {
  //   const response = NextResponse.redirect(new URL("/", request.nextUrl.origin));
  //   response.cookies.delete("token");
  //   return response;
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|assets/|logo.svg|login-bg.jpg).*)",
  ],
};
