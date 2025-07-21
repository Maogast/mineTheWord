// src/app/courses/[id]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  Container,
  Typography,
  Box,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PayButton from '~/components/PayButton'
import { courses, type Course } from '~/data/courses'

interface Props {
  params: { id: string }
}

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }))
}

export default function CourseDetail({ params }: Props) {
  const course: Course | undefined = courses.find((c) => c.id === params.id)
  if (!course) notFound()

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        {course.title}
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 200, sm: 300, md: 400 },
          mb: 4,
        }}
      >
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>

      <Typography variant="body1" paragraph>
        {course.description}
      </Typography>

      {course.features && course.features.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            What You’ll Learn
          </Typography>
          <List>
            {course.features.map((feat, i) => (
              <ListItem key={i} disableGutters>
                <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                  <CheckCircleIcon />
                </ListItemIcon>
                <ListItemText primary={feat} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">
          {course.currency}{' '}
          {(course.price / 100).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}
        </Typography>

        <PayButton
          currency={course.currency}
          amount={course.price}
          stripePriceId={course.stripePriceId}
        >
          Enroll Now
        </PayButton>
      </Stack>
    </Container>
  )
}