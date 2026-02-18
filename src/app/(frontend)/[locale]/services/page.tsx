import { setRequestLocale, getTranslations } from 'next-intl/server'
import { ServicesPageContent } from '@/components/services/ServicesPageContent'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })

  return {
    title: t('title') || 'Services | Phoenix Finance',
    description:
      t('subtitle') ||
      'Explore our comprehensive range of financial services and solutions designed for modern businesses.',
    openGraph: {
      title: t('title') || 'Services | Phoenix Finance',
      description:
        t('subtitle') ||
        'Comprehensive financial services tailored to your business needs.',
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
      title: t('title') || 'Services | Phoenix Finance',
      description:
        t('subtitle') ||
        'Explore our range of financial services and solutions.',
    },
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ServicesPageContent />
}
