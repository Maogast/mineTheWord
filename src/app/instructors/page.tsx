// src/app/instructors/page.tsx

import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Stack,
  Button,
  Link,
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

interface Instructor {
  name: string
  title: string
  image: string
  bio: string
  linkedIn?: string
  twitter?: string
}

const instructors: Instructor[] = [
  {
    name: 'Steve Rundu',
    title: 'Lead Instructor',
    image: '/instructors/john-doe.jpg',
    bio: 'Steve has 15 years of ministry experience, teaching biblical languages and theology. He’s passionate about unlocking scripture’s deeper meaning for every student.',
    linkedIn: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
  },
  {
    name: 'Villy Romenia',
    title: 'Senior Educator',
    image: '/instructors/jane-smith.jpg',
    bio: 'Villy specializes in interactive pedagogy and community engagement. She designs courses that turn complex concepts into everyday applications.',
    linkedIn: 'https://linkedin.com/in/janesmith',
    twitter: 'https://twitter.com/janesmith',
  },
  {
    name: 'Pastor Wamalika',
    title: 'Curriculum Developer',
    image: '/instructors/wamalika.jpg',
    bio: 'Wamalika crafts our superhero-style learning paths. With a background in instructional design, he ensures each lesson helps you level up your faith and skills.',
    linkedIn: 'https://linkedin.com/in/michaellee',
    twitter: 'https://twitter.com/michaellee',
  },
]

export default function InstructorsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
        Meet Our Instructors
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 6 }}
      >
        Our team of experts is here to guide you every step of the way.
      </Typography>

      <Grid container spacing={4}>
        {instructors.map((inst) => (
          <Grid item xs={12} sm={6} md={4} key={inst.name}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                height="240"
                image={inst.image}
                alt={inst.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  <Avatar
                    src={inst.image}
                    alt={inst.name}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="h6">{inst.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {inst.title}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  sx={{ flexGrow: 1 }}
                >
                  {inst.bio}
                </Typography>

                <Stack direction="row" spacing={1}>
                  {inst.linkedIn && (
                    <Link href={inst.linkedIn} target="_blank" rel="noopener">
                      <LinkedInIcon color="primary" />
                    </Link>
                  )}
                  {inst.twitter && (
                    <Link href={inst.twitter} target="_blank" rel="noopener">
                      <TwitterIcon color="primary" />
                    </Link>
                  )}
                </Stack>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  href={`/instructors/${inst.name
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                >
                  View Profile
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}