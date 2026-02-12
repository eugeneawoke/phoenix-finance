'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'

export function EducationBanner() {
  const t = useTranslations('education')

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gold-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Article cards using placeholder translations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="clay-card clay-card-hover overflow-hidden group">
                {/* Image placeholder */}
                <div className="h-48 bg-phoenix-navy-600/50 flex items-center justify-center">
                  <BookOpen
                    size={40}
                    className="text-phoenix-gray-500 group-hover:text-phoenix-gold transition-colors"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-phoenix-gold uppercase tracking-wider mb-2">
                    {t('blog')}
                  </div>
                  <h3 className="text-lg font-semibold text-phoenix-white mb-2 line-clamp-2">
                    {t('article_placeholder_' + i)}
                  </h3>
                  <p className="text-sm text-phoenix-gray-400 mb-4 line-clamp-3">
                    {t('article_excerpt')}
                  </p>
                  <span className="text-sm text-phoenix-gold font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t('read_more')}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            href="/education"
            className="btn-gold px-8 py-4 text-base inline-flex items-center gap-2 group font-semibold"
          >
            {t('view_all_articles')}
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
