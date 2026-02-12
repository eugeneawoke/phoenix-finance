'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

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
          className="subscribe-banner p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 font-serif">
              <span className="underline decoration-phoenix-gold decoration-2 underline-offset-8">
                {t('title')}
              </span>
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
              className="btn-gold px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold inline-flex items-center gap-3 group"
            >
              {t('button')}
              <Send
                size={22}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
