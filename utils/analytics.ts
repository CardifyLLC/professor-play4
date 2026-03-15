'use client'

export type AnalyticsItem = {
  item_id: string
  item_name: string
  item_category?: string
  price?: number
  quantity?: number
}

type AnalyticsParams = Record<string, string | number | boolean | undefined | AnalyticsItem[]>

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''

export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID)

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!analyticsEnabled || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', name, params)
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') {
    return
  }

  trackEvent('page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function trackBeginCheckout(params: {
  currency: string
  value: number
  coupon?: string
  items: AnalyticsItem[]
}) {
  trackEvent('begin_checkout', params)
}

export function trackPurchase(params: {
  transaction_id: string
  value: number
  currency: string
  shipping?: number
  coupon?: string
  items: AnalyticsItem[]
}) {
  trackEvent('purchase', params)
}
