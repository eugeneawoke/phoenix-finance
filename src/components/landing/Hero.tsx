'use client'

import { useCallback, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/lib/i18n/routing'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'

// Cursor parallax: 3D tilt + slight translate for depth/volume effect
const PARALLAX_TILT = 14
const PARALLAX_SHIFT = 10

export function Hero() {
  const t = useTranslations('hero')
  const heroRef = useRef<HTMLElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = heroRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)
      setCursor({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      })
    },
    []
  )

  const onMouseLeave = useCallback(() => {
    setCursor({ x: 0, y: 0 })
  }, [])

  const rotateY = cursor.x * PARALLAX_TILT
  const rotateX = -cursor.y * PARALLAX_TILT
  const translateX = cursor.x * PARALLAX_SHIFT
  const translateY = cursor.y * PARALLAX_SHIFT

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex items-center overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-phoenix-navy-900 via-phoenix-navy to-phoenix-navy-800" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-phoenix-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-phoenix-gold/3 rounded-full blur-2xl" />
      </div>
      {/* Bottom fade — seamless transition to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0E27] pointer-events-none z-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
              <span className="gold-text">{t('title')}</span>
            </h1>

            <p className="text-lg sm:text-xl text-phoenix-gray-300 mb-8 max-w-xl leading-relaxed">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link
                href="/contact"
                className="btn-gold px-8 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 group"
              >
                {t('cta_primary')}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#services"
                className="btn-ghost px-8 py-4 text-lg inline-flex items-center justify-center gap-2 group"
              >
                {t('cta_secondary')}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Micro-promise */}
            <div className="flex items-center gap-2 text-phoenix-gray-400 text-sm">
              <Clock size={14} className="text-phoenix-gold" />
              <span>{t('micro_promise')}</span>
            </div>
          </motion.div>

          {/* Phoenix Logo Visual with cursor parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="hidden lg:flex items-center justify-center"
          >
            <div
              className="relative w-[750px] h-[750px] cursor-default flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              {/* Back layer: glow (subtle parallax) */}
              <div
                className="absolute inset-0 bg-phoenix-gold/5 rounded-full blur-3xl animate-pulse transition-transform duration-150"
                style={{
                  transform: `translate(${cursor.x * 4}px, ${cursor.y * 4}px)`,
                }}
              />
              {/* Logo with 3D tilt for depth */}
              <div
                className="relative flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                  width: 504,
                  height: 504,
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${translateX}px, ${translateY}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <Image
                  src="/logo-phoenix-v3.png"
                  alt="Phoenix Finance Revolution"
                  width={504}
                  height={504}
                  className="w-full h-full object-contain select-none pointer-events-none"
                  priority
                  unoptimized={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
