import { Metadata } from 'next'

const SITE_NAME = 'Mine the Word Academy'
const BASE_URL = 'https://mine-the-word.academy'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/default.png`

export function createMetadata(options: {
  title: string
  description: string
  path?: string            // e.g. '/courses'
  image?: string           // full URL or path under /public
}): Metadata {
  const {
    title,
    description,
    path = '',
    image = DEFAULT_OG_IMAGE,
  } = options

  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: image,
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  }
}