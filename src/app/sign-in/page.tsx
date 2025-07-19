'use client'

import { useState } from 'react'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { TextField, Button, Box, Typography, Alert } from '@mui/material'
import { auth } from '~/lib/firebaseClient'  // or ~/lib/firebaseClient

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string|null>(null)

  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/complete-signin`,
    handleCodeInApp: true,
  }

  const handleSend = async () => {
    // 1) Guard against empty email
    if (!email.trim()) {
      setError('Please enter a valid email address')
      return
    }
    setError(null)

    try {
      // 2) Call Firebase with a real email
      await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', email.trim())
      setSent(true)
    } catch (err: any) {
      console.error('Magic link error', err)
      // 3) Surface a user-friendly message
      setError(
        err.code === 'auth/invalid-email'
          ? 'That email address is invalid.'
          : 'Could not send link. Please try again later.'
      )
    }
  }

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {sent ? (
        <Typography>
          Magic link sent to <strong>{email}</strong>. Check your inbox!
        </Typography>
      ) : (
        <>
          <TextField
            label="Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSend}
            disabled={!email.trim()}
            sx={{ mt: 1 }}
          >
            Send Magic Link
          </Button>
        </>
      )}
    </Box>
  )
}