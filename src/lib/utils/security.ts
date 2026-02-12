/**
 * Security utilities for form validation, rate limiting, and sanitization.
 * These functions protect against common web attacks without using CAPTCHAs.
 */

/** Sanitize user input — strip HTML tags to prevent XSS */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

/** Check honeypot field — should always be empty */
export function isHoneypotFilled(value: string | undefined | null): boolean {
  return Boolean(value && value.length > 0)
}

/**
 * Time-based form validation.
 * If form was submitted in less than `minMs`, it's likely a bot.
 */
export function isSubmittedTooFast(
  formLoadedAt: number,
  minMs: number = 3000
): boolean {
  return Date.now() - formLoadedAt < minMs
}

/** Generate a form token (timestamp-based, for time validation) */
export function generateFormToken(): string {
  const timestamp = Date.now()
  const payload = Buffer.from(JSON.stringify({ t: timestamp })).toString(
    'base64url'
  )
  return payload
}

/** Decode and validate form token */
export function validateFormToken(
  token: string,
  minAgeMs: number = 3000,
  maxAgeMs: number = 3600000
): { valid: boolean; reason?: string } {
  try {
    const decoded = JSON.parse(
      Buffer.from(token, 'base64url').toString('utf-8')
    )
    const age = Date.now() - decoded.t

    if (age < minAgeMs) {
      return { valid: false, reason: 'submitted_too_fast' }
    }
    if (age > maxAgeMs) {
      return { valid: false, reason: 'token_expired' }
    }
    return { valid: true }
  } catch {
    return { valid: false, reason: 'invalid_token' }
  }
}

/**
 * In-memory rate limiter with automatic cleanup and size cap.
 * TODO: Replace with Redis-based rate limiting in production for multi-instance support.
 */
const MAX_RATE_LIMIT_ENTRIES = 10000
const CLEANUP_INTERVAL_MS = 60000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

// Auto-cleanup expired entries every 60s
let cleanupTimer: ReturnType<typeof setInterval> | null = null

function ensureCleanupRunning() {
  if (cleanupTimer) return
  cleanupTimer = setInterval(() => {
    cleanupRateLimits()
    if (rateLimitMap.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer)
      cleanupTimer = null
    }
  }, CLEANUP_INTERVAL_MS)
  // Prevent the timer from blocking Node.js exit
  if (cleanupTimer && typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref()
  }
}

export function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 600000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    // Evict oldest entries if map is too large
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      cleanupRateLimits()
      // If still over limit after cleanup, reject
      if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
        return { allowed: false, remaining: 0, resetAt: now + windowMs }
      }
    }
    const resetAt = now + windowMs
    rateLimitMap.set(key, { count: 1, resetAt })
    ensureCleanupRunning()
    return { allowed: true, remaining: maxRequests - 1, resetAt }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/** Cleanup expired rate limit entries */
export function cleanupRateLimits(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}
