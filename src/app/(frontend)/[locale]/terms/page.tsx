import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'footer' })
  return { title: t('terms') }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
