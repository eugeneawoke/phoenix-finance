import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { AboutPageContent } from '@/components/shared/AboutPageContent'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return { title: t('title') }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AboutPageContent />
}
