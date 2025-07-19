'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { createBooking } from '~/hooks/useBookings'

const steps = ['Select Date & Time', 'Your Info', 'Confirm']

export default function ProviderDetail({ params }: { params: { id: string } }) {
  const router = useRouter()

  // load list and find provider
  const providers = useProviders()
  const [provider, setProvider] = useState<Provider | null>(null)

  // form state
  const [activeStep, setStep] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (providers.length) {
      const found = providers.find((p) => p.id === params.id) || null
      setProvider(found)
    }
  }, [providers, params.id])

  // loading / not found
  if (provider === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        {providers.length === 0 ? (
          <CircularProgress />
        ) : (
          <Typography variant="h6">Provider not found</Typography>
        )}
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

      // only pass fields that have values
      const data: any = {
        providerId: provider.id,
        requesterName: name,
        requesterEmail: email,
        date: dateTime,
        startTime: time,
      }
      if (phone) data.requesterPhone = phone

      await createBooking(data)
      router.push('/thank-you')
    } catch (err: any) {
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

      {/* Step 1 */}
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

      {/* Step 2 */}
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

      {/* Step 3 */}
      {activeStep === 2 && (
        <Box>
          <Typography>
            You are booking {provider.displayName} on {date} at {time}.
          </Typography>
          <Typography>Contact: {name}, {email}{phone && `, ${phone}`}</Typography>
        </Box>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Nav Buttons */}
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
            startIcon={
              submitting ? <CircularProgress size={20} color="inherit" /> : undefined
            }
          >
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </Button>
        )}
      </Box>
    </Paper>
  )
}