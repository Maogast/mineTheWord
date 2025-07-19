// src/app/donate/page.tsx
'use client'

import { Container, Box, Typography, Divider } from '@mui/material'
import DonationForm from '~/components/DonationForm'
import ImpactStats from '~/components/ImpactStats'

export default function DonatePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Support Mine the Word Academy
      </Typography>
      <Typography variant="body1" textAlign="center" paragraph>
        Your gift helps us train the next generation of Scripture teachers and missionaries.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Live stats: total raised / donors */}
      <ImpactStats />

      <Box sx={{ mt: 6 }}>
        {/* Amount picker, one-time/recurring toggle + stripe checkout */}
        <DonationForm />
      </Box>
    </Container>
  )
}