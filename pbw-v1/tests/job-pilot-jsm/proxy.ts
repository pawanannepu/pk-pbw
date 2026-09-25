import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@insforge/sdk/ssr/middleware";

const protectedRoutes = ["/dashboard", "/profile", "/find-jobs"];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Handle compatibility alias for /callback -> /api/auth/callback
  if (pathname === "/callback") {
    return NextResponse.redirect(
      new URL(`/api/auth/callback${search}`, request.url)
    );
  }

  // Handle compatibility alias for /find-job -> /find-jobs
  if (pathname === "/find-job" || pathname.startsWith("/find-job/")) {
    const canonicalPath = pathname.replace(/^\/find-job/, "/find-jobs");
    return NextResponse.redirect(new URL(`${canonicalPath}${search}`, request.url));
  }

  const response = NextResponse.next({ request });

  // Update session cookies (refreshes near-expiry access tokens)
  await updateSession({
    requestCookies: request.cookies,
    responseCookies: response.cookies,
  });

  const hasAccessToken =
    request.cookies.has("insforge_access_token") ||
    response.cookies.has("insforge_access_token");
  const hasRefreshToken =
    request.cookies.has("insforge_refresh_token") ||
    response.cookies.has("insforge_refresh_token");
  const isAuthenticated = hasAccessToken || hasRefreshToken;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If unauthenticated and accessing a protected route, redirect to /login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already authenticated and visiting /login, redirect to /dashboard
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
