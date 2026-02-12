export const locales = ['en', 'ge', 'ru'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ge: 'ქართული',
  ru: 'Русский',
}

export const localeRegionMap: Record<string, Locale> = {
  GE: 'ge',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  UA: 'ru',
  AM: 'ru',
  AZ: 'ru',
}
