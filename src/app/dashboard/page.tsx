'use client'

import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth'
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { auth, db } from '~/lib/firebaseClient'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import { useMyBookings, type Booking } from '~/hooks/useBookings'
import { useProviders, type Provider } from '~/hooks/useProviders'

type Registration = {
  id: string
  course: string
  createdAt: Timestamp
}

export default function DashboardLoader() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace('/sign-in')
      } else {
        setUser(u)
        setLoading(false)
      }
    })
    return () => unsub()
  }, [router])

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }
  return <DashboardPage user={user!} />
}

function DashboardPage({ user }: { user: User }) {
  // 1) Load registrations
  const [regs, setRegs] = useState<Registration[]>([])
  const [fetchingRegs, setFetchingRegs] = useState(true)

  useEffect(() => {
    async function loadRegs() {
      const q = query(
        collection(db, 'registrations'),
        where('email', '==', user.email)
      )
      const snap = await getDocs(q)
      setRegs(
        snap.docs.map((d) => ({
          id: d.id,
          course: d.data().course,
          createdAt: d.data().createdAt,
        }))
      )
      setFetchingRegs(false)
    }
    loadRegs()
  }, [user.email])

  // 2) Stream outgoing bookings (all users)
  const outgoing = useMyBookings(false)

  // 3) Stream providers list & detect if current user is a provider
  const providers = useProviders()
  const myProvider = providers.find((p) => p.userId === user.uid)
  const isProvider = Boolean(myProvider)

  // 4) If provider, stream incoming
  const incoming = useMyBookings(true)

  // 5) Logout
  const router = useRouter()
  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/sign-in')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Your Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Registered Courses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Registered Courses
            </Typography>
            {fetchingRegs ? (
              <Box textAlign="center" mt={2}>
                <CircularProgress size={24} />
              </Box>
            ) : regs.length > 0 ? (
              <List>
                {regs.map((r) => (
                  <ListItem key={r.id} divider>
                    <ListItemText
                      primary={r.course}
                      secondary={r.createdAt
                        .toDate()
                        .toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                You haven’t registered for any courses yet.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Outgoing Bookings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Bookings
            </Typography>
            {outgoing.length === 0 ? (
              <Typography color="text.secondary">
                No bookings made yet.
              </Typography>
            ) : (
              <List>
                {outgoing.map((b) => {
                  const prov = providers.find((p) => p.userId === b.providerId)
                  return (
                    <ListItem key={b.id} divider>
                      <ListItemText
                        primary={
                          prov
                            ? `With ${prov.displayName}`
                            : `With ${b.providerId}`
                        }
                        secondary={`${b.date
                          .toDate()
                          .toLocaleDateString()} @ ${b.startTime} — ${
                          b.status
                        }`}
                      />
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Incoming Requests (Providers Only) */}
        {isProvider && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Incoming Requests for {myProvider?.displayName}
              </Typography>
              {incoming.length === 0 ? (
                <Typography color="text.secondary">
                  No incoming booking requests.
                </Typography>
              ) : (
                <Grid container spacing={2}>
                  {incoming.map((b) => (
                    <Grid key={b.id} item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography>
                            From: {b.requesterName} ({b.requesterEmail})
                          </Typography>
                          <Typography>
                            When: {b.date
                              .toDate()
                              .toLocaleDateString()}{' '}
                            @ {b.startTime}
                          </Typography>
                          <Typography>Status: {b.status}</Typography>
                          {/* You could link to your existing Confirm/Decline UI here */}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}