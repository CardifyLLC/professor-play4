import { NextRequest, NextResponse } from 'next/server'
import { COUPON_DISCOUNT_PERCENT, generateCouponCode, sanitizeCouponPrefix } from '@/utils/coupon'
import { getSupabaseAdmin } from '@/utils/supabaseAdmin'

export const runtime = 'nodejs'

function isAuthorized(req: NextRequest) {
  const expectedToken = process.env.COUPON_ADMIN_TOKEN
  if (!expectedToken) {
    return { ok: false, message: 'COUPON_ADMIN_TOKEN is not configured.' }
  }

  const providedToken = req.headers.get('x-admin-token')?.trim()
  if (!providedToken || providedToken !== expectedToken) {
    return { ok: false, message: 'Unauthorized coupon admin request.' }
  }

  return { ok: true }
}

export async function GET(req: NextRequest) {
  const auth = isAuthorized(req)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 })
  }

  const limitParam = Number(req.nextUrl.searchParams.get('limit') || '30')
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 30

  const { data, error } = await (supabase as any)
    .from('coupons')
    .select('id, code, discount_percent, status, created_for, note, created_by, used_by_email, used_by_order_id, created_at, used_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ coupons: data || [] })
}

export async function POST(req: NextRequest) {
  const auth = isAuthorized(req)
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 500 })
  }

  const body = await req.json()
  const count = Math.min(Math.max(Number(body?.count || 1), 1), 100)
  const prefix = sanitizeCouponPrefix(body?.prefix || 'PLAY')
  const createdFor = typeof body?.createdFor === 'string' ? body.createdFor.trim().slice(0, 120) : ''
  const note = typeof body?.note === 'string' ? body.note.trim().slice(0, 240) : ''
  const createdBy = typeof body?.createdBy === 'string' ? body.createdBy.trim().slice(0, 120) : 'owner'

  const rows: Array<{
    code: string
    discount_percent: number
    created_for: string | null
    note: string | null
    created_by: string | null
  }> = []

  const generated = new Set<string>()
  while (rows.length < count) {
    const code = generateCouponCode(prefix)
    if (generated.has(code)) {
      continue
    }

    generated.add(code)
    rows.push({
      code,
      discount_percent: COUPON_DISCOUNT_PERCENT,
      created_for: createdFor || null,
      note: note || null,
      created_by: createdBy || null,
    })
  }

  const { data, error } = await (supabase as any)
    .from('coupons')
    .insert(rows as any)
    .select('id, code, discount_percent, status, created_for, note, created_by, used_by_email, used_by_order_id, created_at, used_at')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    coupons: data || [],
    discountPercent: COUPON_DISCOUNT_PERCENT,
  })
}
