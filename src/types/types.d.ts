// ── Allow imports like `import { auth } from '~/lib/firebaseClient'`
declare module '~/*'

// ── Your existing firebase-admin augmentation
declare module 'firebase-admin' {
  interface ServiceAccount {
    projectId?: string
    clientEmail?: string
    privateKey?: string
  }
}