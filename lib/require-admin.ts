import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ADMIN_SESSION_MAX_AGE_SECONDS } from '@/lib/session-config'

/**
 * Guard for Server Actions that mutate content.
 *
 * proxy.ts only protects `/admin/*` page requests. Server Actions are POSTed
 * with a stable action id and can be invoked against any route, so they have to
 * verify the session themselves.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  const loginTime = (session as { loginTime?: number } | null)?.loginTime

  if (!session?.user || !loginTime || Date.now() - loginTime > ADMIN_SESSION_MAX_AGE_SECONDS * 1000) {
    throw new Error('Unauthorized: admin sign-in required.')
  }
}
