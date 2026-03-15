'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COOKIE_CONSENT_EVENT, getStoredCookieConsent, setStoredCookieConsent } from '@/utils/cookieConsent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const syncVisibility = () => {
      setVisible(getStoredCookieConsent() !== 'accepted')
    }

    syncVisibility()
    window.addEventListener(COOKIE_CONSENT_EVENT, syncVisibility)

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncVisibility)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-[110] sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          We use cookies to improve your experience.
        </p>
        <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">
          Essential cookies keep the site working. Analytics and marketing cookies only load after you accept.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setStoredCookieConsent('accepted')
              setVisible(false)
            }}
            className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
          >
            Accept
          </button>
          <Link
            href="/cookies"
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}
