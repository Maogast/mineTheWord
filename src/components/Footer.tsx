import { Box, Container, IconButton, Typography, Stack } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
  return (
    <Box
      id="footer"              // ← anchor for ScrollTop visibility
      component="footer"
      sx={{
        py: 4,
        mt: 8,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Mine the Word Academy. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/company/yourcompany"
              target="_blank"
              rel="noopener"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}