// define and export the shape of a provider
export interface ProviderOption {
  slug: string
  name: string
}

// now annotate your static array
export const providers: ProviderOption[] = [
  { slug: 'pastor-stephen-magare', name: 'Pastor Stephen Magare' },
  { slug: 'angels-choir', name: 'Angels Choir' },
  { slug: 'mary-bible-student', name: 'Mary Njeri' },
  // …add more here
]