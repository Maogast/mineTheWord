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

// Primary links
const mainLinks = [{ href: '/', label: 'Home' }]

// Providers dropdown items
const providersItems = [
  { href: '/providers', label: 'All Providers' },
  { href: '/my-bookings', label: 'My Bookings' },
]

// Dashboard link
const dashboardLink = { href: '/dashboard', label: 'Dashboard' }

// About dropdown (no more 'Instructors')
const aboutItems = [
  { href: '/mission', label: 'Mission' },
  { href: '/vision', label: 'Vision' },
  { href: '/values', label: 'Values' },
  { href: '/history', label: 'History' },
]

export default function Navbar() {
  const theme = useTheme()

  // Menu anchors
  const [anchorCourses, setAnchorCourses] = useState<HTMLElement | null>(null)
  const [anchorProviders, setAnchorProviders] = useState<HTMLElement | null>(null)
  const [anchorTeam, setAnchorTeam] = useState<HTMLElement | null>(null)
  const [anchorAbout, setAnchorAbout] = useState<HTMLElement | null>(null)

  const openCourses = Boolean(anchorCourses)
  const openProviders = Boolean(anchorProviders)
  const openTeam = Boolean(anchorTeam)
  const openAbout = Boolean(anchorAbout)

  // Registration dialog
  const [openReg, setOpenReg] = useState(false)

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1} sx={{ zIndex: t => t.zIndex.appBar }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* LEFT: Logo + Home + Providers + Dashboard + Team + About */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', color: 'inherit', mr: 2 }}>
              <Image src="/logo.png" width={40} height={40} alt="Logo" />
            </Box>

            {/* Home */}
            {mainLinks.map(link => (
              <AnimatedNavLink key={link.href} href={link.href} label={link.label} />
            ))}

            {/* Providers menu */}
            <Button onClick={e => setAnchorProviders(e.currentTarget)} color="inherit" sx={{ mx: 1 }}>
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
            <Box sx={{ mx: 1 }}>
              <AnimatedNavLink href={dashboardLink.href} label={dashboardLink.label} />
            </Box>

            {/* Team dropdown */}
            <Button onClick={e => setAnchorTeam(e.currentTarget)} color="inherit" sx={{ mx: 1 }}>
              Team
            </Button>
            <Menu anchorEl={anchorTeam} open={openTeam} onClose={() => setAnchorTeam(null)}>
              <MenuItem component={Link} href="/team" onClick={() => setAnchorTeam(null)}>
                Team Members
              </MenuItem>
              <MenuItem component={Link} href="/instructors" onClick={() => setAnchorTeam(null)}>
                Instructors
              </MenuItem>
            </Menu>

            {/* About menu */}
            <Button onClick={e => setAnchorAbout(e.currentTarget)} color="inherit" sx={{ mx: 1 }}>
              About
            </Button>
            <Menu anchorEl={anchorAbout} open={openAbout} onClose={() => setAnchorAbout(null)}>
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

          {/* RIGHT: Courses + Search + Donate + Register */}
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

            {/* Search */}
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

            {/* Register */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  `0 0 0 0 ${theme.palette.secondary.main}55`,
                  `0 0 10px 10px ${theme.palette.secondary.main}`,
                  `0 0 0 0 ${theme.palette.secondary.main}55`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1 }}
            >
              <Button onClick={() => setOpenReg(true)} color="inherit" sx={{ textTransform: 'none' }}>
                Register
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Toolbar spacer */}
      <ToolbarSpacer />

      {/* Registration Dialog */}
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