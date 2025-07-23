'use client'

import Navbar from '~/components/Navbar'
import { Box, Container, Typography, Grid, Paper } from '@mui/material'
import { motion } from 'framer-motion'

const milestones = [
  { year: '2015', event: 'Founded by Pastor Steve Rundu.' },
  { year: '2017', event: 'First online Bible course launched.' },
  { year: '2019', event: 'Global translation initiative began.' },
  { year: '2021', event: 'Community hubs established.' },
  { year: '2023', event: 'Digital library reached 10k resources.' },
  { year: '2025', event: 'Revamped site with new vision.' },
]

export default function HistoryContent() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          height: 300,
          backgroundColor: 'warning.main',
          color: 'warning.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h2">Our Story</Typography>
      </Box>

      {/* Timeline */}
      <Container sx={{ py: 6 }}>
        {milestones.map((m, idx) => {
          const isLeft = idx % 2 === 0
          return (
            <Grid
              container
              spacing={2}
              key={idx}
              sx={{ mb: 4, alignItems: 'center' }}
            >
              <Grid item xs={12} md={6} order={{ xs: 2, md: isLeft ? 1 : 2 }}>
                <Paper
                  component={motion.div}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  sx={{ p: 3 }}
                >
                  <Typography variant="h6">{m.year}</Typography>
                  <Typography>{m.event}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: isLeft ? 2 : 1 }}>
                {/* Spacer */}
              </Grid>
            </Grid>
          )
        })}
      </Container>
    </>
  )
}