'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/lib/i18n/routing'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const localeLabels: Record<string, string> = {
  en: 'EN',
  ge: 'GE',
  ru: 'RU',
}

const localeOptions = ['en', 'ge', 'ru'] as const

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale })
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-[var(--radius-md)] border border-white/10 bg-phoenix-navy-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-phoenix-gold/50 hover:text-phoenix-gold-light"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {localeLabels[locale] ?? locale.toUpperCase()}
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-1.5 min-w-[80px] overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-phoenix-navy-800 py-1 shadow-lg"
        >
          {localeOptions.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                onClick={() => switchLocale(loc)}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-sm transition-colors',
                  loc === locale
                    ? 'text-phoenix-gold-light bg-phoenix-gold/10'
                    : 'text-white hover:bg-white/5 hover:text-phoenix-gold-light',
                )}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
