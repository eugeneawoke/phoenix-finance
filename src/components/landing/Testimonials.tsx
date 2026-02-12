'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Quote, TrendingUp, Building, ArrowRight } from 'lucide-react'

const reviewKeys = ['review1', 'review2', 'review3'] as const
const caseKeys = ['case1', 'case2', 'case3'] as const

export function Testimonials() {
  const t = useTranslations('testimonials')

  // Duplicate logos for seamless infinite scroll
  const logoCount = 8
  const logos = Array.from({ length: logoCount * 2 })

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gold-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Client logos — infinite horizontal marquee */}
        <div className="overflow-hidden mb-16">
          <div className="flex animate-marquee w-max">
            {logos.map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-32 h-14 mx-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center"
              >
                <Building size={22} className="text-phoenix-gray-600" />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {reviewKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="clay-card p-6 relative"
            >
              <Quote size={24} className="text-phoenix-gold/30 mb-3" />
              <p className="text-sm text-phoenix-gray-300 leading-relaxed mb-4 italic">
                &ldquo;{t('reviews.' + key + '.text')}&rdquo;
              </p>
              <div className="text-xs text-phoenix-gray-500 font-medium">
                {t('reviews.' + key + '.author')}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini-cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="clay-card p-8"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-phoenix-gold" />
            <span>{t('case_title')}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseKeys.map((key) => (
              <div key={key} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-phoenix-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowRight size={14} className="text-phoenix-gold" />
                </div>
                <p className="text-sm text-phoenix-gray-300 leading-relaxed">
                  {t('cases.' + key)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
