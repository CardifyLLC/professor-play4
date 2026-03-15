'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  analyticsEnabled,
  trackPageView,
} from '@/utils/analytics'

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!analyticsEnabled || !pathname) {
      return
    }

    const query = searchParams?.toString()
    const path = query ? `${pathname}?${query}` : pathname
    trackPageView(path)
  }, [pathname, searchParams])

  if (!analyticsEnabled) {
    return null
  }

  const primaryTagId = GA_MEASUREMENT_ID || GOOGLE_ADS_ID
  const tagIds = [GA_MEASUREMENT_ID, GOOGLE_ADS_ID].filter(Boolean)

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            ${tagIds.map((id) => `gtag('config', '${id}', { send_page_view: false });`).join('\n')}
          `,
        }}
      />
    </>
  )
}
