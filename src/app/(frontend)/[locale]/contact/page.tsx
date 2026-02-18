import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/landing/ContactForm'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: t('title') || 'Contact Us | Phoenix Finance',
    description:
      t('description') ||
      "Get in touch with Phoenix Finance. We're here to help with your financial journey. Fill out our contact form and we'll respond within 24 hours.",
    openGraph: {
      title: t('title') || 'Contact Us | Phoenix Finance',
      description:
        t('description') ||
        'Contact Phoenix Finance for personalized financial solutions and support.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Contact Phoenix Finance',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'Contact Us | Phoenix Finance',
      description:
        t('description') ||
        "Contact Phoenix Finance. We're here to help with your financial journey.",
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="pt-16">
      <ContactForm />
    </div>
  )
}
