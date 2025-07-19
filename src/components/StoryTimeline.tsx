// src/components/StoryTimeline.tsx
import { Box, Tooltip, Typography } from '@mui/material'
import { timelineData } from '~/data/timelineData'

export default function StoryTimeline() {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.paper',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: 160,
          width: 'max-content',
          mx: 'auto',
          px: 2,
        }}
      >
        {timelineData.map((item, i) => (
          <Box
            key={i}
            sx={{
              position: 'relative',
              textAlign: 'center',
              width: 120,
              flexShrink: 0,
            }}
          >
            <Tooltip
              title={<Typography sx={{ color: '#fff' }}>{item.tooltip}</Typography>}
              placement="top"
              arrow
            >
              <Box
                component="span"
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>

            {/* connector line */}
            {i < timelineData.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 7,
                  left: '100%',
                  width: 80,
                  height: 2,
                  bgcolor: 'divider',
                  ml: 1,
                }}
              />
            )}

            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              {item.year}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}