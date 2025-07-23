import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { createMetadata } from '~/lib/metadata'

type Params = { params: { id: string } }

// 1️⃣ Dynamic Metadata for this provider
export async function generateMetadata({ params: { id } }: Params): Promise<Metadata> {
  return createMetadata({
    title: `Book Provider`,
    description:
      'Schedule a one-on-one session with our expert instructors at Mine the Word Academy.',
    path: `/providers/${id}`,
    image: '/og/providers.png',
  })
}

// 2️⃣ Dynamically import your client component and type its props
const ProviderDetailContent = dynamic<
  { params: { id: string } }
>(() => import('~/components/ProviderDetailContent'), {
  ssr: false,
})

export default function ProviderDetailPage({ params }: Params) {
  // TS now knows ProviderDetailContent takes a `params` prop
  return <ProviderDetailContent params={params} />
}