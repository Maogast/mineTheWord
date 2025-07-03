// src/components/AlumniShowcase.tsx
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material'
import { alumni } from '@/data/alumni'

export default function AlumniShowcase() {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Alumni in Action
      </Typography>

      <Grid container spacing={4}>
        {alumni.map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Card
              elevation={2}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-6px)' },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={a.image}
                alt={a.name}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{a.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {a.project}
                </Typography>
              </CardContent>

              {a.link && (
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    href={a.link}
                    target="_blank"
                    rel="noopener"
                    fullWidth
                  >
                    View Project
                  </Button>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}