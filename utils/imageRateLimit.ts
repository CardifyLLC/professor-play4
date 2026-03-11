import { NextRequest } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'

const MAX_IMAGES_PER_HOUR = 10000
const WINDOW_MS = 60 * 60 * 1000

type RateWindow = {
  windowStart: number
  imageCount: number
}

declare global {
  var __imageRateLimitStore__: Map<string, RateWindow> | undefined
}

function getStore() {
  if (!globalThis.__imageRateLimitStore__) {
    globalThis.__imageRateLimitStore__ = new Map<string, RateWindow>()
  }

  return globalThis.__imageRateLimitStore__
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  return 'unknown'
}

export function getNonEmptyImageCount(images: Array<string | null | undefined>): number {
  return images.filter((image) => typeof image === 'string' && image.trim() !== '').length
}

export function consumeImageQuota(clientKey: string, requestedImages: number) {
  const now = Date.now()
  const store = getStore()
  const existing = store.get(clientKey)

  if (!existing || now - existing.windowStart >= WINDOW_MS) {
    if (requestedImages > MAX_IMAGES_PER_HOUR) {
      return {
        allowed: false,
        remainingImages: MAX_IMAGES_PER_HOUR,
        retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
      }
    }

    const nextWindow = {
      windowStart: now,
      imageCount: requestedImages,
    }
    store.set(clientKey, nextWindow)
    return {
      allowed: requestedImages <= MAX_IMAGES_PER_HOUR,
      remainingImages: Math.max(0, MAX_IMAGES_PER_HOUR - requestedImages),
      retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
    }
  }

  const nextCount = existing.imageCount + requestedImages
  if (nextCount > MAX_IMAGES_PER_HOUR) {
    const retryAfterMs = WINDOW_MS - (now - existing.windowStart)

    return {
      allowed: false,
      remainingImages: Math.max(0, MAX_IMAGES_PER_HOUR - existing.imageCount),
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    }
  }

  existing.imageCount = nextCount
  store.set(clientKey, existing)

  return {
    allowed: true,
    remainingImages: Math.max(0, MAX_IMAGES_PER_HOUR - nextCount),
    retryAfterSeconds: Math.max(1, Math.ceil((WINDOW_MS - (now - existing.windowStart)) / 1000)),
  }
}

export async function consumeImageQuotaWithSupabase(
  supabase: SupabaseClient,
  clientKey: string,
  requestedImages: number
) {
  const { data, error } = await supabase.rpc('consume_image_quota', {
    p_client_key: clientKey,
    p_requested_images: requestedImages,
    p_max_images: MAX_IMAGES_PER_HOUR,
    p_window_seconds: WINDOW_MS / 1000,
  })

  if (error) {
    throw error
  }

  const result = Array.isArray(data) ? data[0] : data

  return {
    allowed: Boolean(result?.allowed),
    remainingImages: Number(result?.remaining_images ?? 0),
    retryAfterSeconds: Number(result?.retry_after_seconds ?? Math.ceil(WINDOW_MS / 1000)),
  }
}

export { MAX_IMAGES_PER_HOUR }
