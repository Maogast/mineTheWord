// src/components/Navbar.tsx

import Link from 'next/link'
import Image from 'next/image'
import { AppBar, Toolbar, Box, Button } from '@mui/material'

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={1}
      sx={{ top: 0, zIndex: (theme) => theme.zIndex.appBar }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo on the left */}
        <Link href="/" passHref>
          <Box
            component="a"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Image
              src="/logo.png"
              alt="Mine the Word Academy Logo"
              width={40}
              height={40}
            />
          </Box>
        </Link>

        {/* Navigation links + Donate CTA */}
        <Box>
          {[
            { label: 'Home', href: '/' },
            { label: 'Courses', href: '/courses' },
            { label: 'Instructors', href: '/instructors' },
            { label: 'Dashboard', href: '/dashboard' },
          ].map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              color="inherit"
              sx={{ textTransform: 'none', mx: 1 }}
            >
              {item.label}
            </Button>
          ))}

          {/* Donate button */}
          <Button
            component={Link}
            href="/donate"
            color="secondary"
            variant="contained"
            sx={{ textTransform: 'none', ml: 2 }}
          >
            Donate
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}