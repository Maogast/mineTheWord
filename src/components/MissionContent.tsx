'use client'

import Navbar from '~/components/Navbar'
import { Box, Container, Grid, Typography, Paper } from '@mui/material'
import { motion } from 'framer-motion'

export default function MissionContent() {
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
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="h6">
            Equipping believers to mine the depths of the Word and shine its light to the world.
          </Typography>
        </Container>
      </Box>

      {/* Mission Points */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {[
            'Cultivate deep, lifelong engagement with Scripture.',
            'Provide accessible teaching and resources worldwide.',
            'Empower leaders to faithfully apply God’s Word in every sphere.',
          ].map((point, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                sx={{ p: 3, height: '100%' }}
              >
                <Typography variant="h5" gutterBottom>
                  {`0${idx + 1}`}
                </Typography>
                <Typography>{point}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}