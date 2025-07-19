// src/app/thank-you/page.tsx
'use client'

import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Thank You!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Your booking request has been received. We’ll notify you once the provider responds.
      </Typography>

      <Box>
        <Button
          component={Link}
          href="/providers"
          variant="contained"
          sx={{ mr: 2 }}
        >
          Book Another
        </Button>
        <Button component={Link} href="/" variant="outlined">
          Home
        </Button>
      </Box>
    </Box>
  )
}