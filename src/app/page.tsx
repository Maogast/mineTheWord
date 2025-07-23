import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

// ① Full metadata export for SEO & social
export const metadata: Metadata = createMetadata({
  title: 'Home',
  description:
    'Welcome to Mine the Word Academy—your faith-driven online Bible school for rigorous study, community, and spiritual formation.',
  path: '/',
  image: '/og/home.png',
})

// ② Dynamically load the client-only UI
const HomeContent = dynamic(() => import('~/components/HomeContent'), {
  ssr: false,
})

export default function HomePage() {
  return <HomeContent />
}