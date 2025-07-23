'use client'

import Link from 'next/link'
import { Grid, Card, CardContent, Avatar, Typography, Button, Box } from '@mui/material'
import { useProviders, Provider } from '~/hooks/useProviders'

export default function ProvidersContent() {
  const providers = useProviders()

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {providers.map((p: Provider) => (
          <Grid key={p.id} item xs={12} sm={6} md={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar src={p.photoURL} sx={{ mx: 'auto', mb: 2, width: 80, height: 80 }} />
                <Typography variant="h6">{p.displayName}</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {p.type}
                </Typography>
                <Button
                  component={Link}
                  href={`/providers/${p.id}`}
                  variant="contained"
                  size="small"
                >
                  View & Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}