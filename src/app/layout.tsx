import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Phoenix Finance Revolution',
    template: '%s | Phoenix Finance',
  },
  description:
    'Professional accounting, tax, and financial consulting services in Georgia. Trusted by 500+ businesses worldwide.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Phoenix Finance Revolution',
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
