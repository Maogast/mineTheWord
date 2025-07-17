// src/api/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase-admin'  // we'll record purchases here

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { currency = 'usd', amount = 2999 } = await request.json()

    if (!['usd', 'eur', 'kes'].includes(currency.toLowerCase())) {
      return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
    }

    const stripeAmount = Math.floor(amount)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'Mine the Word Academy – Full Access',
              description:
                'Complete access to all courses, features, and materials',
              images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`],
            },
            unit_amount: stripeAmount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
      metadata: { currency, amount: amount.toString() },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE', 'FR', 'KE', 'NG', 'ZA'],
      },
    })

    // Optionally record an “initiated” purchase in Firestore
    await adminDb.collection('purchases').add({
      type: 'checkout_session',
      sessionId: session.id,
      amount: stripeAmount,
      currency,
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (err: any) {
    console.error('Stripe POST error:', err)
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Internal Error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('stripe-signature')
    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 })
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)

    if (event.type === 'checkout.session.completed') {
      const sess = event.data.object as Stripe.Checkout.Session
      await adminDb.collection('purchases').add({
        type: 'session_completed',
        sessionId: sess.id,
        customer: sess.customer,
        amount: sess.amount_total,
        created_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 })
  }
}