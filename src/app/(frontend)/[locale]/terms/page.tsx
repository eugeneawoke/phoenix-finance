import { setRequestLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/lib/i18n/routing'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'footer' })

  return {
    title: t('terms') || 'Terms of Service | Phoenix Finance',
    description:
      'Review the terms of service that govern your use of Phoenix Finance services and platforms.',
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'terms' })

  return (
    <main className="min-h-screen bg-phoenix-navy-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gold-text">Terms of Service</span>
          </h1>
          <p className="text-lg text-phoenix-gray-400 leading-relaxed">
            {t('subtitle', {
              defaultValue:
                'Read the terms that govern your use of Phoenix Finance services and platforms.',
            })}
          </p>
        </div>

        <div className="space-y-8">
          {/* Coming Soon Notice */}
          <div className="bg-phoenix-gold/10 border border-phoenix-gold/30 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-phoenix-gold mb-4">
              {t('coming_soon_title', {
                defaultValue: 'Terms of Service Coming Soon',
              })}
            </h2>
            <p className="text-phoenix-gray-300 mb-4">
              {t('coming_soon_desc', {
                defaultValue:
                  'We are actively preparing our comprehensive Terms of Service to ensure clear understanding of your rights and obligations.',
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
                  key: 'service_use',
                  defaultValue: 'Terms of service use and restrictions',
                },
                {
                  key: 'user_responsibilities',
                  defaultValue: 'User responsibilities and obligations',
                },
                {
                  key: 'intellectual_property',
                  defaultValue: 'Intellectual property rights',
                },
                {
                  key: 'liability_limitations',
                  defaultValue: 'Limitation of liability',
                },
                {
                  key: 'dispute_resolution',
                  defaultValue: 'Dispute resolution procedures',
                },
                {
                  key: 'service_modifications',
                  defaultValue: 'Service changes and modifications',
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
              {t('terms_questions', {
                defaultValue: 'Questions About Our Terms?',
              })}
            </h2>
            <p className="text-phoenix-gray-300 mb-4">
              {t('contact_message', {
                defaultValue:
                  'If you have any questions about our terms of service or need clarification, please contact us.',
              })}
            </p>
            <a
              href="mailto:legal@phoenixfinance.com"
              className="inline-flex items-center gap-2 text-phoenix-gold hover:text-phoenix-gold/80 font-semibold transition-colors"
            >
              legal@phoenixfinance.com
              <span>→</span>
            </a>
          </section>

          {/* Privacy Link */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-phoenix-gray-400 mb-4">
              {t('also_read_privacy', {
                defaultValue: 'Also interested in our Privacy Policy?',
              })}
            </p>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 text-phoenix-gold hover:text-phoenix-gold/80 font-semibold transition-colors"
            >
              {t('view_privacy', { defaultValue: 'View Privacy Policy' })}
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
