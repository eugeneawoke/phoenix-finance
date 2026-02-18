'use client'

import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import {
  MessageSquare,
  FolderOpen,
  Settings,
  BarChart3,
  TrendingUp,
} from 'lucide-react'

const steps = [
  { key: 'step1', icon: MessageSquare },
  { key: 'step2', icon: FolderOpen },
  { key: 'step3', icon: Settings },
  { key: 'step4', icon: BarChart3 },
  { key: 'step5', icon: TrendingUp },
] as const

export function HowItWorks() {
  const t = useTranslations('how_it_works')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.5', 'end 0.5'],
  })

  // Animate line to 100% but it stops naturally at step 4
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 100,
    damping: 30,
  })

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif mb-4">
            <span className="gold-text">{t('title')}</span>
          </h2>
          <p className="text-phoenix-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Background line (static, dimmed) */}
          <div className="absolute left-6 md:left-8 top-8 md:top-12 bottom-8 w-px bg-white/5" />

          {/* Animated gold line - constrained to content */}
          <motion.div
            className="absolute left-6 md:left-8 top-8 md:top-12 w-px bg-gradient-to-b from-phoenix-gold via-phoenix-gold-light to-phoenix-gold origin-top"
            style={{ height: useTransform(lineHeight, (v) => `calc(${v}% - 2rem)`) }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex items-center gap-6 md:gap-8"
              >
                {/* Circle with number */}
                <div className="relative z-10 shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-phoenix-navy border-2 border-phoenix-gold/40 flex items-center justify-center shadow-lg shadow-phoenix-gold/10">
                    <span className="text-lg md:text-xl font-bold gold-text font-serif leading-none" style={{ transform: 'translateY(-1px)' }}>
                      {i + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon size={20} className="text-phoenix-gold shrink-0" />
                    <h3 className="text-lg md:text-xl font-bold text-phoenix-white">
                      {t(`${key}.title`)}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-phoenix-gray-400 leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
