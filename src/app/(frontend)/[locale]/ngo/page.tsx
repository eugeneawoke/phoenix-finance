import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('ngo.title'),
    description: t('ngo.description'),
    openGraph: {
      title: t('ngo.title'),
      description: t('ngo.description'),
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
      title: t('ngo.title'),
      description: t('ngo.description'),
    },
  }
}

export default async function NGOPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
