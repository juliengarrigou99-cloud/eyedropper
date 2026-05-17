import {getRequestConfig} from 'next-intl/server'

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale || 'fr'
  let messages
  if (locale === 'en') {
    messages = (await import('../messages/en.json')).default
  } else if (locale === 'es') {
    messages = (await import('../messages/es.json')).default
  } else {
    messages = (await import('../messages/fr.json')).default
  }
  return { locale, messages }
})
