'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Shield, Award, Globe, Users } from 'lucide-react'

const values = [
  { icon: Shield, key: 'trust' },
  { icon: Award, key: 'excellence' },
  { icon: Globe, key: 'global' },
  { icon: Users, key: 'client_focus' },
] as const

export function AboutPageContent() {
  const t = useTranslations('about')

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gold-text">{t('title')}</span>
          </h1>
          <p className="text-xl text-phoenix-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="clay-card p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-phoenix-gold/10 flex items-center justify-center mb-4">
                <Icon size={24} className="text-phoenix-gold" />
              </div>
              <h3 className="text-lg font-bold text-phoenix-white mb-2">
                {t(`values.${key}.title`)}
              </h3>
              <p className="text-sm text-phoenix-gray-400 leading-relaxed">
                {t(`values.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
