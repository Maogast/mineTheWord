'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '~/lib/firebaseClient'
import { signOut } from 'firebase/auth'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useMyBookings, Booking } from '~/hooks/useBookings'
import { useProviders, Provider } from '~/hooks/useProviders'

export default function MyBookingsPage() {
  const router = useRouter()
  const user = auth.currentUser

  // redirect anonymous
  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  const handleLogout = async () => {
    await signOut(auth)
    router.replace('/login')
  }

  const outgoing = useMyBookings(false)
  const incoming = useMyBookings(true)
  const providers = useProviders()

  // Dialog & Snackbar state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<'confirmed'|'declined'>('confirmed')
  const [dialogBooking, setDialogBooking] = useState<Booking|null>(null)
  const [snackbar, setSnackbar] = useState<{open:boolean, message:string, severity:'success'|'error'}>(
    {open:false, message:'', severity:'success'}
  )
  const [loadingId, setLoadingId] = useState<string|null>(null)

  // Confirm button clicked → open dialog
  const openConfirmDialog = (booking: Booking, action: 'confirmed'|'declined') => {
    setDialogBooking(booking)
    setDialogAction(action)
    setDialogOpen(true)
  }

  // Perform the action
  const handleDialogConfirm = async () => {
    if (!dialogBooking) return
    setLoadingId(dialogBooking.id)
    try {
      const res = await fetch('/api/update-booking', {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          bookingId: dialogBooking.id,
          status: dialogAction,
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error||'Unknown error')
      setSnackbar({
        open: true,
        severity: 'success',
        message: `Booking ${dialogAction}!`,
      })
    } catch (e:any) {
      console.error(e)
      setSnackbar({
        open: true,
        severity: 'error',
        message: e.message||'Action failed',
      })
    } finally {
      setLoadingId(null)
      setDialogOpen(false)
      setDialogBooking(null)
    }
  }

  if (!user) {
    return (
      <Box sx={{ display:'flex', justifyContent:'center', mt:8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow:1 }}>
            My Bookings
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
            sx={{
              borderColor:'rgba(255,255,255,0.7)',
              ':hover':{borderColor:'white', bgcolor:'rgba(255,255,255,0.1)'}
            }}
          >Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ p:3 }}>
        <Section
          title="Outgoing Requests"
          bookings={outgoing}
          providers={providers}
          isProvider={false}
          openDialog={openConfirmDialog}
          loadingId={loadingId}
        />
        <Section
          title="Incoming Requests"
          bookings={incoming}
          providers={providers}
          isProvider={true}
          openDialog={openConfirmDialog}
          loadingId={loadingId}
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {dialogAction === 'confirmed' ? 'Confirm Booking' : 'Decline Booking'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to <b>{dialogAction}</b> this booking?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleDialogConfirm}
            variant="contained"
            color={dialogAction === 'confirmed' ? 'primary' : 'error'}
            disabled={loadingId === dialogBooking?.id}
          >
            {loadingId === dialogBooking?.id
              ? <CircularProgress size={20} color="inherit"/>
              : dialogAction === 'confirmed' ? 'Yes, Confirm' : 'Yes, Decline'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(s => ({...s, open:false}))}
      >
        <Alert
          onClose={() => setSnackbar(s => ({...s, open:false}))}
          severity={snackbar.severity}
          sx={{width:'100%'}}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

type SectionProps = {
  title: string
  bookings: Booking[]
  providers: Provider[]
  isProvider: boolean
  openDialog: (b:Booking, a:'confirmed'|'declined')=>void
  loadingId: string|null
}

function Section({
  title,
  bookings,
  providers,
  isProvider,
  openDialog,
  loadingId,
}: SectionProps) {
  return (
    <Box sx={{ mb:4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {bookings.length === 0 ? (
        <Typography color="text.secondary">
          No bookings here.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {bookings.map((b) => {
            const provider = providers.find((p) => p.userId === b.providerId)
            return (
              <Grid key={b.id} item xs={12} md={6}>
                <Card>
                  <CardContent>
                    {isProvider ? (
                      <>
                        <Typography>Requester: {b.requesterName}</Typography>
                        <Typography>Email: {b.requesterEmail}</Typography>
                        {b.requesterPhone && (
                          <Typography>Phone: {b.requesterPhone}</Typography>
                        )}
                      </>
                    ) : (
                      <Typography>
                        Provider: {provider?.displayName ?? b.providerId}
                      </Typography>
                    )}

                    <Typography>
                      Date: {b.date.toDate().toLocaleString()}
                    </Typography>
                    <Typography>Status: {b.status}</Typography>

                    {/* Confirm/Decline Buttons */}
                    {isProvider && b.status === 'pending' && (
                      <Box sx={{ mt:2, display:'flex', gap:1 }}>
                        <motion.div whileHover={{ scale:1.05 }}>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => openDialog(b, 'confirmed')}
                            disabled={loadingId === b.id}
                          >
                            Confirm
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale:1.05 }}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => openDialog(b, 'declined')}
                            disabled={loadingId === b.id}
                          >
                            Decline
                          </Button>
                        </motion.div>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
    </Box>
  )
}