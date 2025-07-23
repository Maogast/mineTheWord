'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '~/lib/firebaseClient'
import {
  CircularProgress,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Alert,
} from '@mui/material'
import { useProviders, Provider } from '~/hooks/useProviders'
import { createBooking, NewBookingData } from '~/hooks/useBookings'

const steps = ['Select Date & Time', 'Your Info', 'Confirm']

export default function ProviderDetailContent({ params }: { params: { id: string } }) {
  const router = useRouter()
  const user = auth.currentUser

  const providers = useProviders()
  const [provider, setProvider] = useState<Provider | null>(null)

  // Form state
  const [activeStep, setStep] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (providers.length > 0) {
      const found = providers.find((p) => p.id === params.id) ?? null
      setProvider(found)
    }
  }, [providers, params.id])

  if (provider === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        {providers.length === 0 ? <CircularProgress /> : <Typography>Provider not found</Typography>}
      </Box>
    )
  }

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const dateTime = new Date(`${date}T${time}:00`)
      await createBooking({
        providerId: provider.userId,
        requesterName: name,
        requesterEmail: email,
        requesterPhone: phone || undefined,
        date: dateTime,
        startTime: time,
      } as NewBookingData)

      // send acknowledgment email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Booking Received',
          text: `Hi ${name},\n\nWe received your booking request for ${
            provider.displayName
          } on ${date} at ${time}. You’ll hear back once it’s confirmed!\n\nBlessings,\nMine The Word Academy`,
        }),
      })

      router.push('/thank-you')
    } catch (err: any) {
      console.error('Booking error:', err)
      setError(err.message || 'Booking failed')
      setSubmitting(false)
    }
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Book {provider.displayName}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <TextField
            label="Your Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Phone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography>
            You are booking {provider.displayName} on {date} at {time}.
          </Typography>
          <Typography>
            Contact: {name}, {email}
            {phone && `, ${phone}`}
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : undefined}
          >
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </Button>
        )}
      </Box>
    </Paper>
  )
}