'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/lib/i18n/routing'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const navItems = [
  { href: '/', labelKey: 'home' },
  { href: '/services', labelKey: 'services' },
  { href: '/ngo', labelKey: 'ngo' },
  { href: '/education', labelKey: 'education' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
] as const

export function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass-surface fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold font-serif text-phoenix-white"
          >
            <span className="gold-text">Phoenix</span>
            <span>Finance</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-phoenix-gold bg-white/5'
                      : 'text-phoenix-gray-300 hover:text-phoenix-white hover:bg-white/5'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              )
            })}
          </div>

          {/* Right side: language + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/dashboard"
              className="btn-ghost px-4 py-2 text-sm"
            >
              {t('dashboard')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-phoenix-gray-400 hover:text-phoenix-white transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/5 mt-2 pt-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'text-phoenix-gold bg-white/5'
                        : 'text-phoenix-gray-300 hover:text-phoenix-white hover:bg-white/5'
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                )
              })}
              <div className="flex items-center justify-between mt-3 px-3">
                <LanguageSwitcher />
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="btn-ghost px-4 py-2 text-sm"
                >
                  {t('dashboard')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
