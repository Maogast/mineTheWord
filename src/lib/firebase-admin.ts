import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore }                  from 'firebase-admin/firestore'

const svc = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : undefined

if (!getApps().length) {
  initializeApp({
    credential: svc ? cert(svc) : undefined,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
}

export const adminDb = getFirestore()