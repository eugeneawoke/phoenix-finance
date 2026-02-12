import { setRequestLocale } from 'next-intl/server'
import { Hero } from '@/components/landing/Hero'
import { ServicesOverview } from '@/components/landing/ServicesOverview'
import { Stats } from '@/components/landing/Stats'
import { Testimonials } from '@/components/landing/Testimonials'
import { NGOBanner } from '@/components/landing/NGOBanner'
import { EducationBanner } from '@/components/landing/EducationBanner'
import { SubscribeBanner } from '@/components/landing/SubscribeBanner'
import { ContactForm } from '@/components/landing/ContactForm'

type Props = {
  params: Promise<{ locale: string }>
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
      <Testimonials />
      <div className="section-divider" />
      <NGOBanner />
      <EducationBanner />
      <div className="section-divider" />
      <SubscribeBanner />
      <ContactForm />
    </>
  )
}
