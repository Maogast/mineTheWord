'use client'

import { useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { TextField, Autocomplete, useTheme } from '@mui/material'
import { motion } from 'framer-motion'

// Alias imports now work thanks to next.config.js + tsconfig.json
import { courses as staticCourses } from '~/data/courses'
import { providers as staticProviders } from '~/data/providers'

// Infer each array’s item type
type CourseOption = typeof staticCourses[number]
type ProviderOption = typeof staticProviders[number]

// Unified shape for dropdown options
type Option = {
  label: string
  href: string
  type: 'Course' | 'Provider'
}

export default function SearchAutocomplete() {
  const router = useRouter()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  // Memoize so options aren’t rebuilt on every render
  const options: Option[] = useMemo(() => {
    const courseOpts: Option[] = staticCourses.map((c: CourseOption) => ({
      label: c.title,
      href: `/courses/${c.id}`,
      type: 'Course',
    }))

    const providerOpts: Option[] = staticProviders.map((p: ProviderOption) => ({
      label: p.name,
      href: `/providers/${p.slug}`,
      type: 'Provider',
    }))

    return [...courseOpts, ...providerOpts]
  }, [])

  return (
    <motion.div
      initial={{ width: 200 }}
      animate={{ width: open ? 320 : 200 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{ margin: `0 ${theme.spacing(2)}` }}
    >
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        groupBy={(opt) => opt.type}
        getOptionLabel={(opt) => opt.label}
        size="small"
        fullWidth
        disableClearable
        onChange={(_, value, reason) => {
          if (value && reason === 'selectOption') {
            router.push(value.href)
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              'aria-label': 'Search courses & providers',
            }}
          />
        )}
      />
    </motion.div>
  )
}