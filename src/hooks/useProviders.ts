// src/hooks/useProviders.ts
import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '~/lib/firebaseClient'

export interface Provider {
  id: string
  displayName: string
  type: string
  photoURL?: string
}

export function useProviders() {
  const [list, setList] = useState<Provider[]>([])
  useEffect(() => {
    const q = query(collection(db, 'providers'), where('subscribed','==',true))
    return onSnapshot(q, snap => 
      setList(snap.docs.map(d => ({ id: d.id, ...d.data() }) as Provider))
    )
  }, [])
  return list
}