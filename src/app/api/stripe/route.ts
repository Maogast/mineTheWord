import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db, serverTimestamp } from '@/lib/firebaseAdmin' 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(request: Request) {
  try {
    const { paymentIntentId, fullName, email } = await request.json()

    // 1. Retrieve the PaymentIntent from Stripe
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (pi.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // 2. Save to Firestore
    const docRef = await db
      .collection('payments')
      .add({
        fullName,
        email,
        amount: pi.amount,
        currency: pi.currency,
        paymentIntentId,
        createdAt: serverTimestamp(),
      })

    return NextResponse.json({ success: true, id: docRef.id })
  } catch (err: any) {
    console.error('Stripe route error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}