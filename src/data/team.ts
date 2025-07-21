export type TeamMember = {
  id: string
  name: string
  role: string
  image: string          // path under /public/images/team/
  whatsapp: string       // WhatsApp deep-link (https://wa.me/...)
  social: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  quote: string          // short testimonial
}

export const team: TeamMember[] = [
  {
    id: 'steve-rundu',
    name: 'Steve Rundu',
    role: 'Founder & President',
    image: '/images/team/john-doe.jpg',
    whatsapp: 'https://wa.me/1234567890',
    social: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
    },
    quote: 'Empowering every student to grow in faith and knowledge is our highest calling.',
  },
  {
    id: 'brenda-kimetto',
    name: 'Brenda Kimetto',
    role: 'Academic Dean',
    image: '/images/team/jane-smith.jpg',
    whatsapp: 'https://wa.me/1234567891',
    social: {
      twitter: 'https://twitter.com/janesmith',
      facebook: 'https://facebook.com/janesmith',
      instagram: 'https://instagram.com/janesmith',
    },
    quote: 'Our curriculum blends rigorous study with real-world application for lasting impact.',
  },
  {
    id: 'pastor-stephen-magare',
    name: 'Pastor Stephen Magare',
    role: 'Spiritual Director',
    image: '/team/steve-magare.jpg',
    whatsapp: 'https://wa.me/254705001193',
    social: {
      facebook: 'https://facebook.com/pastorstephenmagare',
      instagram: 'https://instagram.com/pastorstephenmagare',
    },
    quote: 'Walking with Jesus transforms the heart—and that’s what we aim for here.',
  },
  {
    id: 'mary-neri',
    name: 'Mary Njeri',
    role: 'Student Advisor',
    image: '/images/team/mary-neri.jpg',
    whatsapp: 'https://wa.me/254700000002',
    social: {
      twitter: 'https://twitter.com/maryneri',
      linkedin: 'https://linkedin.com/in/maryneri',
    },
    quote: 'I love seeing students discover their unique calling through our programs.',
  },
  {
    id: 'steve-magare',
    name: 'Steve Magare',
    role: 'IT Specialist',
    image: '/team/steve-magare.jpg',
    whatsapp: 'https://wa.me/254745325480',
    social: {
      linkedin: 'https://linkedin.com/in/michaelotieno',
    },
    quote: 'Building seamless, reliable systems frees you to focus on what matters most.',
  },
  {
    id: 'grace-wanjiru',
    name: 'Grace Wanjiru',
    role: 'Marketing Manager',
    image: '/images/team/grace-wanjiru.jpg',
    whatsapp: 'https://wa.me/254700000004',
    social: {
      instagram: 'https://instagram.com/gracewanjiru',
      facebook: 'https://facebook.com/gracewanjiru',
    },
    quote: 'Storytelling connects hearts—our marketing is all about authentic community.',
  },
]