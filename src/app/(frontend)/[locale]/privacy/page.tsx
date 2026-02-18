import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/lib/i18n/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return (
    <main className="min-h-screen bg-phoenix-navy-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gold-text">Privacy Policy</span>
          </h1>
          <p className="text-lg text-phoenix-gray-400 leading-relaxed">
            {t('subtitle', {
              defaultValue:
                'We are preparing comprehensive documentation about how we handle your data and protect your privacy.',
            })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Coming Soon Notice */}
          <div className="bg-phoenix-gold/10 border border-phoenix-gold/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-phoenix-gold mb-4">
              {t('coming_soon_title', {
                defaultValue: 'Privacy Policy Coming Soon',
              })}
            </h2>
            <p className="text-phoenix-gray-300 mb-4">
              {t('coming_soon_desc', {
                defaultValue:
                  'We are actively preparing our comprehensive Privacy Policy to ensure complete transparency about our data practices.',
              })}
            </p>
          </div>

          {/* What We are Preparing */}
          <section>
            <h2 className="text-2xl font-semibold text-phoenix-white mb-6">
              {t('what_preparing', { defaultValue: 'What We are Preparing' })}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: 'data_collection',
                  defaultValue: 'How we collect and use your data',
                },
                {
                  key: 'privacy_rights',
                  defaultValue: 'Your privacy rights and choices',
                },
                {
                  key: 'data_protection',
                  defaultValue: 'How we protect your information',
                },
                {
                  key: 'cookies_tracking',
                  defaultValue: 'Cookie and tracking policies',
                },
                {
                  key: 'data_retention',
                  defaultValue: 'Data retention and deletion procedures',
                },
                {
                  key: 'contact_procedures',
                  defaultValue: 'Contact and complaint procedures',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <span className="text-phoenix-gold text-lg font-bold mt-0.5">✓</span>
                  <span className="text-phoenix-gray-300">
                    {t(item.key, { defaultValue: item.defaultValue })}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-phoenix-white mb-4">
              {t('privacy_questions', {
                defaultValue: 'Privacy Questions?',
              })}
            </h2>
            <p className="text-phoenix-gray-300 mb-4">
              {t('contact_message', {
                defaultValue:
                  'If you have any privacy-related questions or concerns, please don\'t hesitate to contact us.',
              })}
            </p>
            <a
              href="mailto:privacy@phoenixfinance.com"
              className="inline-flex items-center gap-2 text-phoenix-gold hover:text-phoenix-gold/80 font-semibold transition-colors"
            >
              privacy@phoenixfinance.com
              <span>→</span>
            </a>
          </section>

          {/* Terms Link */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-phoenix-gray-400 mb-4">
              {t('also_read_terms', {
                defaultValue: 'Also interested in our Terms of Service?',
              })}
            </p>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 text-phoenix-gold hover:text-phoenix-gold/80 font-semibold transition-colors"
            >
              {t('view_terms', { defaultValue: 'View Terms of Service' })}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
