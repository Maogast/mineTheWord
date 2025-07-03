// src/components/PayButton.tsx
'use client'

import { useState } from 'react'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export interface PayButtonProps {
  currency: string
  /** amount in smallest currency unit (e.g. cents or sen) */
  amount?: number
  children: React.ReactNode
}

export default function PayButton({
  currency,
  amount = 5000,
  children,
}: PayButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currency, amount }),
      })
      const { url } = await res.json()
      if (url) window.location.assign(url)
    } catch (err) {
      console.error('Payment error:', err)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={handlePayment}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={20} /> : undefined}
    >
      {children}
    </Button>
  )
}