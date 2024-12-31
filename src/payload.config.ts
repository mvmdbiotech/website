import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import sharp from 'sharp'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'

// list all translations
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { es } from '@payloadcms/translations/languages/es'
import { pt } from '@payloadcms/translations/languages/pt'

// list all collections
import { Users } from './collections/Users'
import { Posts } from './collections/News'

export default buildConfig({
  
  admin: {
    // ...
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['pages', 'posts'],
    },
  },

  collections: [
    Users,
    Posts,
  ],

  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),

  editor: lexicalEditor(),

  email: resendAdapter({
    defaultFromAddress: 'hello@mvmd.com',
    defaultFromName: 'MVMD',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

  i18n: {
    supportedLanguages: { en, fr, es, pt },
    fallbackLanguage: 'en', // default
  },

  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Español',
        code: 'es',
      },
      {
        label: 'Français',
        code: 'fr',
      },
      {
        label: 'Português',
        code: 'pt',
      },
    ], 
    defaultLocale: 'en', // required
    fallback: true,
  },

  secret: process.env.PAYLOAD_SECRET || '',
  
  

  sharp,
})