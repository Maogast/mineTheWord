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
  Toolbar as ToolbarSpacer,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { motion } from 'framer-motion'
import AnimatedNavLink from './AnimatedNavLink'
import SearchAutocomplete from './SearchAutocomplete'
import RegistrationForm from './RegistrationForm'
import { courses as staticCourses } from '~/data/courses'

// Left‐side primary links
const mainLinks = [{ href: '/', label: 'Home' }]
// Providers dropdown (holds All Providers & My Bookings)
const providersItems = [
  { href: '/providers', label: 'All Providers' },
  { href: '/my-bookings', label: 'My Bookings' },
]
// Dashboard link
const dashboardLink = { href: '/dashboard', label: 'Dashboard' }
// About dropdown
const aboutItems = [
  { href: '/mission', label: 'Mission' },
  { href: '/vision', label: 'Vision' },
  { href: '/values', label: 'Values' },
  { href: '/history', label: 'History' },
  { href: '/instructors', label: 'Instructors' },
]

export default function Navbar() {
  const theme = useTheme()

  // Menu anchors
  const [anchorCourses, setAnchorCourses] = useState<HTMLElement | null>(null)
  const [anchorProviders, setAnchorProviders] = useState<HTMLElement | null>(null)
  const [anchorAbout, setAnchorAbout] = useState<HTMLElement | null>(null)
  const openCourses = Boolean(anchorCourses)
  const openProviders = Boolean(anchorProviders)
  const openAbout = Boolean(anchorAbout)

  // Registration Dialog
  const [openReg, setOpenReg] = useState(false)

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1} sx={{ zIndex: t => t.zIndex.appBar }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* LEFT: Logo + Home + Providers menu + Dashboard + About menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{ display: 'flex', alignItems: 'center', color: 'inherit', mr: 2 }}
            >
              <Image src="/logo.png" width={40} height={40} alt="Logo" />
            </Box>

            {/* Home */}
            {mainLinks.map(link => (
              <AnimatedNavLink key={link.href} href={link.href} label={link.label} />
            ))}

            {/* Providers menu */}
            <Button
              onClick={e => setAnchorProviders(e.currentTarget)}
              color="inherit"
              sx={{ mx: 1 }}
            >
              Providers
            </Button>
            <Menu
              anchorEl={anchorProviders}
              open={openProviders}
              onClose={() => setAnchorProviders(null)}
            >
              {providersItems.map(item => (
                <MenuItem
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={() => setAnchorProviders(null)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

            {/* Dashboard */}
            <AnimatedNavLink href={dashboardLink.href} label={dashboardLink.label} />

            {/* About menu */}
            <Button onClick={e => setAnchorAbout(e.currentTarget)} color="inherit" sx={{ mx: 1 }}>
              About
            </Button>
            <Menu
              anchorEl={anchorAbout}
              open={openAbout}
              onClose={() => setAnchorAbout(null)}
            >
              {aboutItems.map(item => (
                <MenuItem
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={() => setAnchorAbout(null)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* RIGHT: Courses + Search + Donate + Glowing Register */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Courses menu */}
            <Button onClick={e => setAnchorCourses(e.currentTarget)} color="inherit" sx={{ mr: 2 }}>
              Courses
            </Button>
            <Menu
              anchorEl={anchorCourses}
              open={openCourses}
              onClose={() => setAnchorCourses(null)}
            >
              {staticCourses.map(c => (
                <MenuItem
                  key={c.id}
                  component={Link}
                  href={`/courses/${c.id}`}
                  onClick={() => setAnchorCourses(null)}
                >
                  {c.title}
                </MenuItem>
              ))}
            </Menu>

            {/* Search Autocomplete */}
            <SearchAutocomplete />

            {/* Donate */}
            <motion.div whileHover={{ scale: 1.05 }} style={{ marginRight: theme.spacing(1) }}>
              <Button
                component={Link}
                href="/donate"
                variant="contained"
                color="secondary"
                sx={{ textTransform: 'none' }}
              >
                Donate
              </Button>
            </motion.div>

            {/* Glowing Register */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  `0 0 0 0 ${theme.palette.secondary.main}55`,
                  `0 0 10px 10px ${theme.palette.secondary.main}`,
                  `0 0 0 0 ${theme.palette.secondary.main}55`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                onClick={() => setOpenReg(true)}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Register
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer so page content isn’t hidden under AppBar */}
      <ToolbarSpacer />

      {/* Student Registration Dialog */}
      <Dialog open={openReg} onClose={() => setOpenReg(false)} fullWidth maxWidth="sm">
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