import { createTheme } from '@mui/material/styles'
import { Inter, Fira_Code } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})
export const fira = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const theme = createTheme({
  palette: {
    primary: { light: '#8d6e63', main: '#5d4037', dark: '#3e2723' },
    secondary: { light: '#ffd54f', main: '#ffc107', dark: '#ff8f00' },
    background: { default: '#fafafa', paper: '#ffffff' },
    text: { primary: '#212121', secondary: '#757575' },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
})

export default theme