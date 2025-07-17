export type Course = {
  id: string
  title: string
  description: string
  image: string        // path under /public/images/
  price: number        // in cents
  currency: 'USD'|'EUR'|'KES'
  stripePriceId: string
  features: string[]   // ← added
}

export const courses: Course[] = [
  {
    id: 'vocabulary-mastery',
    title: 'Vocabulary Mastery',
    description: 'Build a powerful scriptural vocabulary with interactive exercises.',
    image: '/images/course1.jpg',
    price: 1999,
    currency: 'USD',
    stripePriceId: 'price_1ABC…',
    features: [
      'Interactive vocabulary exercises',
      'Word etymology deep-dives',
      'Progress tracking',
    ],
  },
  {
    id: 'deep-bible-study',
    title: 'Deep Bible Study',
    description: 'Explore historical context, original languages, and practical life applications.',
    image: '/images/course2.jpg',
    price: 2999,
    currency: 'USD',
    stripePriceId: 'price_2DEF…',
    features: [
      'Historical context lessons',
      'Original language insights',
      'Practical application guides',
    ],
  },
  {
    id: 'memory-verse-challenge',
    title: 'Memory Verse Challenge',
    description: 'Learn proven mnemonic techniques to memorize verses quickly.',
    image: '/images/course3.jpg',
    price: 1499,
    currency: 'USD',
    stripePriceId: 'price_3GHI…',
    features: [
      'Mnemonic strategies',
      'Daily recall exercises',
      'Progress badges',
    ],
  },
  {
    id: 'leadership-in-scripture',
    title: 'Leadership in Scripture',
    description: 'Uncover leadership lessons from Biblical characters and their journeys.',
    image: '/images/course4.jpg',
    price: 2499,
    currency: 'USD',
    stripePriceId: 'price_4JKL…',
    features: [
      'Character case studies',
      'Leadership frameworks',
      'Actionable takeaways',
    ],
  },
  {
    id: 'kids-bible-fun',
    title: 'Kids Bible Fun',
    description: 'Engaging lessons and games for your little ones to learn Scripture.',
    image: '/images/course5.jpg',
    price: 999,
    currency: 'USD',
    stripePriceId: 'price_5MNO…',
    features: [
      'Interactive games',
      'Colorful illustrations',
      'Parental guides',
    ],
  },
  {
    id: 'daily-prayer-guides',
    title: 'Daily Prayer Guides',
    description: 'A 30-day devotional journey with guided prayers and reflections.',
    image: '/images/course6.jpg',
    price: 1999,
    currency: 'USD',
    stripePriceId: 'price_6PQR…',
    features: [
      'Daily prompts',
      'Reflective questions',
      'Community sharing',
    ],
  },
  {
    id: 'theology-basics',
    title: 'Theology Basics',
    description: 'Understand core doctrines and how they shape your faith.',
    image: '/images/course7.jpg',
    price: 1799,
    currency: 'USD',
    stripePriceId: 'price_7STU…',
    features: [
      'Core doctrine overviews',
      'Q&A sessions',
      'Further reading lists',
    ],
  },
]