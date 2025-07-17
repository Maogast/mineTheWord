// src/components/HeroVideo.tsx
'use client'

import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import Lottie from 'lottie-react'

type HeroVideoProps = {
  mode?: 'video' | 'lottie'
}

export default function HeroVideo({ mode = 'video' }: HeroVideoProps) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    if (mode === 'lottie') {
      fetch('/lottie/bible-study.json')
        .then((res) => res.json())
        .then(setAnimationData)
        .catch(console.error)
    }
  }, [mode])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {mode === 'video' && (
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      {mode === 'lottie' && animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120%',
            height: '120%',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Overlay for contrast */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
      />

      {/* Centered Text */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'common.white',
          px: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Our Story Begins Here
        </Typography>
        <Typography variant="h6">
          From humble beginnings to empowering heroes of faith.
        </Typography>
      </Box>
    </Box>
  )
}