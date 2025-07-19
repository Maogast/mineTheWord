// src/app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
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
} from '@mui/material'

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
  const [regs, setRegs] = useState<Registration[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    async function load() {
      const q = query(
        collection(db, 'registrations'),
        where('email', '==', user.email)
      )
      const snap = await getDocs(q)
      setRegs(
        snap.docs.map((doc) => ({
          id: doc.id,
          course: doc.data().course,
          createdAt: doc.data().createdAt,
        }))
      )
      setFetching(false)
    }
    load()
  }, [user.email])

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Your Dashboard</Typography>
        <Button variant="outlined" onClick={() => signOut(auth)}>
          Logout
        </Button>
      </Box>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Registered Courses
        </Typography>

        {fetching ? (
          <Box textAlign="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        ) : regs.length ? (
          <List>
            {regs.map((r) => (
              <ListItem key={r.id} divider>
                <ListItemText
                  primary={r.course}
                  secondary={r.createdAt.toDate().toLocaleDateString()}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            You haven’t registered yet.
          </Typography>
        )}
      </Paper>
    </Container>
  )
}