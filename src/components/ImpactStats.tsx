// src/components/ImpactStats.tsx
'use client'

import { useEffect, useState } from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '~/lib/firebaseClient'

export default function ImpactStats() {
  const [total, setTotal] = useState(0)
  const [donors, setDonors] = useState(0)

  useEffect(() => {
    async function fetchStats() {
      const snaps = await getDocs(collection(db, 'donations'))
      let sum = 0
      snaps.forEach(doc => (sum += doc.data().amount))
      setTotal(sum / 100) // stored in cents
      setDonors(snaps.size)
    }
    fetchStats()
  }, [])

  return (
    <Grid container spacing={4} justifyContent="center">
      {[ 
        { label: 'Total Raised', value: `$${total.toLocaleString()}` },
        { label: 'Donors', value: donors }
      ].map((stat) => (
        <Grid item key={stat.label} xs={6}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }} elevation={2}>
            <Typography variant="h4">{stat.value}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}