import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// 1️⃣ Your metadata export
export const metadata: Metadata = createMetadata({
  title: 'Mission',
  description:
    'Equipping believers to mine the depths of the Word and shine its light to the world.',
  path: '/mission',
  image: '/og/mission.png',
})

// 2️⃣ Dynamically load the client component (no `motion` import here!)
const MissionContent = dynamic(() => import('~/components/MissionContent'), {
  ssr: false,
})

export default function MissionPage() {
  return <MissionContent />
}