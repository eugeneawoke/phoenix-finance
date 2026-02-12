'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'

export function NGOBanner() {
  const t = useTranslations('ngo')

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
          {/* Purple accent glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ngo-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-ngo-purple/20 flex items-center justify-center shrink-0">
              <Heart size={32} className="text-ngo-purple-light" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {t('title')}
              </h2>
              <p className="text-phoenix-gray-400 max-w-xl">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href="/ngo"
              className="btn-ghost px-6 py-3 inline-flex items-center gap-2 shrink-0 border-ngo-purple/30 text-ngo-purple-light hover:border-ngo-purple hover:bg-ngo-purple/10 hover:text-ngo-purple-light"
            >
              {t('cta')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
