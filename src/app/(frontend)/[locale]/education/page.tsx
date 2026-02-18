import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'education' })

  return {
    title: t('title') || 'Education | Phoenix Finance',
    description:
      t('description') ||
      'Access Phoenix Finance educational resources to expand your financial knowledge and build better habits.',
    openGraph: {
      title: t('title') || 'Education | Phoenix Finance',
      description:
        t('description') ||
        'Learn and grow with Phoenix Finance educational programs.',
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
      title: t('title') || 'Education | Phoenix Finance',
      description:
        t('description') ||
        'Access educational resources from Phoenix Finance.',
    },
  }
}

export default async function EducationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
