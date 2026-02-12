import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ContactForm } from '@/components/landing/ContactForm'
import { CompanyDetails } from '@/components/landing/CompanyDetails'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return { title: t('title') }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="pt-16">
      <ContactForm />
      <CompanyDetails />
    </div>
  )
}
