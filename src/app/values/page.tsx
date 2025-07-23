import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// ① Metadata
export const metadata: Metadata = createMetadata({
  title: 'Values',
  description:
    'Explore the core values—integrity, excellence, community, and faith—that guide everything we do.',
  path: '/values',
  image: '/og/values.png',
})

// ② Dynamic client import
const ValuesContent = dynamic(() => import('~/components/ValuesContent'), {
  ssr: false,
})

export default function ValuesPage() {
  return <ValuesContent />
}