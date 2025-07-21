'use client'

import { useState, useEffect } from 'react'
import { db } from '~/lib/firebaseClient'
import { collection, onSnapshot, DocumentData } from 'firebase/firestore'

export interface Provider {
  id: string          // Firestore doc ID (slug)
  userId: string      // Firebase Auth UID
  displayName: string
  type: string
  subscribed: boolean
  photoURL: string
  bio: string
  email?: string
}

/**
 * Streams your list of providers.
 */
export function useProviders(): Provider[] {
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'providers'), (snap) => {
      const arr = snap.docs.map((d) => {
        const data = d.data() as DocumentData
        return {
          id: d.id,
          userId: data.userId,
          displayName: data.displayName,
          type: data.type,
          subscribed: data.subscribed,
          photoURL: data.photoURL,
          bio: data.bio,
          email: data.email,
        } as Provider
      })
      setProviders(arr)
    })
    return () => unsub()
  }, [])

  return providers
}