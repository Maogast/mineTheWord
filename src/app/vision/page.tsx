'use client'

import Navbar from '~/components/Navbar'
import { Box, Container, Typography, Grid, Avatar } from '@mui/material'
import { motion } from 'framer-motion'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import PublicIcon from '@mui/icons-material/Public'
import GroupIcon from '@mui/icons-material/Group'
import BookIcon from '@mui/icons-material/Book'

const goals = [
  { icon: <LightbulbIcon />, title: 'Innovative Curriculum', desc: 'Develop cutting-edge Bible study tracks.' },
  { icon: <PublicIcon />, title: 'Global Reach', desc: 'Translate courses into multiple languages.' },
  { icon: <GroupIcon />, title: 'Community Hubs', desc: 'Launch local learning groups worldwide.' },
  { icon: <BookIcon />, title: 'Digital Library', desc: 'Create a free online archive of resources.' },
]

export default function VisionPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          height: 300,
          backgroundColor: 'primary.dark',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Typography variant="h2">Our Vision</Typography>
      </Box>

      {/* Roadmap */}
      <Container sx={{ py: 6 }}>
        <Box component="div">
          {goals.map((g, idx) => (
            <Grid
              container
              spacing={2}
              key={idx}
              sx={{ mb: 4, alignItems: 'center' }}
            >
              <Grid item xs={2} sx={{ textAlign: 'center' }}>
                <Avatar
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.2 }}
                  sx={{
                    bgcolor: 'secondary.main',
                    width: 56,
                    height: 56,
                    mx: 'auto',
                  }}
                >
                  {g.icon}
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <Typography variant="h5">{g.title}</Typography>
                <Typography color="text.secondary">{g.desc}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </>
  )
}