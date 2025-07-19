'use client'

import dynamic from 'next/dynamic'
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'
import {
  School,
  Psychology,
  TrendingUp,
  Language,
  StarRate,
} from '@mui/icons-material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PayButton from '~/components/PayButton'
import HeroVideo from '~/components/HeroVideo'
import StoryTimeline from '~/components/StoryTimeline'
import AlumniShowcase from '~/components/AlumniShowcase'

const TestimonialsCarousel = dynamic(
  () => import('~/components/TestimonialsCarousel'),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      {/* Full-screen Lottie hero */}
      <HeroVideo mode="lottie" />

      {/* Interactive “Our Journey” timeline */}
      <StoryTimeline />

      {/* Success Stories Carousel (client-only) */}
      <TestimonialsCarousel />

      {/* Alumni Projects Grid */}
      <AlumniShowcase />

      {/* Main Landing Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Ownership & Mission Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            Your Online Bible School
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
          >
            This isn’t just a course platform—it’s{' '}
            <strong>your</strong> academy. You hold the keys to every lesson,
            every insight, every breakthrough. Power through our curriculum,
            unlock your calling, supercharge your faith, and advance your
            dreams.
          </Typography>

          <List
            sx={{
              display: 'inline-block',
              textAlign: 'left',
              maxWidth: 480,
              width: '100%',
            }}
          >
            {[
              'Step into your superhero role with expert-led Bible courses.',
              'Earn badges and certificates to showcase milestones.',
              'Join a community of learners on the same mission.',
              'Apply Scripture insights to boost academics and calling.',
            ].map((text) => (
              <ListItem key={text} disableGutters>
                <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <PayButton currency="KES" amount={29900}>
              Join Now – KSh 299
            </PayButton>
            <PayButton currency="EUR" amount={2999}>
              Join Now – €29.99
            </PayButton>
            <PayButton currency="USD" amount={2999}>
              Join Now – $29.99
            </PayButton>
            <Button
              component="a"
              href="#features"
              variant="text"
              sx={{ mt: { xs: 1, sm: 0 } }}
            >
              Explore Features →
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Features Section */}
        <Box id="features" sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Why Choose Mine the Word?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)' },
                }}
              >
                <Psychology color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  AI-Powered Learning
                </Typography>
                <Typography color="text.secondary">
                  Algorithms adapt to your pace, providing personalized
                  recommendations and insights.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)' },
                }}
              >
                <TrendingUp color="secondary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Track Progress
                </Typography>
                <Typography color="text.secondary">
                  Detailed analytics and progress tracking keep you motivated.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)' },
                }}
              >
                <Language color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Multi-Language Support
                </Typography>
                <Typography color="text.secondary">
                  Learn in your preferred language with native-speaker resources.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* What You'll Master Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            What You'll Master
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                icon: <School />,
                title: 'Vocabulary Building',
                desc: 'Expand your word power with contextual learning.',
              },
              {
                icon: <MenuBookIcon />,
                title: 'Reading Comprehension',
                desc: 'Develop deep understanding of complex texts.',
              },
              {
                icon: <StarRate />,
                title: 'Writing Excellence',
                desc: 'Craft compelling, clear written communication.',
              },
              {
                icon: <Psychology />,
                title: 'Critical Thinking',
                desc: 'Analyze and interpret language with precision.',
              },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box sx={{ mr: 3, color: 'primary.main', '& svg': { fontSize: 32 } }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final Call to Action */}
        <Paper
          elevation={6}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(135deg, #5d4037 0%, #8d6e63 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Ready to Become a Word Hero?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9, maxWidth: 500, mx: 'auto' }}
          >
            Claim your power in the Word. Start your journey today!
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <PayButton currency="KES" amount={29900}>
              Start – KSh 299
            </PayButton>
            <PayButton currency="EUR" amount={2999}>
              Start – €29.99
            </PayButton>
            <PayButton currency="USD" amount={2999}>
              Start – $29.99
            </PayButton>
          </Stack>
        </Paper>
      </Container>
    </>
  )
}