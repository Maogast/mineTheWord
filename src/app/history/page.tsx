import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// ① Metadata
export const metadata: Metadata = createMetadata({
  title: 'History',
  description:
    'Trace the journey of Mine the Word Academy from its founding in 2015 through key milestones to today.',
  path: '/history',
  image: '/og/history.png',
})

// ② Dynamic client import
const HistoryContent = dynamic(() => import('~/components/HistoryContent'), {
  ssr: false,
})

export default function HistoryPage() {
  return <HistoryContent />
}