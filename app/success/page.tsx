'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { trackPurchase, type AnalyticsItem } from '@/utils/analytics'

// Force dynamic rendering since we use searchParams
export const dynamic = 'force-dynamic'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [orderValue, setOrderValue] = useState<number | null>(null)
  const hasTrackedPurchase = useRef(false)

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => {
    if (!sessionId || hasTrackedPurchase.current) {
      return
    }

    const storageKey = `purchase-tracked:${sessionId}`
    if (typeof window !== 'undefined' && window.sessionStorage.getItem(storageKey) === 'true') {
      hasTrackedPurchase.current = true
      return
    }

    let cancelled = false

    const trackCompletedPurchase = async () => {
      try {
        const response = await fetch(`/api/analytics/checkout-session?session_id=${encodeURIComponent(sessionId)}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const data: {
          transactionId: string
          value: number
          currency: string
          shipping?: number
          coupon?: string
          items: AnalyticsItem[]
        } = await response.json()

        if (cancelled) {
          return
        }

        setOrderValue(data.value)
        trackPurchase({
          transaction_id: data.transactionId,
          value: data.value,
          currency: data.currency,
          shipping: data.shipping,
          coupon: data.coupon,
          items: data.items,
        })

        hasTrackedPurchase.current = true
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(storageKey, 'true')
        }
      } catch (error) {
        console.error('Failed to track purchase event:', error)
      }
    }

    trackCompletedPurchase()

    return () => {
      cancelled = true
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Processing...</p>
          </div>
        ) : (
          <>
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
            {orderValue !== null && (
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 font-semibold">
                Charged: ${orderValue.toFixed(2)}
              </p>
            )}
            {sessionId && (
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500 mb-4 sm:mb-6 font-mono break-all px-2">
                Session ID: {sessionId}
              </p>
            )}
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
            >
              Return Home
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

