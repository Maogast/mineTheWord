import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// page‐level metadata
export const metadata: Metadata = createMetadata({
  title: 'Donate',
  description:
    'Support Mine the Word Academy—your gift helps us train the next generation of Scripture teachers and missionaries.',
  path: '/donate',
  image: '/og/donate.png',
})

// dynamically inject the single client component
const DonateForm = dynamic(() => import('~/components/DonateForm'), {
  ssr: false,
})

export default function DonatePage() {
  return <DonateForm />
}