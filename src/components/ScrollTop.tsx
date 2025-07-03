// src/components/ScrollTop.tsx
'use client'

import { useState, useEffect } from 'react'
import { Fab, Zoom } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const footer = document.getElementById('footer')
      if (!footer) return
      const footerTop = footer.getBoundingClientRect().top
      setVisible(footerTop <= window.innerHeight)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Zoom in={visible}>
      <Fab
        onClick={handleClick}
        color="primary"
        size="medium"
        aria-label="scroll back to top"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: (theme) => theme.zIndex.tooltip,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}