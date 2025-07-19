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
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { motion } from 'framer-motion'
import AnimatedNavLink from '~/components/AnimatedNavLink'
import RegistrationForm from './RegistrationForm'
import { courses as staticCourses } from '~/data/courses'

export default function Navbar() {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openReg, setOpenReg] = useState(false)
  const openMenu = Boolean(anchorEl)

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1}
              sx={{ zIndex: (t) => t.zIndex.appBar }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box component={Link} href="/" sx={{
            display: 'flex', alignItems: 'center', color: 'inherit'
          }}>
            <Image src="/logo.png" width={40} height={40} alt="Logo" />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Courses menu */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05, color: theme.palette.secondary.main }}
              whileTap={{ scale: 0.95 }}
              sx={{ display: 'inline-block', mx: 1 }}
            >
              <Button onClick={handleMenuOpen} color="inherit">
                Courses
              </Button>
            </Box>
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

            {/* Core links */}
            <AnimatedNavLink href="/" label="Home" />
            <AnimatedNavLink href="/providers" label="Providers" />
            <AnimatedNavLink href="/instructors" label="Instructors" />
            <AnimatedNavLink href="/dashboard" label="Dashboard" />
            <AnimatedNavLink href="/my-bookings" label="My Bookings" />

            {/* Donate */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ display: 'inline-block', ml: 2 }}
            >
              <Button
                component={Link}
                href="/donate"
                variant="contained"
                color="secondary"
                sx={{ textTransform: 'none' }}
              >
                Donate
              </Button>
            </Box>

            {/* Register */}
            <Box
              component={motion.div}
              whileHover={{
                scale: 1.1,
                backgroundColor: theme.palette.secondary.main,
              }}
              whileTap={{ scale: 0.9 }}
              sx={{ display: 'inline-block', mx: 1 }}
            >
              <Button
                onClick={() => setOpenReg(true)}
                sx={{ textTransform: 'none', color: 'inherit' }}
              >
                Register
              </Button>
            </Box>
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