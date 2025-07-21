'use client'

import Image from 'next/image'
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
} from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { motion } from 'framer-motion'
import { team, TeamMember } from '~/data/team'

export default function TeamGrid() {
  return (
    <Grid container spacing={4}>
      {team.map((member: TeamMember) => (
        <Grid item xs={12} sm={6} md={4} key={member.id}>
          <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" align="center">
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  align="center"
                  gutterBottom
                >
                  {member.role}
                </Typography>

                <Typography
                  variant="body2"
                  component="blockquote"
                  sx={{ fontStyle: 'italic', mb: 2 }}
                >
                  "{member.quote}"
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton
                    component="a"
                    href={member.whatsapp}
                    target="_blank"
                    aria-label={`WhatsApp ${member.name}`}
                  >
                    <WhatsAppIcon color="success" />
                  </IconButton>

                  {member.social.twitter && (
                    <IconButton
                      component="a"
                      href={member.social.twitter}
                      target="_blank"
                      aria-label={`${member.name} on Twitter`}
                    >
                      <TwitterIcon />
                    </IconButton>
                  )}

                  {member.social.facebook && (
                    <IconButton
                      component="a"
                      href={member.social.facebook}
                      target="_blank"
                      aria-label={`${member.name} on Facebook`}
                    >
                      <FacebookIcon />
                    </IconButton>
                  )}

                  {member.social.instagram && (
                    <IconButton
                      component="a"
                      href={member.social.instagram}
                      target="_blank"
                      aria-label={`${member.name} on Instagram`}
                    >
                      <InstagramIcon />
                    </IconButton>
                  )}

                  {member.social.linkedin && (
                    <IconButton
                      component="a"
                      href={member.social.linkedin}
                      target="_blank"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )
}