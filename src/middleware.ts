import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - /api (API routes)
     * - /studio (Sanity Studio)
     * - /_next (Next.js internals)
     * - /images, /fonts (static files in /public)
     * - Files with extensions (.ico, .svg, .png, .jpg, etc.)
     */
    '/((?!api|studio|_next|images|fonts|.*\\..*).*)',
  ],
}
