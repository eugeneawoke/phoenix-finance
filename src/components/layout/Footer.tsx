'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react'

const footerNav = [
  {
    titleKey: 'services' as const,
    links: [
      { labelKey: 'accounting', href: '/services' },
      { labelKey: 'tax', href: '/services' },
      { labelKey: 'audit', href: '/services' },
      { labelKey: 'consulting', href: '/services' },
    ],
  },
  {
    titleKey: 'company' as const,
    links: [
      { labelKey: 'about', href: '/about' },
      { labelKey: 'contact', href: '/contact' },
      { labelKey: 'partnership', href: '/partnership' },
    ],
  },
  {
    titleKey: 'more' as const,
    links: [
      { labelKey: 'ngo', href: '/ngo' },
      { labelKey: 'education', href: '/education' },
      { labelKey: 'blog', href: '/education/blog' },
    ],
  },
]

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-phoenix-navy-900 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand + company details */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold font-serif inline-block mb-4"
            >
              <span className="gold-text">Phoenix</span>{' '}
              <span className="text-phoenix-white">Finance</span>
            </Link>
            <p className="text-phoenix-gray-400 text-sm mb-6 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="space-y-3 text-sm text-phoenix-gray-400">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-phoenix-gold" />
                <span>{t('company.address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-phoenix-gold" />
                <span>{t('company.phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-phoenix-gold" />
                <span>{t('company.title')}</span>
              </div>
            </div>
          </div>

          {/* Navigation columns */}
          {footerNav.map((section) => (
            <div key={section.titleKey}>
              <h3 className="text-sm font-semibold text-phoenix-white mb-4 uppercase tracking-wider">
                {t(`nav.${section.titleKey}`)}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-phoenix-gray-400 hover:text-phoenix-gold transition-colors duration-200"
                    >
                      {t(`nav.${link.labelKey}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="WhatsApp"
                className="p-2 rounded-lg text-phoenix-gray-400 hover:text-phoenix-gold hover:bg-white/5 transition-colors cursor-pointer"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="p-2 rounded-lg text-phoenix-gray-400 hover:text-phoenix-gold hover:bg-white/5 transition-colors cursor-pointer"
              >
                <Send size={20} />
              </a>
            </div>
            <p className="text-sm text-phoenix-gray-500">
              &copy; {new Date().getFullYear()} Phoenix Finance Revolution.{' '}
              {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
