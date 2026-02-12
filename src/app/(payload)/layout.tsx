import type { Metadata } from 'next'
import '@payloadcms/next/css'

export const metadata: Metadata = {
  title: 'Admin — Phoenix Finance',
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
