'use client'

import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Box,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// Validation schema
const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?\d+$/, 'Enter a valid phone number')
    .required('Phone is required'),
  course: yup.string().required('Select a course'),
})

type FormData = yup.InferType<typeof schema>
const STEPS = ['Your Details', 'Choose Course']

export default function RegistrationForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      course: '',
    },
  })

  const nextStep = async () => {
    const valid = await trigger(
      activeStep === 0 ? ['fullName', 'email', 'phone'] : ['course']
    )
    if (valid) setActiveStep((s) => s + 1)
  }
  const prevStep = () => setActiveStep((s) => s - 1)

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Registration failed')
      setSubmitted(true)
    } catch (err: any) {
      alert(err.message)
    }
  }

  if (submitted) {
    return (
      <Paper elevation={4} sx={{ p: 6, textAlign: 'center' }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64 }} />
        <Typography variant="h5" mt={2}>
          Registration Complete!
        </Typography>
        <Typography color="text.secondary" mt={1}>
          We’ve sent you a confirmation email—see you in class.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, maxWidth: 600, mx: 'auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Full Name"
                        fullWidth
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone"
                        placeholder="+254700123456"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </motion.div>
          )}
          {activeStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Select Course"
                    fullWidth
                    error={!!errors.course}
                    helperText={errors.course?.message}
                  >
                    <MenuItem value="foundation">Foundation Bible Course</MenuItem>
                    <MenuItem value="advanced">Advanced Scripture Study</MenuItem>
                    <MenuItem value="leadership">Ministry Leadership Track</MenuItem>
                  </TextField>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {activeStep > 0 ? (
            <Button onClick={prevStep} variant="outlined">
              Back
            </Button>
          ) : (
            <Box />
          )}
          {activeStep < STEPS.length - 1 ? (
            <Button onClick={nextStep} variant="contained">
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
            >
              {isSubmitting ? 'Submitting…' : 'Register'}
            </Button>
          )}
        </Box>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 3 }}>
            Please fix the highlighted fields above.
          </Alert>
        )}
      </Box>
    </Paper>
  )
}