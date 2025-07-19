'use client'

import { useState, useEffect } from 'react'
import { auth, db } from '~/lib/firebaseClient'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
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

/**
 * Omit Firestore‐managed fields and allow `date` as Date or Timestamp.
 */
export type NewBookingData = Omit<
  Booking,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'date'
> & {
  date: Date | Timestamp
}

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

export async function createBooking(data: NewBookingData): Promise<string> {
  const dateTs =
    data.date instanceof Date ? Timestamp.fromDate(data.date) : data.date

  const now = Timestamp.now()
  const payload: any = {
    ...data,
    date: dateTs,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }

  // remove undefined fields so Firestore won’t reject
  if (!data.requesterId) delete payload.requesterId
  if (!data.requesterPhone) delete payload.requesterPhone

  const docRef = await addDoc(collection(db, 'bookings'), payload)
  return docRef.id
}

export async function updateBookingStatus(
  bookingId: string,
  status: 'confirmed' | 'declined'
): Promise<void> {
  const ref = doc(db, 'bookings', bookingId)
  await updateDoc(ref, { status, updatedAt: Timestamp.now() })
}