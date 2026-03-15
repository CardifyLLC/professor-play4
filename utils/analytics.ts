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
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ''
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '939749441871991'

export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID || GOOGLE_ADS_ID)
export const metaPixelEnabled = Boolean(META_PIXEL_ID)

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

export function trackMetaEvent(name: string, params?: Record<string, string | number>) {
  if (!metaPixelEnabled || typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  if (params) {
    window.fbq('track', name, params)
    return
  }

  window.fbq('track', name)
}

export function trackMetaPageView(path?: string) {
  if (!metaPixelEnabled || typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return
  }

  if (path) {
    window.fbq('trackCustom', 'VirtualPageView', {
      page_path: path,
    })
  }

  window.fbq('track', 'PageView')
}

export function trackMetaInitiateCheckout(params: {
  value: number
  currency: string
}) {
  trackMetaEvent('InitiateCheckout', params)
}

export function trackMetaPurchase(params: {
  value: number
  currency: string
  order_id: string
}) {
  trackMetaEvent('Purchase', {
    value: params.value,
    currency: params.currency,
    content_type: 'product',
    order_id: params.order_id,
  })
}
