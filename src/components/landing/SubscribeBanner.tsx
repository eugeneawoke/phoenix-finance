'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'

export function SubscribeBanner() {
  const t = useTranslations('subscribe')

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="clay-card p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Gold accent glow */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-phoenix-gold/8 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-phoenix-gold/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-phoenix-gold/10 flex items-center justify-center shrink-0">
              <Mail size={32} className="text-phoenix-gold" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-serif">
                <span className="gold-text">{t('title')}</span>
              </h2>
              <p className="text-phoenix-gray-400 text-base sm:text-lg max-w-lg">
                {t('subtitle')}
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-8 py-4 text-lg font-semibold inline-flex items-center gap-3 group"
              >
                {t('button')}
                <Send
                  size={20}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
