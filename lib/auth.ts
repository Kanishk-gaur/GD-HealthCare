import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/mongodb'
import User from '@/lib/models/User'
import { ADMIN_SESSION_MAX_AGE_SECONDS } from '@/lib/session-config'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectToDatabase()

        const user = await User.findOne({
          email: credentials.email.toLowerCase(),
        })
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role
        // Recorded once, at sign-in, and never touched again — this is what
        // lets proxy.ts and requireAdmin() enforce a hard session lifetime
        // even though the token itself keeps sliding its own `exp` forward
        // on every active use (see lib/session-config.ts for why).
        token.loginTime = Date.now()
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string
      }
      ;(session as { loginTime?: number }).loginTime = token.loginTime as number
      return session
    },
  },
}