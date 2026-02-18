import { NextRequest, NextResponse } from 'next/server'
import {
  sanitizeInput,
  isHoneypotFilled,
  validateFormToken,
  checkRateLimit,
} from '@/lib/utils/security'
import { z } from 'zod'

/** Strict validation schema */
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .transform(sanitizeInput),
  email: z
    .string()
    .email('Invalid email address')
    .max(255)
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .max(30)
    .optional()
    .transform((v) => (v ? sanitizeInput(v) : undefined)),
  subject: z.enum(['general', 'services', 'partnership', 'ngo', 'other']).default('general'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long')
    .transform(sanitizeInput),
  _token: z.string().optional(),
  website_url: z.string().optional(), // honeypot
})

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by IP (using Upstash Redis in production, in-memory fallback in dev)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const rateCheck = await checkRateLimit(`contact:${ip}`, 3, 600000) // 3 per 10min
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(
              Math.ceil((rateCheck.resetAt - Date.now()) / 1000)
            ),
          },
        }
      )
    }

    // 2. Parse body
    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // 3. Honeypot check
    if (isHoneypotFilled(body.website_url)) {
      // Return success to confuse bots
      return NextResponse.json({ success: true })
    }

    // 4. Token time validation (server-side)
    if (body._token) {
      const tokenCheck = validateFormToken(body._token, 2000, 3600000)
      if (!tokenCheck.valid) {
        if (tokenCheck.reason === 'submitted_too_fast') {
          // Bot — return fake success
          return NextResponse.json({ success: true })
        }
        // Expired token is a normal case — allow through
      }
    }

    // 5. Validate with Zod
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.errors[0]
      return NextResponse.json(
        { error: firstError?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    const data = result.data

    // 6. Store submission
    // TODO: Send to Salesforce CRM when configured
    console.log('[Contact Form]', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message.slice(0, 100) + '...',
      ip,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact Form Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
