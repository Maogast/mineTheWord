// 0. Imports
import * as functions from 'firebase-functions'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import Stripe from 'stripe'

// 1) Load service account JSON
//    Adjust the path if you placed the JSON somewhere else.
const serviceAccount = require('../serviceAccountKey.json')

// 2) Initialize Firebase Admin with explicit credentials
initializeApp({
  credential: cert(serviceAccount),
  // Optional: if you need RTDB:
  // databaseURL: "https://mine-the-word-academy.firebaseio.com"
})
const db = getFirestore()

// 3) Initialize Stripe
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2025-06-30.basil',
})

// --- Types & Helpers ---
interface SessionData {
  amount: number
}

function validateAmount(data: any): number {
  const amt = data?.amount
  if (typeof amt !== 'number' || amt < 100) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'You must provide a numeric `amount` ≥ 100 (cents).'
    )
  }
  return amt
}

// --- 1. One-time Checkout Session ---
export const createStripeCheckoutSession = functions.https.onCall(
  async (request) => {
    const data = request.data as SessionData
    const amount = validateAmount(data)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Academy Donation' },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${functions.config().app.url}/donate?success=true`,
      cancel_url: `${functions.config().app.url}/donate?canceled=true`,
    })

    return { sessionId: session.id }
  }
)

// --- 2. Recurring (Monthly) Subscription Session ---
export const createStripeSubscriptionSession = functions.https.onCall(
  async (request) => {
    const data = request.data as SessionData
    const amount = validateAmount(data)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Monthly Support' },
            unit_amount: amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${functions.config().app.url}/donate?success=true`,
      cancel_url: `${functions.config().app.url}/donate?canceled=true`,
    })

    return { sessionId: session.id }
  }
)

// --- 3. Stripe Webhook to Record Payments ---
export const stripeWebhook = functions.https.onRequest(
  async (req, res) => {
    const sig = req.headers['stripe-signature']
    if (!sig || typeof sig !== 'string') {
      res.status(400).send('Missing Stripe signature header.')
      return
    }

    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody as Buffer,
        sig,
        functions.config().stripe.webhook_secret
      )
    } catch (err: any) {
      console.error('⚠️ Webhook signature verification failed:', err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      await db.collection('donations').add({
        amount: session.amount_total,
        type: session.mode,
        customer: session.customer,
        timestamp: FieldValue.serverTimestamp(),
      })
    }

    res.status(200).send({ received: true })
  }
)