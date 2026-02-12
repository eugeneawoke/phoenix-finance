'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import { ArrowRight, Shield } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-phoenix-navy-900 via-phoenix-navy to-phoenix-navy-800" />
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-phoenix-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-phoenix-gold/3 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield size={18} className="text-phoenix-gold" />
              <span className="text-sm text-phoenix-gray-400 font-medium tracking-wide uppercase">
                Trusted Financial Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="text-phoenix-white">{t('title')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-phoenix-gray-300 mb-8 max-w-xl leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="btn-gold px-8 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2"
              >
                {t('cta_primary')}
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="btn-ghost px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              >
                {t('cta_secondary')}
              </Link>
            </div>
          </motion.div>

          {/* Phoenix visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[400px] h-[400px]">
              {/* Glow behind phoenix */}
              <div className="absolute inset-0 bg-phoenix-gold/10 rounded-full blur-3xl animate-pulse" />
              {/* Phoenix placeholder — will be replaced with actual logo */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-phoenix-gold/20 to-transparent border border-phoenix-gold/20 flex items-center justify-center">
                  <span className="text-8xl gold-text font-serif font-bold">
                    PF
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
