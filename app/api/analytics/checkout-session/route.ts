import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'Valid session_id is required' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session.amount_total || session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paid session not available' }, { status: 404 })
    }

    const totalValue = session.amount_total / 100
    const shippingValue = Number(session.metadata?.shippingCost || '0')
    const quantity = Number(session.metadata?.quantity || '0')
    const couponCode = session.metadata?.couponCode || undefined
    const itemValue = Math.max(0, totalValue - shippingValue)
    const itemPrice = quantity > 0 ? Number((itemValue / quantity).toFixed(2)) : itemValue

    return NextResponse.json({
      transactionId: session.id,
      value: totalValue,
      currency: (session.currency || 'usd').toUpperCase(),
      shipping: shippingValue,
      coupon: couponCode,
      items: [
        {
          item_id: 'custom-card-order',
          item_name: 'Custom Card Order',
          item_category: 'Playing Cards',
          quantity,
          price: itemPrice,
        },
      ],
    })
  } catch (error) {
    console.error('Failed to load checkout session analytics summary:', error)
    return NextResponse.json({ error: 'Unable to load checkout session' }, { status: 500 })
  }
}
