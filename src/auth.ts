import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { prisma } from '@/lib/db'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: string
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) return false
      const externalId = `google_${account?.providerAccountId}`

      try {
        // Existing user by externalId?
        const byExternalId = await prisma.user.findUnique({ where: { clerkId: externalId } })
        if (byExternalId) return true

        // Existing user by email (e.g. manually created admin) → link Google
        const byEmail = await prisma.user.findUnique({ where: { email: profile.email } })
        if (byEmail) {
          await prisma.user.update({ where: { email: profile.email }, data: { clerkId: externalId } })
          return true
        }

        // New user
        const base = profile.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') || 'user'
        await prisma.user.create({
          data: {
            clerkId: externalId,
            email: profile.email,
            username: `${base}_${Math.random().toString(36).slice(2, 6)}`,
            role: 'user',
          },
        })
        return true
      } catch {
        return false
      }
    },

    async jwt({ token, account, profile }) {
      // On first sign-in, store DB user info in token
      if (account && profile?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true, role: true },
        })
        if (dbUser) {
          token.userId = dbUser.id
          token.role = dbUser.role
        }
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.userId as string
      session.user.role = (token.role as string) ?? 'user'
      return session
    },
  },
  pages: {
    signIn: '/connexion',
  },
  secret: process.env.NEXTAUTH_SECRET,
})
