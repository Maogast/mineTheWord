'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '~/lib/firebaseClient'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useMyBookings, updateBookingStatus, Booking } from '~/hooks/useBookings'

export default function MyBookingsPage() {
  const router = useRouter()
  const user = auth.currentUser

  // redirect anonymous users
  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  // fetch both outgoing + incoming
  const outgoing = useMyBookings(false)
  const incoming = useMyBookings(true)

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      <Section title="Outgoing Requests" bookings={outgoing} />

      <Section
        title="Incoming Requests"
        bookings={incoming}
        isProvider
      />
    </Box>
  )
}

type SectionProps = {
  title: string
  bookings: Booking[]
  isProvider?: boolean
}

function Section({ title, bookings, isProvider = false }: SectionProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAction = async (id: string, status: 'confirmed' | 'declined') => {
    setLoadingId(id)
    try {
      await updateBookingStatus(id, status)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {bookings.length === 0 ? (
        <Typography color="text.secondary">No bookings here.</Typography>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((b) => (
            <Grid key={b.id} item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography>
                    {isProvider
                      ? `Requester: ${b.requesterName}`
                      : `Provider ID: ${b.providerId}`}
                  </Typography>
                  <Typography>
                    Date: {b.date.toDate().toLocaleString()}
                  </Typography>

                  {/* Animated status */}
                  <Box component={motion.div}
                       key={b.status}
                       initial={{ opacity: 0.5, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ duration: 0.3 }}>
                    <Typography>Status: {b.status}</Typography>
                  </Box>

                  {/* Confirm / Decline for providers */}
                  {isProvider && b.status === 'pending' && (
                    <Box sx={{ mt: 1 }}>
                      <Button
                        size="small"
                        onClick={() => handleAction(b.id, 'confirmed')}
                        disabled={loadingId === b.id}
                      >
                        {loadingId === b.id ? (
                          <CircularProgress size={14} />
                        ) : (
                          'Confirm'
                        )}
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleAction(b.id, 'declined')}
                        disabled={loadingId === b.id}
                        sx={{ ml: 1 }}
                      >
                        {loadingId === b.id ? (
                          <CircularProgress size={14} />
                        ) : (
                          'Decline'
                        )}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}