import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('education.title'),
    description: t('education.description'),
    openGraph: {
      title: t('education.title'),
      description: t('education.description'),
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Phoenix Finance Education',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('education.title'),
      description: t('education.description'),
    },
  }
}

export default async function EducationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
