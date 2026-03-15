'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { META_PIXEL_ID, metaPixelEnabled, trackMetaPageView } from '@/utils/analytics'
import { COOKIE_CONSENT_EVENT, canUseNonEssentialCookies } from '@/utils/cookieConsent'

export default function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [canTrack, setCanTrack] = useState(false)

  useEffect(() => {
    const syncTracking = () => {
      setCanTrack(canUseNonEssentialCookies())
    }

    syncTracking()
    window.addEventListener(COOKIE_CONSENT_EVENT, syncTracking)
    window.addEventListener('storage', syncTracking)

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncTracking)
      window.removeEventListener('storage', syncTracking)
    }
  }, [])

  useEffect(() => {
    if (!metaPixelEnabled || !canTrack || !pathname) {
      return
    }

    const query = searchParams?.toString()
    const path = query ? `${pathname}?${query}` : pathname
    trackMetaPageView(path)
  }, [canTrack, pathname, searchParams])

  if (!metaPixelEnabled || !canTrack) {
    return null
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  )
}
