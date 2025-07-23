'use client'

import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material'
import ImpactStats from '~/components/ImpactStats'

export default function DonateForm() {
  // form state
  const [amount, setAmount] = useState(500)        // in cents
  const [mode, setMode] = useState<'one_time' | 'recurring'>('one_time')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // preset buttons
  const presets = [500, 2000, 5000]

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.round((parseFloat(e.target.value) || 0) * 100)
    setAmount(val)
  }

  const handleMode = (_: any, newMode: 'one_time' | 'recurring') => {
    if (newMode) {
      setMode(newMode)
      setAmount(500)
    }
  }

  const onDonate = async () => {
    setLoading(true)
    setError(undefined)
    try {
      // simulate a network call
      await new Promise((r) => setTimeout(r, 800))
      setSuccess(true)
    } catch {
      setError('Donation failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // success screen
  if (success) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Thank you for your {mode === 'one_time' ? 'one-time' : 'monthly'} gift of $
          {(amount / 100).toFixed(2)}!
        </Typography>
        <Typography variant="body2">
          We’ll send you a confirmation email shortly.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Support Mine the Word Academy
      </Typography>
      <Typography variant="body1" textAlign="center" paragraph>
        Your gift helps us train the next generation of Scripture teachers and missionaries.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Live impact stats */}
      <ImpactStats />

      <Box sx={{ mt: 6 }}>
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

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 3 }}
        >
          {presets.map((amt) => (
            <Button
              key={mode + amt}
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
    </Container>
  )
}