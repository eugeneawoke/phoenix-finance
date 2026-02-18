import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ngo' })

  return {
    title: t('title') || 'NGO Support | Phoenix Finance',
    description:
      t('description') ||
      'Phoenix Finance is committed to supporting non-governmental organizations with specialized financial solutions.',
    openGraph: {
      title: t('title') || 'NGO Support | Phoenix Finance',
      description:
        t('description') ||
        'Specialized financial support for NGOs and non-profits.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'NGO Support - Phoenix Finance',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'NGO Support | Phoenix Finance',
      description:
        t('description') || 'Financial solutions for NGOs and non-profits.',
    },
  }
}

export default async function NGOPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
