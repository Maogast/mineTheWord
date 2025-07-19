// src/app/providers/page.tsx
'use client'
import { Grid, Card, CardContent, Avatar, Typography, Button } from '@mui/material'
import Link from 'next/link'
import { useProviders } from '~/hooks/useProviders'

export default function ProvidersPage() {
  const providers = useProviders()
  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {providers.map(p => (
        <Grid key={p.id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent sx={{ textAlign:'center' }}>
              <Avatar src={p.photoURL} sx={{ mx:'auto', mb:2 }} />
              <Typography variant="h6">{p.displayName}</Typography>
              <Typography color="text.secondary">{p.type}</Typography>
              <Button component={Link} href={`/providers/${p.id}`} sx={{ mt:2 }}>
                View & Book
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}