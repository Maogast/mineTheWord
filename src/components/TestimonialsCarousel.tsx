// src/components/TestimonialsCarousel.tsx
'use client'

import dynamic from 'next/dynamic'
import { Box, Card, CardContent, Avatar, Typography } from '@mui/material'
import { testimonials } from '@/data/testimonials'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// only import Slider in the browser
const Slider = dynamic(() => import('react-slick'), { ssr: false })

export default function TestimonialsCarousel() {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    dots: true,
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Success Stories
      </Typography>

      <Slider {...settings}>
        {testimonials.map((t) => (
          <Box key={t.id} px={{ xs: 2, sm: 4 }}>
            <Card
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                p: 4,
                borderRadius: 3,
              }}
            >
              <Avatar
                src={t.photo}
                alt={t.name}
                sx={{
                  width: 96,
                  height: 96,
                  mr: { sm: 3 },
                  mb: { xs: 2, sm: 0 },
                }}
              />
              <CardContent>
                <Typography variant="h6">{t.name}</Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {t.course}
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  “{t.quote}”
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  )
}