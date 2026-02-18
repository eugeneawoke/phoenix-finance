'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
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
  const [isPending, startTransition] = useTransition()
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)

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
    setOpen(false)
    setFocusedIndex(-1)
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false })
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    switch (e.key) {
      case 'Escape': {
        e.preventDefault()
        setOpen(false)
        setFocusedIndex(-1)
        // Return focus to trigger button
        const button = containerRef.current?.querySelector('button')
        button?.focus()
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setFocusedIndex(0)
        } else {
          setFocusedIndex((prev) =>
            prev < localeOptions.length - 1 ? prev + 1 : prev
          )
        }
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        if (!open) {
          setOpen(true)
          setFocusedIndex(localeOptions.length - 1)
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        }
        break
      }
      case 'Enter':
      case ' ': {
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < localeOptions.length) {
          switchLocale(localeOptions[focusedIndex])
        }
        break
      }
      case 'Home': {
        e.preventDefault()
        if (open) {
          setFocusedIndex(0)
        }
        break
      }
      case 'End': {
        e.preventDefault()
        if (open) {
          setFocusedIndex(localeOptions.length - 1)
        }
        break
      }
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev)
          setFocusedIndex(-1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault()
            setOpen(true)
            setFocusedIndex(e.key === 'ArrowDown' ? 0 : localeOptions.length - 1)
            // Focus the listbox after state update
            setTimeout(() => listboxRef.current?.focus(), 0)
          }
        }}
        className={cn(
          'flex items-center gap-1.5 rounded-[var(--radius-md)] border border-white/10 bg-phoenix-navy-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-phoenix-gold/50 hover:text-phoenix-gold-light focus:outline-none focus:ring-2 focus:ring-phoenix-gold/50',
          isPending && 'opacity-60 pointer-events-none',
        )}
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
          ref={listboxRef}
          role="listbox"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          className="absolute right-0 z-50 mt-1.5 min-w-[80px] overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-phoenix-navy-800 py-1 shadow-lg"
        >
          {localeOptions.map((loc, index) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                tabIndex={focusedIndex === index ? 0 : -1}
                onClick={() => switchLocale(loc)}
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(-1)}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-phoenix-gold/50',
                  focusedIndex === index && 'bg-white/10',
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
