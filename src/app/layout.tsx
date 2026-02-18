import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Phoenix Finance Revolution',
    template: '%s | Phoenix Finance',
  },
  description:
    'Professional accounting, tax, and financial consulting services in Georgia. Trusted by 500+ businesses worldwide.',
  keywords: [
    'finance',
    'accounting',
    'tax consulting',
    'financial services',
    'Georgia',
    'business solutions',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Phoenix Finance Revolution',
    title: 'Phoenix Finance Revolution',
    description:
      'Professional accounting, tax, and financial consulting services in Georgia. Trusted by 500+ businesses worldwide.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Phoenix Finance Revolution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix Finance Revolution',
    description:
      'Professional accounting, tax, and financial consulting services',
    creator: '@phoenixfinance',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
