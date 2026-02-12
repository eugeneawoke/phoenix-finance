import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ComingSoon } from '@/components/shared/ComingSoon'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ngo' })
  return { title: t('title') }
}

export default async function NGOPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComingSoon />
}
