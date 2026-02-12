/** Format currency amount */
export function formatCurrency(
  amount: number,
  currency: 'GEL' | 'USD' | 'EUR' = 'GEL',
  locale: string = 'en'
): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ge: 'ka-GE',
    ru: 'ru-RU',
  }

  const currencyMap: Record<string, string> = {
    GEL: 'GEL',
    USD: 'USD',
    EUR: 'EUR',
  }

  return new Intl.NumberFormat(localeMap[locale] || 'en-US', {
    style: 'currency',
    currency: currencyMap[currency],
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/** Format date based on locale */
export function formatDate(
  date: string | Date,
  locale: string = 'en',
  options?: Intl.DateTimeFormatOptions
): string {
  const localeMap: Record<string, string> = {
    en: 'en-US',
    ge: 'ka-GE',
    ru: 'ru-RU',
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }

  return new Intl.DateTimeFormat(
    localeMap[locale] || 'en-US',
    defaultOptions
  ).format(new Date(date))
}

/** Format phone number for display */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `+995 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`
  }
  return phone
}

/** Truncate text with ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}
