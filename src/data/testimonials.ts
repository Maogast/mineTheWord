// src/data/testimonials.ts
export interface Testimonial {
  id: string
  name: string
  photo: string
  course: string
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alice Mwangi',
    photo: '/testimonials/alice.jpg',
    course: 'Bible Language Basics',
    quote:
      'After finishing this course, I’m now leading our church Bible study group with confidence!',
  },
  {
    id: '2',
    name: 'Samuel Otieno',
    photo: '/testimonials/samuel.jpg',
    course: 'Advanced Exegesis',
    quote:
      'The methods I learned transformed my academic research—and I got published in two journals.',
  },
  {
    id: '3',
    name: 'Grace Njeri',
    photo: '/testimonials/grace.jpg',
    course: 'Missionary Prep Track',
    quote:
      'I launched a community outreach program in Tanzania using classroom strategies from Mine the Word.',
  },
]