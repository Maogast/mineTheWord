'use client'

import Navbar from '~/components/Navbar'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material'
import { motion } from 'framer-motion'
import IntegrityIcon from '@mui/icons-material/Gavel'
import ExcellenceIcon from '@mui/icons-material/Star'
import CommunityIcon from '@mui/icons-material/Group'
import FaithIcon from '@mui/icons-material/AutoAwesome'

const values = [
  { icon: <IntegrityIcon />, title: 'Integrity', desc: 'Honoring truth in word & deed.', core: true },
  { icon: <ExcellenceIcon />, title: 'Excellence', desc: 'Pursuing quality in every aspect.', core: true },
  { icon: <CommunityIcon />, title: 'Community', desc: 'Building supportive fellowship.' },
  { icon: <FaithIcon />, title: 'Faith', desc: 'Trusting God’s guidance wholeheartedly.' },
]

export default function ValuesPage() {
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
          backgroundColor: 'success.main',
          color: 'success.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h2">Our Values</Typography>
      </Box>

      {/* Values Grid */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {values.map((v, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                sx={{ position: 'relative' }}
              >
                <CardContent>
                  {v.core && (
                    <Chip
                      label="Core"
                      color="secondary"
                      size="small"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                    />
                  )}
                  <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    sx={{ mb: 2, color: 'primary.main' }}
                  >
                    {v.icon}
                  </Box>
                  <Typography variant="h5">{v.title}</Typography>
                  <Typography color="text.secondary">{v.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}