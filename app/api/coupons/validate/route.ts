import { NextRequest, NextResponse } from 'next/server'
import { normalizeCouponCode } from '@/utils/coupon'
import { getSupabaseAdmin } from '@/utils/supabaseAdmin'

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 })
  }

  const body = await req.json()
  const code = normalizeCouponCode(body?.code || '')

  if (!code) {
    return NextResponse.json({ error: 'Enter a valid coupon code.' }, { status: 400 })
  }

  const { data, error } = await (supabase as any)
    .from('coupons')
    .select('code, discount_percent, status')
    .eq('code', code)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const coupon = data as { code: string; discount_percent: number; status: string } | null

  if (!coupon || coupon.status !== 'active') {
    return NextResponse.json({ error: 'This coupon is invalid or has already been used.' }, { status: 404 })
  }

  return NextResponse.json({
    valid: true,
    code: coupon.code,
    discountPercent: coupon.discount_percent,
  })
}
