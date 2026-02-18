import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ServicesPageContent } from '@/components/services/ServicesPageContent'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('services.title'),
    description: t('services.description'),
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Phoenix Finance Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('services.title'),
      description: t('services.description'),
    },
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ServicesPageContent />
}
