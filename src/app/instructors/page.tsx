import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// ① Metadata for the Instructors listing page
export const metadata: Metadata = createMetadata({
  title: 'Instructors',
  description:
    'Meet the scholars and ministry leaders who guide our courses and empower your spiritual growth.',
  path: '/instructors',
  image: '/og/instructors.png',
})

// ② Dynamically load the client‐only UI
const InstructorsContent = dynamic(() => import('~/components/InstructorsContent'), {
  ssr: false,
})

export default function InstructorsPage() {
  return <InstructorsContent />
}