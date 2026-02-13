import Script from 'next/script'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script
        src="https://core.sanity-cdn.com/bridge.js"
        strategy="afterInteractive"
        type="module"
      />
    </>
  )
}
