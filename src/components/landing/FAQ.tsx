'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const

export function FAQ() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif mb-4">
            <span className="gold-text">{t('title')}</span>
          </h2>
          <p className="text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="clay-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={cn(
                    'w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left cursor-pointer transition-colors',
                    openIndex === i
                      ? 'text-phoenix-gold'
                      : 'text-phoenix-white hover:text-phoenix-gold'
                  )}
                >
                  <span className="text-sm md:text-base font-medium leading-snug">
                    {t(`${key}.question`)}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'shrink-0 transition-transform duration-300',
                      openIndex === i && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 md:px-6 md:pb-5 border-t border-white/5">
                        <p className="pt-3 text-sm md:text-base text-phoenix-gray-400 leading-relaxed">
                          {t(`${key}.answer`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
