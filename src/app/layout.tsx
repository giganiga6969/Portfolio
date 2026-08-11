import type { Metadata, Viewport } from 'next'
import type React from 'react'
import {
  DM_Sans,
  JetBrains_Mono,
  Space_Grotesk,
} from 'next/font/google'

import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
  weight: ['400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-clash',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ayush Mittal — Computer Science Student',
  description:
    'Computer Science student building projects across AI, cybersecurity, distributed systems, and software engineering.',
  keywords: [
    'Ayush Mittal',
    'Computer Science',
    'AI',
    'Machine Learning',
    'Cybersecurity',
    'Digital Forensics',
    'Distributed Systems',
    'Software Engineering',
    'Fourier Neural Operators',
    'LangGraph',
  ],
  authors: [{ name: 'Ayush Mittal' }],
  openGraph: {
    title: 'Ayush Mittal — Computer Science Student',
    description:
      'AI, cybersecurity, distributed systems, and software engineering projects by Ayush Mittal.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Mittal — Computer Science Student',
    description:
      'AI, cybersecurity, distributed systems, and software engineering projects by Ayush Mittal.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}