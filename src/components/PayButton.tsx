// src/components/PayButton.tsx
'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export interface PayButtonProps {
  /** ISO currency code (e.g. 'USD', 'EUR', 'KES') */
  currency: string

  /** amount in smallest currency unit (e.g. cents or sen) */
  amount?: number

  /** optional Stripe Price ID; if provided we ignore currency+amount */
  stripePriceId?: string

  children: React.ReactNode
}

export default function PayButton({
  currency,
  amount = 5000,
  stripePriceId,
  children,
}: PayButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Build payload: prefer priceId
      const payload = stripePriceId
        ? { priceId: stripePriceId }
        : { currency, amount }

      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const { url, error } = await res.json()
      if (error) throw new Error(error)

      if (url) {
        window.location.assign(url)
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      alert(`Payment failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handlePayment}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : undefined}
      sx={{ textTransform: 'none' }}
    >
      {children}
    </Button>
  )
}