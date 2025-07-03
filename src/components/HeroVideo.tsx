// src/components/HeroVideo.tsx
import { Box, Typography } from '@mui/material'

export default function HeroVideo() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <video
        src="/videos/hero.mp4"      // ← put your 60s video here
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Optional dark overlay for text contrast */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.4)',
        }}
      />

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