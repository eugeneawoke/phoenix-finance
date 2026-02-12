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
    title: t('title'),
    description: t('subtitle'),
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ServicesPageContent />
}
