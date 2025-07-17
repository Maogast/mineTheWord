'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { courses as staticCourses } from '@/data/courses'
import RegistrationForm from './RegistrationForm'

type SimpleCourse = { id: string; title: string }

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openReg, setOpenReg] = useState(false)
  const openMenu = Boolean(anchorEl)

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1} sx={{ zIndex: (t) => t.zIndex.appBar }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Image src="/logo.png" width={40} height={40} alt="Logo" />
          </Box>

          {/* Links */}
          <Box>
            <Button color="inherit" onClick={handleMenuOpen} sx={{ mx: 1 }}>
              Courses
            </Button>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
              {staticCourses.map((c) => (
                <MenuItem
                  key={c.id}
                  component={Link}
                  href={`/courses/${c.id}`}
                  onClick={handleMenuClose}
                >
                  {c.title}
                </MenuItem>
              ))}
            </Menu>

            {[
              { label: 'Home', href: '/' },
              { label: 'Instructors', href: '/instructors' },
              { label: 'Dashboard', href: '/dashboard' },
            ].map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{ mx: 1 }}
              >
                {item.label}
              </Button>
            ))}

            <Button component={Link} href="/donate" color="secondary" variant="contained" sx={{ ml: 2 }}>
              Donate
            </Button>

            {/* Register Button */}
            <Button
              color="inherit"
              onClick={() => setOpenReg(true)}
              sx={{ textTransform: 'none', mx: 1 }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Registration Dialog */}
      <Dialog
        open={openReg}
        onClose={() => setOpenReg(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Student Registration
          <IconButton
            aria-label="close"
            onClick={() => setOpenReg(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <RegistrationForm />
        </DialogContent>
      </Dialog>
    </>
  )
}