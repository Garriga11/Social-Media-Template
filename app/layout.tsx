// app/layout.tsx
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { Sidebar } from '@/components/sidebar'

const inter = Inter({ subsets: ['latin'] })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Social Media template',
  authors: [{ name: 'G19 Programs' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  description:
    'A social media template built with Next.js, Prisma, Clerk & powered by Vercel.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${inter.className} ${geistSans.variable} ${geistMono.variable}`}>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Suspense fallback={<GlobalSkeleton />}>
                <header className="flex justify-end items-center p-4 gap-4 h-16">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
                {children}
              </Suspense>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}

function GlobalSkeleton() {
  return <div className="p-6 text-muted">Loading app...</div>
}
