import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ADMIN_SESSION_MAX_AGE_SECONDS } from '@/lib/session-config'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let the login page and NextAuth's own API routes through untouched.
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // getToken() only decodes the cookie — it doesn't run the jwt() callback,
  // so this reads the `loginTime` claim exactly as it was set at sign-in.
  // That's what makes this a hard cutoff instead of a sliding one: the
  // token's own `exp` keeps renewing on every active session check, but
  // `loginTime` never does.
  const loginTime = token?.loginTime as number | undefined
  const expired = !token || !loginTime || Date.now() - loginTime > ADMIN_SESSION_MAX_AGE_SECONDS * 1000

  if (expired) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}