'use client'

import { useTranslations } from 'next-intl'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact')
  const tc = useTranslations('common')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const formLoadedAt = useRef(Date.now())

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)

    // Time-based bot detection (client-side)
    const elapsed = Date.now() - formLoadedAt.current
    if (elapsed < 2000) {
      // Silently reject — looks like a success to bots
      setFormState('success')
      return
    }

    // Honeypot check (client-side, server also validates)
    if (formData.get('website_url')) {
      setFormState('success')
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          _token: formData.get('_token'),
          website_url: formData.get('website_url'),
        }),
      })

      if (response.ok) {
        setFormState('success')
        ;(e.target as HTMLFormElement).reset()
        formLoadedAt.current = Date.now()
      } else {
        const data = await response.json().catch(() => ({}))
        setErrorMessage(data.error || tc('error'))
        setFormState('error')
      }
    } catch {
      setErrorMessage(t('network_error'))
      setFormState('error')
    }
  }

  // Generate token on mount
  const [token, setToken] = useState('')
  useEffect(() => {
    // Use base64url encoding to match server-side decoding
    const raw = JSON.stringify({ t: Date.now() })
    const b64 = btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    setToken(b64)
  }, [])

  if (formState === 'success') {
    return (
      <section id="contact" className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="clay-card p-12 text-center"
          >
            <CheckCircle size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{t('success')}</h3>
            <p className="text-phoenix-gray-400">
              {t('success_followup')}
            </p>
            <button
              type="button"
              onClick={() => setFormState('idle')}
              className="btn-ghost px-6 py-2 mt-6 text-sm cursor-pointer"
            >
              {t('send_another')}
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
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
          <p className="text-lg text-phoenix-gray-400">{t('subtitle')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="clay-card p-8 space-y-6"
        >
          {/* Honeypot — hidden from real users */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website_url">Website</label>
            <input
              type="text"
              id="website_url"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Hidden token for time validation */}
          <input type="hidden" name="_token" value={token} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-phoenix-gray-300 mb-2"
              >
                {t('name')} *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white placeholder:text-phoenix-gray-600 focus:border-phoenix-gold focus:outline-none transition-colors"
                placeholder={t('name')}
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-phoenix-gray-300 mb-2"
              >
                {t('email')} *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white placeholder:text-phoenix-gray-600 focus:border-phoenix-gold focus:outline-none transition-colors"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm font-medium text-phoenix-gray-300 mb-2"
              >
                {t('phone')}
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white placeholder:text-phoenix-gray-600 focus:border-phoenix-gold focus:outline-none transition-colors"
                placeholder="+995 ..."
              />
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-phoenix-gray-300 mb-2"
              >
                {t('subject')}
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white focus:border-phoenix-gold focus:outline-none transition-colors cursor-pointer"
              >
                <option value="general">{t('subjects.general')}</option>
                <option value="services">{t('subjects.services')}</option>
                <option value="partnership">{t('subjects.partnership')}</option>
                <option value="ngo">{t('subjects.ngo')}</option>
                <option value="other">{t('subjects.other')}</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-phoenix-gray-300 mb-2"
            >
              {t('message')} *
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white placeholder:text-phoenix-gray-600 focus:border-phoenix-gold focus:outline-none transition-colors resize-y min-h-[120px]"
              placeholder={t('message')}
            />
          </div>

          {formState === 'error' && errorMessage && (
            <div className="flex items-center gap-2 text-error text-sm">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className={cn(
              'btn-gold w-full py-4 text-lg font-semibold inline-flex items-center justify-center gap-2',
              formState === 'submitting' && 'opacity-70 cursor-not-allowed'
            )}
          >
            {formState === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-phoenix-navy border-t-transparent rounded-full animate-spin" />
                {t('sending')}
              </>
            ) : (
              <>
                {t('submit')}
                <Send size={18} />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
