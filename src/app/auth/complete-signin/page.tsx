// src/app/auth/complete-signin/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '~/lib/firebaseClient'
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth'
import { CircularProgress, Box, Typography } from '@mui/material'

export default function CompleteSignIn() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const url = window.location.href
    if (isSignInWithEmailLink(auth, url)) {
      let email = window.localStorage.getItem('emailForSignIn') || ''
      if (!email) {
        email = window.prompt('Confirm your email for sign-in') || ''
      }
      signInWithEmailLink(auth, email, url)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn')
          router.replace('/dashboard')
        })
        .catch(() => {
          setError('Could not complete sign-in. Please try again.')
        })
    } else {
      setError('Invalid sign-in link.')
    }
  }, [router])

  if (error) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box textAlign="center" mt={8}>
      <CircularProgress />
      <Typography>Signing you in…</Typography>
    </Box>
  )
}