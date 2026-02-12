'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Globe, Scale, UserCheck } from 'lucide-react'

function AnimatedNumber({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

const stats = [
  { key: 'clients', target: 500, suffix: '+' },
  { key: 'years', target: 15, suffix: '+' },
  { key: 'satisfaction', target: 98, suffix: '%' },
] as const

const whyUsPoints = [
  { key: 'foreign', icon: Globe },
  { key: 'legislation', icon: Scale },
  { key: 'manager', icon: UserCheck },
] as const

export function Stats() {
  const t = useTranslations('stats')
  const tw = useTranslations('why_us')

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Why Us — placed BEFORE stats numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            <span className="gold-text">{tw('title')}</span>
          </h3>
          <div className="relative flex flex-col md:flex-row items-stretch md:items-start justify-between gap-8 md:gap-0">
            {/* Connecting line between icons only (desktop) */}
            {/* Line is positioned at vertical center of the icons (h-14 = 56px, center = 28px = top-7) */}
            {/* Spans from center of first icon (~16.67%) to center of last icon (~83.33%) */}
            <div className="hidden md:block absolute top-7 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-phoenix-gold/40 via-phoenix-gold/60 to-phoenix-gold/40" />

            {whyUsPoints.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative flex-1 flex flex-col items-center text-center px-4"
              >
                <div className="relative z-10 w-14 h-14 rounded-full bg-phoenix-navy border-2 border-phoenix-gold/40 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-phoenix-gold" />
                </div>
                <p className="text-sm text-phoenix-gray-300 max-w-[220px] leading-relaxed">
                  {tw(key)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats numbers */}
        <div className="clay-card p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold gold-text mb-2 font-serif">
                  <AnimatedNumber
                    target={stat.target}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm text-phoenix-gray-400 uppercase tracking-wider">
                  {t(stat.key)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
