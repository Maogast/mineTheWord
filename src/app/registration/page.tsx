import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// Metadata for registration
export const metadata: Metadata = createMetadata({
  title: 'Register',
  description: 'Sign up for a course at Mine the Word Academy.',
  path: '/registration',
  image: '/og/registration.png',
})

// Dynamically import the form (client-only)
const RegistrationForm = dynamic(() => import('~/components/RegistrationForm'), {
  ssr: false,
})

export default function RegistrationPage() {
  return (
    <main>
      <RegistrationForm />
    </main>
  )
}