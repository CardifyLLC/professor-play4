'use client'

export const COOKIE_CONSENT_KEY = 'tcgplaytest-cookie-consent'
export const COOKIE_CONSENT_EVENT = 'tcgplaytest-cookie-consent-updated'

export type CookieConsent = 'accepted'

export function getStoredCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY)
  return value === 'accepted' ? value : null
}

export function setStoredCookieConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(COOKIE_CONSENT_KEY, consent)
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}

export function isDoNotTrackEnabled() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const flags = [
    navigator.doNotTrack,
    (window as Window & { doNotTrack?: string }).doNotTrack,
    (navigator as Navigator & { msDoNotTrack?: string }).msDoNotTrack,
  ]

  return flags.some((flag) => flag === '1' || flag === 'yes')
}

export function canUseNonEssentialCookies() {
  return getStoredCookieConsent() === 'accepted' && !isDoNotTrackEnabled()
}
