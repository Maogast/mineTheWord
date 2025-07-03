// src/data/alumni.ts
export interface Alumni {
  id: string
  name: string
  image: string
  project: string
  link?: string
}

export const alumni: Alumni[] = [
  {
    id: 'a1',
    name: 'Peter Kimani',
    image: '/alumni/peter.jpg',
    project: 'Youth Discipleship App',
    link: 'https://github.com/peterkimani/disciple-app',
  },
  {
    id: 'a2',
    name: 'Linda Wanjiku',
    image: '/alumni/linda.jpg',
    project: 'Community Bible Podcast',
    link: 'https://podcasts.example.com/linda-wanjiku',
  },
  {
    id: 'a3',
    name: 'David Mwero',
    image: '/alumni/david.jpg',
    project: 'Scripture Art Exhibit',
    link: 'https://instagram.com/scripture.art',
  },
]