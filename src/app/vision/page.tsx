import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// ① Export full Metadata for SEO & social previews
export const metadata: Metadata = createMetadata({
  title: 'Vision',
  description:
    'Learn about our vision to build a global network of faith-filled learners and leaders impacting the world for Christ.',
  path: '/vision',
  image: '/og/vision.png',
})

// ② Dynamically load the client-only UI
const VisionContent = dynamic(() => import('~/components/VisionContent'), {
  ssr: false,
})

export default function VisionPage() {
  return <VisionContent />
}