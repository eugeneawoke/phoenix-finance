import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'partnership' })

  return {
    title: t('title') || 'Partnership | Phoenix Finance',
    description:
      t('description') ||
      'Join forces with Phoenix Finance. We partner with businesses and organizations to drive financial innovation.',
    openGraph: {
      title: t('title') || 'Partnership | Phoenix Finance',
      description:
        t('description') ||
        'Explore partnership opportunities with Phoenix Finance.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Partnership - Phoenix Finance',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'Partnership | Phoenix Finance',
      description:
        t('description') || 'Partnership opportunities with Phoenix Finance.',
    },
  }
}

export default async function PartnershipPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
