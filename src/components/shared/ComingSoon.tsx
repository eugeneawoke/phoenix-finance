'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import { Construction, ArrowLeft } from 'lucide-react'

export function ComingSoon() {
  const t = useTranslations('coming_soon')

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-phoenix-gold/10 flex items-center justify-center mx-auto mb-8">
            <Construction size={40} className="text-phoenix-gold" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gold-text">{t('title')}</span>
          </h1>
          <p className="text-lg text-phoenix-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          <Link
            href="/"
            className="btn-ghost px-6 py-3 inline-flex items-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            {t('back_home')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
