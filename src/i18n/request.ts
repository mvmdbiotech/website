import { getRequestConfig } from 'next-intl/server'
import { routing } from '~/i18n/routing'

import en from '~/i18n/messages/en.json'

type Messages = typeof en

declare global {
  type IntlMessages = Messages
}

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as string)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})