import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { AboutPageContent } from '@/components/shared/AboutPageContent'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  return {
    title: t('title') || 'About Us | Phoenix Finance',
    description:
      t('description') ||
      'Learn about Phoenix Finance Revolution. Our mission, vision, and the team dedicated to revolutionizing financial services.',
    openGraph: {
      title: t('title') || 'About Us | Phoenix Finance',
      description:
        t('description') ||
        'Discover the story behind Phoenix Finance and our commitment to innovation.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'About Phoenix Finance',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'About Us | Phoenix Finance',
      description:
        t('description') || 'Learn about Phoenix Finance and our mission.',
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AboutPageContent />
}
