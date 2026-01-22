import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { SQYLOOM_EMPIRE } from "./config/domain-empire"

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const domainConfig = SQYLOOM_EMPIRE[hostname]

  // If domain not in our empire, redirect to main domain
  if (!domainConfig) {
    return NextResponse.redirect(new URL("https://sqyloom.net"))
  }

  // Add domain info to headers for use in components
  const response = NextResponse.next()
  response.headers.set("x-sqyloom-domain", hostname)
  response.headers.set("x-sqyloom-config", JSON.stringify(domainConfig))

  // Handle domain-specific routing
  if (hostname === "sqyloom.co.uk") {
    // UK-specific routing
    if (request.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL("/uk-landing", request.url))
    }
  }

  if (hostname === "sqyloom.me") {
    // Personal domain routing
    if (request.nextUrl.pathname === "/") {
      return NextResponse.rewrite(new URL("/personal-home", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
