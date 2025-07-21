import { Metadata } from 'next'
import { Box, Typography } from '@mui/material'
import TeamGrid from '~/components/TeamGrid'

export const metadata: Metadata = {
  title: 'Team | Mine the Word Academy',
  description: 'Meet the dedicated staff behind Mine the Word Academy.',
}

export default function TeamPage() {
  return (
    <Box component="section" sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Team
      </Typography>

      <TeamGrid />
    </Box>
  )
}