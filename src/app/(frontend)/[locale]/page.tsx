import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Hero } from '@/components/landing/Hero'
import { ServicesOverview } from '@/components/landing/ServicesOverview'
import { Stats } from '@/components/landing/Stats'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Testimonials } from '@/components/landing/Testimonials'
import { NGOBanner } from '@/components/landing/NGOBanner'
import { EducationBanner } from '@/components/landing/EducationBanner'
import { SubscribeBanner } from '@/components/landing/SubscribeBanner'
import { FAQ } from '@/components/landing/FAQ'
import { ContactForm } from '@/components/landing/ContactForm'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    title: t('title') || 'Phoenix Finance Revolution',
    description:
      t('description') ||
      'Revolutionizing finance with cutting-edge technology. Secure, fast, and accessible financial solutions for everyone.',
    openGraph: {
      title: t('title') || 'Phoenix Finance Revolution',
      description:
        t('description') ||
        'Join the finance revolution. Secure, innovative financial solutions built with cutting-edge technology.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Phoenix Finance Revolution - Home',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title') || 'Phoenix Finance Revolution',
      description:
        t('description') ||
        'Join the finance revolution. Secure, innovative financial solutions.',
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <div className="section-divider" />
      <ServicesOverview />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <div className="section-divider" />
      <NGOBanner />
      <EducationBanner />
      <div className="section-divider" />
      <SubscribeBanner />
      <FAQ />
      <ContactForm />
    </>
  )
}
