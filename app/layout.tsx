import { type Metadata } from 'next'
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
import { Viewport } from 'next'


const inter = Inter({
  subsets: ['latin'],
})



const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Social Media template',
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ name: 'G19 Programs' }],
 
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico'
  },
  description: 'A social media template built with Next.js, Prisma, Clerk & powered by Vercel.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
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
          </body>
        </html>
      </ClerkProvider>
    </div>
  </div>
  )
}
function GlobalSkeleton() {
  return <div className="p-6 text-muted">Loading app...</div>
}