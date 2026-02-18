/**
 * Security utilities for form validation, rate limiting, and sanitization.
 * These functions protect against common web attacks without using CAPTCHAs.
 *
 * Rate limiting uses Upstash Redis for production (Vercel) deployments.
 * Falls back to in-memory rate limiting for development/local environments.
 * See: https://upstash.com/docs/redis/features/ratelimit
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
 * Persistent rate limiter for production (Vercel) and development.
 *
 * PRODUCTION (Vercel):
 * - Uses Upstash Redis for distributed, persistent rate limiting
 * - Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
 * - Supports: npm install @upstash/ratelimit @upstash/redis
 *
 * DEVELOPMENT:
 * - Falls back to in-memory rate limiting if Upstash credentials unavailable
 * - Note: In-memory state is lost between Vercel function invocations
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let upstashClient: Ratelimit | null = null

/**
 * Initialize Upstash rate limiter if credentials are available.
 * Returns null if not configured (will fall back to in-memory).
 */
function initializeUpstash(): Ratelimit | null {
  if (upstashClient) return upstashClient

  const hasCredentials =
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN

  if (!hasCredentials) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[Rate Limiter] Warning: Upstash credentials not found in production. ' +
        'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for persistent rate limiting.'
      )
    }
    return null
  }

  try {
    upstashClient = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1 h'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
    return upstashClient
  } catch (error) {
    console.warn('[Rate Limiter] Failed to initialize Upstash:', error)
    return null
  }
}

// In-memory fallback for development
const MAX_RATE_LIMIT_ENTRIES = 10000
const CLEANUP_INTERVAL_MS = 60000
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

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
  if (cleanupTimer && typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref()
  }
}

/**
 * Check rate limit using Upstash Redis (production) or in-memory (development).
 *
 * @param key Unique identifier (e.g., "contact:192.168.1.1")
 * @param maxRequests Maximum requests allowed per window
 * @param windowMs Time window in milliseconds
 * @returns Rate limit check result
 *
 * IMPORTANT: For Vercel deployments, use Upstash Redis.
 * In-memory rate limiting will be reset with each new function invocation.
 */
export async function checkRateLimit(
  key: string,
  maxRequests: number = 5,
  windowMs: number = 600000
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const upstash = initializeUpstash()

  if (upstash) {
    try {
      const result = await upstash.limit(key)

      return {
        allowed: result.success,
        remaining: result.remaining,
        resetAt: result.reset,
      }
    } catch (error) {
      console.warn('[Rate Limiter] Upstash error, falling back to in-memory:', error)
      // Continue to in-memory fallback
    }
  }

  // In-memory fallback (for development or if Upstash fails)
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetAt) {
    if (rateLimitMap.size >= MAX_RATE_LIMIT_ENTRIES) {
      cleanupRateLimits()
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

/** Cleanup expired rate limit entries (in-memory fallback only) */
export function cleanupRateLimits(): void {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key)
    }
  }
}
