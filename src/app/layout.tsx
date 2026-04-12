import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: "Label IGE \u2014 Certifiez la part d\u2019humain dans vos cr\u00e9ations",
    template: '%s | Label IGE',
  },
  description:
    'Le Label IGE est le premier standard de transparence IA pour les créateurs de contenu. Générez votre badge en 5 minutes.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Label IGE',
    title: "Label IGE \u2014 Certifiez la part d\u2019humain dans vos cr\u00e9ations",
    description:
      "Certifiez et affichez la part d\u2019intervention humaine dans vos cr\u00e9ations avec le Label IGE.",
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Label IGE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Label IGE \u2014 Transparence IA pour les cr\u00e9ateurs",
    description:
      "Certifiez et affichez la part d\u2019humain dans vos cr\u00e9ations avec le Label IGE.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang="fr" className={`${inter.variable} h-full antialiased`}>
        <head>
          {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
            <script
              defer
              src={`${process.env.UMAMI_URL}/script.js`}
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            />
          )}
        </head>
        <body className="min-h-full flex flex-col font-sans bg-[#F8F9FA] text-[#1A1A2E]">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  )
}
