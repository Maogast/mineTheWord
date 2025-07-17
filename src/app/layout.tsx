'use client'

import Head from 'next/head'
import { ThemeProvider, CssBaseline, Box, Toolbar } from '@mui/material'
import theme, { inter, fira } from '../theme'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fira.variable}`}>
      <Head>
        <title>Mine the Word Academy</title>
        <meta name="description" content="Your journey into the Word starts here." />
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* fixed navbar */}
          <Navbar />

          {/* spacer equal to AppBar height */}
          <Toolbar />

          {/* page content */}
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>

          {/* site-wide footer */}
          <Footer />

          {/* back-to-top button */}
          <ScrollTop />
        </ThemeProvider>
      </body>
    </html>
  )
}