'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import {
  Calculator,
  FileText,
  Search,
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Globe,
  ArrowRight,
} from 'lucide-react'

const serviceIcons: Record<string, React.ElementType> = {
  accounting: Calculator,
  tax: FileText,
  audit: Search,
  consulting: Users,
  registration: Building2,
  payroll: DollarSign,
  reporting: BarChart3,
  international: Globe,
}

const serviceKeys = [
  'accounting',
  'tax',
  'audit',
  'consulting',
  'registration',
  'payroll',
  'reporting',
  'international',
] as const

export function ServicesOverview() {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gold-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  href="/services"
                  className="clay-card clay-card-hover block p-6 h-full group"
                >
                  <div className="w-12 h-12 rounded-xl bg-phoenix-gold/10 flex items-center justify-center mb-4 group-hover:bg-phoenix-gold/20 transition-colors">
                    <Icon size={24} className="text-phoenix-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-phoenix-white mb-2">
                    {t('categories.' + key)}
                  </h3>
                  <p className="text-sm text-phoenix-gray-400 leading-relaxed mb-3">
                    {t('descriptions.' + key)}
                  </p>
                  <span className="text-sm text-phoenix-gold font-medium inline-flex items-center gap-1">
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="btn-ghost px-6 py-3 text-base inline-flex items-center gap-2 group"
          >
            {t('view_all')}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
