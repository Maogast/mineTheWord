import { NextRequest, NextResponse } from 'next/server'
import { courses } from '@/data/courses'
import type { Course } from '@/data/courses'

/**
 * GET /api/course
 * Returns a static list of courses from src/data/courses.ts
 */
export async function GET(_: NextRequest) {
  return NextResponse.json({
    success: true,
    count: courses.length,
    courses,
  })
}

/**
 * POST /api/course
 * Disabled in static mode — returns 405 Method Not Allowed
 */
export async function POST(_: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Course creation disabled (static mode)' },
    { status: 405 }
  )
}