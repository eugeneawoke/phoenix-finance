import { useTranslations } from 'next-intl'
import { MapPin, Phone, Mail, Building, Landmark } from 'lucide-react'

export function CompanyDetails() {
  const t = useTranslations('company')

  const details = [
    { icon: MapPin, label: t('address'), value: 'Tbilisi, Georgia' },
    { icon: Phone, label: t('phone'), value: '+995 555 000 000', href: 'tel:+995555000000' },
    { icon: Mail, label: 'Email', value: 'info@phoenix-finance.ge', href: 'mailto:info@phoenix-finance.ge' },
    { icon: Building, label: t('tax_id'), value: '000000000' },
    { icon: Landmark, label: t('bank'), value: 'Bank of Georgia' },
  ]

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          <span className="gold-text">{t('title')}</span>
        </h2>
        <div className="clay-card p-8 md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-phoenix-gold/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-phoenix-gold" />
                </div>
                <div>
                  <div className="text-xs text-phoenix-gray-500 uppercase tracking-wider mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-phoenix-white hover:text-phoenix-gold transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm text-phoenix-white">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
