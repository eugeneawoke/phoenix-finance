import { NextRequest, NextResponse } from 'next/server'
import { sanitizeInput, checkRateLimit } from '@/lib/utils/security'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .max(255)
    .transform((v) => v.toLowerCase().trim()),
  name: z
    .string()
    .max(100)
    .optional()
    .transform((v) => (v ? sanitizeInput(v) : undefined)),
})

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    const rateCheck = checkRateLimit(`newsletter:${ip}`, 3, 600000)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Validation failed' },
        { status: 400 }
      )
    }

    console.log('[Newsletter Subscription]', {
      email: result.data.email,
      timestamp: new Date().toISOString(),
    })

    // TODO: Save to Payload CMS NewsletterSubscribers collection

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Newsletter Error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
