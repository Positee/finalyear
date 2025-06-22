import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const session = request.cookies.get("session")?.value

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/login"]
  const isPublicPath = publicPaths.includes(path)

  // If no session and trying to access protected route, redirect to login
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If session exists, parse it to check role-based access
  if (session) {
    try {
      const parsedSession = JSON.parse(session)
      const userRole = parsedSession.role

      // Check if user is trying to access a role-specific path
      if (path.startsWith("/student/") && userRole !== "student") {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
      }

      if (path.startsWith("/lecturer/") && userRole !== "lecturer") {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
      }

      if (path.startsWith("/admin/") && userRole !== "admin") {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
      }

      // If session exists and user is trying to access login page, redirect to dashboard
      if (isPublicPath && path === "/login") {
        return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url))
      }
    } catch (error) {
      // If session is invalid, clear it
      const response = NextResponse.next()
      response.cookies.delete("session")
      return response
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/", "/login", "/student/:path*", "/lecturer/:path*", "/admin/:path*"],
}
