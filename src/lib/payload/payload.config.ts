import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Services } from './collections/Services'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { CompanyDetails } from './globals/CompanyDetails'
import { SocialLinks } from './globals/SocialLinks'
import { Navigation } from './globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Phoenix Finance',
    },
  },
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  collections: [Users, Services, ContactSubmissions, NewsletterSubscribers, Media],
  globals: [SiteSettings, CompanyDetails, SocialLinks, Navigation],
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Georgian', code: 'ge' },
      { label: 'Russian', code: 'ru' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, '../../payload-types.ts'),
  },
  secret: process.env.PAYLOAD_SECRET || 'build-placeholder-secret-not-for-runtime',
  sharp,
})
