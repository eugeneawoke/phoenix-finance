import createMiddleware from 'next-intl/middleware'
import { routing } from '@/lib/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    /*
     * Match all pathnames except:
     * - /api (API routes)
     * - /admin (Payload CMS admin)
     * - /_next (Next.js internals)
     * - /images, /fonts (static files in /public)
     * - Files with extensions (.ico, .svg, .png, .jpg, etc.)
     */
    '/((?!api|admin|_next|images|fonts|.*\\..*).*)',
  ],
}
