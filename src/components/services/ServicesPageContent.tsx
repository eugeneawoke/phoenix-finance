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
  CheckCircle,
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

/** Static services data for MVP — will be replaced with CMS data */
const services = [
  {
    key: 'accounting',
    features: ['general_ledger', 'accounts_payable', 'accounts_receivable', 'bank_reconciliation'],
  },
  {
    key: 'tax',
    features: ['tax_filing', 'tax_planning', 'vat_reporting', 'compliance'],
  },
  {
    key: 'audit',
    features: ['financial_audit', 'internal_audit', 'compliance_audit', 'risk_assessment'],
  },
  {
    key: 'consulting',
    features: ['business_strategy', 'financial_planning', 'restructuring', 'due_diligence'],
  },
  {
    key: 'registration',
    features: ['company_formation', 'license_permits', 'legal_structure', 'tax_registration'],
  },
  {
    key: 'payroll',
    features: ['salary_calculation', 'tax_withholding', 'benefits_admin', 'compliance_reports'],
  },
  {
    key: 'reporting',
    features: ['financial_statements', 'management_reports', 'regulatory_filing', 'analytics'],
  },
  {
    key: 'international',
    features: ['cross_border', 'transfer_pricing', 'international_tax', 'expat_services'],
  },
] as const

export function ServicesPageContent() {
  const t = useTranslations('services')

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gold-text">{t('title')}</span>
          </h1>
          <p className="text-xl text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.key]
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="clay-card clay-card-hover p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-phoenix-gold/10 flex items-center justify-center shrink-0 group-hover:bg-phoenix-gold/20 transition-colors">
                    <Icon size={28} className="text-phoenix-gold" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-phoenix-white mb-3">
                      {t(`categories.${service.key}`)}
                    </h2>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-phoenix-gray-300"
                        >
                          <CheckCircle
                            size={14}
                            className="text-phoenix-gold shrink-0"
                          />
                          {feature.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="text-sm text-phoenix-gold font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      {t('get_consultation')}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
