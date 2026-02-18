'use client'

import { useTranslations } from 'next-intl'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import PhoneInput, {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input'
import type { Country } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

/* ── Calling-code → country map (built once at module level) ── */
const callingCodeToCountry = new Map<string, Country>()
// First pass: fill with all countries (first match wins)
for (const c of getCountries()) {
  const code = getCountryCallingCode(c)
  if (!callingCodeToCountry.has(code)) {
    callingCodeToCountry.set(code, c)
  }
}
// Second pass: preferred countries override ambiguous codes (e.g. +7 → RU not KZ)
const preferredCountries: Country[] = [
  'GE', 'RU', 'US', 'GB', 'DE', 'FR', 'UA', 'BY', 'KZ', 'TR', 'AE', 'AZ', 'AM',
]
for (const c of preferredCountries) {
  try {
    const code = getCountryCallingCode(c)
    callingCodeToCountry.set(code, c)
  } catch { /* skip invalid */ }
}

function detectCountryFromCallingCode(phone: string): Country | undefined {
  if (!phone || !phone.startsWith('+')) return undefined
  const digits = phone.slice(1).replace(/\D/g, '')
  // Try longest prefix first (max calling code is 3 digits)
  for (let len = Math.min(digits.length, 3); len >= 1; len--) {
    const prefix = digits.substring(0, len)
    const country = callingCodeToCountry.get(prefix)
    if (country) return country
  }
  return undefined
}

function detectCountryFromTimezone(): Country {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    const tzCountryMap: Record<string, Country> = {
      'Asia/Tbilisi': 'GE',
      'Europe/Moscow': 'RU',
      'Europe/Samara': 'RU',
      'Asia/Yekaterinburg': 'RU',
      'Europe/London': 'GB',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Los_Angeles': 'US',
      'Europe/Berlin': 'DE',
      'Europe/Paris': 'FR',
      'Europe/Istanbul': 'TR',
      'Asia/Dubai': 'AE',
      'Europe/Kiev': 'UA',
      'Europe/Kyiv': 'UA',
      'Europe/Minsk': 'BY',
      'Asia/Almaty': 'KZ',
      'Asia/Baku': 'AZ',
      'Asia/Yerevan': 'AM',
    }
    return tzCountryMap[tz] || 'GE'
  } catch {
    return 'GE'
  }
}

export function ContactForm() {
  const t = useTranslations('contact')
  const tc = useTranslations('common')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [consentChecked, setConsentChecked] = useState(false)
  const [phone, setPhone] = useState<string | undefined>()
  const [country, setCountry] = useState<Country>(detectCountryFromTimezone)
  const shouldRefocus = useRef(false)
  const phoneContainerRef = useRef<HTMLDivElement>(null)
  const formLoadedAt = useRef(Date.now())

  // Re-focus phone input after country (key) change
  useEffect(() => {
    if (shouldRefocus.current) {
      shouldRefocus.current = false
      const input = phoneContainerRef.current?.querySelector('input')
      if (input) {
        requestAnimationFrame(() => input.focus())
      }
    }
  }, [country])

  // Add id to phone input for accessibility (label linking)
  useEffect(() => {
    const input = phoneContainerRef.current?.querySelector('input')
    if (input && !input.id) {
      input.id = 'contact-phone'
    }
  }, [country])

  function handlePhoneChange(value: string | undefined) {
    setPhone(value)
    if (value && value.length >= 2) {
      const detected = detectCountryFromCallingCode(value)
      if (detected && detected !== country) {
        shouldRefocus.current = true
        setCountry(detected)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('submitting')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)

    // Time-based bot detection (client-side)
    const elapsed = Date.now() - formLoadedAt.current
    if (elapsed < 2000) {
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
          phone: phone || '',
          subject: formData.get('subject'),
          message: formData.get('message'),
          _token: formData.get('_token'),
          website_url: formData.get('website_url'),
        }),
      })

      if (response.ok) {
        setFormState('success')
        ;(e.target as HTMLFormElement).reset()
        setPhone(undefined)
        setConsentChecked(false)
        setCountry(detectCountryFromTimezone())
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
                className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
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
                className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
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
                className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
              >
                {t('phone')}
              </label>
              <div
                ref={phoneContainerRef}
                className="w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 focus-within:border-phoenix-gold transition-colors"
              >
                <PhoneInput
                  key={country}
                  international
                  defaultCountry={country}
                  value={phone}
                  onChange={handlePhoneChange}
                  onCountryChange={(c) => c && setCountry(c)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
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
              <p className="text-xs text-phoenix-gray-500 mt-1.5 pl-4">
                {t('subject_hint')}
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
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

          {/* Consent checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              required
              className="mt-1 w-4 h-4 rounded border-white/20 bg-phoenix-navy-800 text-phoenix-gold focus:ring-phoenix-gold cursor-pointer accent-phoenix-gold"
            />
            <label htmlFor="consent" className="text-sm text-phoenix-gray-400 cursor-pointer">
              {t('consent')}{' '}
              <a href="/privacy" className="text-phoenix-gold hover:underline">
                {t('consent_link')}
              </a>
            </label>
          </div>

          {formState === 'error' && errorMessage && (
            <div className="flex items-center gap-2 text-error text-sm">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={formState === 'submitting' || !consentChecked}
            className={cn(
              'btn-gold w-full py-4 text-lg font-semibold inline-flex items-center justify-center gap-2 group',
              (formState === 'submitting' || !consentChecked) && 'opacity-70 cursor-not-allowed'
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
                <Send size={18} className="transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
