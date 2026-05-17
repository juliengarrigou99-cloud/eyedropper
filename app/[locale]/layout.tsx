import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EyeDropper',
  description: 'Eyes on the Ground',
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}