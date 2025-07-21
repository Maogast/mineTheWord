'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '~/lib/firebaseClient'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  DocumentData,
} from 'firebase/firestore'

export interface Booking {
  id: string
  providerId: string
  requesterId?: string
  requesterName: string
  requesterEmail: string
  requesterPhone?: string
  date: Timestamp
  startTime: string
  status: 'pending' | 'confirmed' | 'declined'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type NewBookingData = {
  providerId: string
  requesterName: string
  requesterEmail: string
  requesterPhone?: string
  date: Date | Timestamp
  startTime: string
}

/**
 * Streams “Incoming” (asProvider=true) or “Outgoing”
 * (asProvider=false) bookings for the current signed-in user.
 */
export function useMyBookings(asProvider = false): Booking[] {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const uid = auth.currentUser?.uid
    if (!uid) return

    const field = asProvider ? 'providerId' : 'requesterId'
    const q = query(collection(db, 'bookings'), where(field, '==', uid))

    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map((d) => {
        const data = d.data() as DocumentData
        return {
          id: d.id,
          providerId: data.providerId,
          requesterId: data.requesterId,
          requesterName: data.requesterName,
          requesterEmail: data.requesterEmail,
          requesterPhone: data.requesterPhone,
          date: data.date,
          startTime: data.startTime,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        } as Booking
      })
      setBookings(arr)
    })

    return () => unsub()
  }, [asProvider])

  return bookings
}

/**
 * Creates a booking. Any visitor can call.
 * If signed in, attaches their UID as `requesterId`.
 */
export async function createBooking(data: NewBookingData): Promise<string> {
  // Convert date to Firestore Timestamp
  const dateTs =
    data.date instanceof Date ? Timestamp.fromDate(data.date) : data.date
  const now = Timestamp.now()

  const payload: any = {
    providerId: data.providerId,
    requesterName: data.requesterName,
    requesterEmail: data.requesterEmail,
    date: dateTs,
    startTime: data.startTime,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }
  if (data.requesterPhone) {
    payload.requesterPhone = data.requesterPhone
  }

  // If a user is signed in, tag them
  const uid = auth.currentUser?.uid
  if (uid) {
    payload.requesterId = uid
  }

  const docRef = await addDoc(collection(db, 'bookings'), payload)
  return docRef.id
}

/**
 * Updates booking status via your Next.js API route,
 * which also sends the approval/decline email.
 */
export async function updateBookingStatus(
  bookingId: string,
  status: 'confirmed' | 'declined'
): Promise<void> {
  const res = await fetch('/api/update-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId, status }),
  })
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Unknown API error')
}