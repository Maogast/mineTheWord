// src/app/courses/page.tsx

import { courses } from '@/data/courses'
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material'
import PayButton from '@/components/PayButton'

export const metadata = {
  title: 'Our Courses – Mine the Word Academy',
}

export default function CoursesPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h2" gutterBottom textAlign="center">
        Our Courses
      </Typography>

      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.image}
                alt={course.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}
              >
                <Typography variant="subtitle1">
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
                  Enroll
                </PayButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}