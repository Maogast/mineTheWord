'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Button, useTheme } from '@mui/material'
import { motion, LayoutGroup } from 'framer-motion'

interface NavLinkProps {
  href: string
  label: string
}

export default function AnimatedNavLink({ href, label }: NavLinkProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, color: theme.palette.secondary.main }}
      whileTap={{ scale: 0.9 }}
      sx={{ display: 'inline-block', mx: 1, position: 'relative' }}
    >
      <Button
        component={Link}
        href={href}
        color={isActive ? 'secondary' : 'inherit'}
        sx={{ textTransform: 'none', fontWeight: isActive ? 600 : 500 }}
      >
        {label}
      </Button>

      {isActive && (
        <LayoutGroup>
          <Box
            component={motion.div}
            layoutId="nav-underline"
            sx={{
              position: 'absolute',
              bottom: -2,
              left: 0,
              right: 0,
              height: 3,
              borderRadius: 2,
              bgcolor: 'secondary.main',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </LayoutGroup>
      )}
    </Box>
  )
}