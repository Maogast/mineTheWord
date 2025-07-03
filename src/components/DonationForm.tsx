'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Alert,
  Typography,
} from '@mui/material'

export default function DonationForm() {
  const [amount, setAmount] = useState<number>(500)    // in cents
  const [mode, setMode] = useState<'one_time' | 'recurring'>('one_time')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const presets = [500, 2000, 5000] // cents

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.round((parseFloat(e.target.value) || 0) * 100)
    setAmount(val)
  }

  const handleMode = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'one_time' | 'recurring'
  ) => {
    if (newMode) {
      setMode(newMode)
      setAmount(500)
    }
  }

  const onDonate = async () => {
    setLoading(true)
    setError(undefined)

    try {
      // ⏳ simulate network delay
      await new Promise((res) => setTimeout(res, 800))

      // 🚀 pretend we got back a session and redirected
      setSuccess(true)
    } catch (err: unknown) {
      setError('Donation failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Box textAlign="center" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Thank you for your {mode === 'one_time' ? 'one-time' : 'monthly'} gift of $
          {(amount / 100).toFixed(2)}!
        </Typography>
        <Typography variant="body2">
          We’ll send you a confirmation email once we go live.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleMode}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="one_time">One-Time</ToggleButton>
        <ToggleButton value="recurring">Monthly</ToggleButton>
      </ToggleButtonGroup>

      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mb: 3 }}>
        {presets.map((amt) => (
          <Button
            key={amt + mode}
            variant={amount === amt ? 'contained' : 'outlined'}
            onClick={() => setAmount(amt)}
          >
            ${(amt / 100).toFixed(2)}
            {mode === 'recurring' ? '/mo' : ''}
          </Button>
        ))}
      </Stack>

      <TextField
        label="Custom Amount (USD)"
        type="number"
        fullWidth
        value={(amount / 100).toFixed(2)}
        onChange={handleAmountChange}
        helperText="Enter any amount you wish to give"
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        onClick={onDonate}
        disabled={loading || amount < 100}
      >
        {loading
          ? 'Processing…'
          : `Donate $${(amount / 100).toFixed(2)}${mode === 'recurring' ? '/mo' : ''}`}
      </Button>
    </Box>
  )
}