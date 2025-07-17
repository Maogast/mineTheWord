import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  course: z.string().min(1),
})

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  // TODO: save to DB or send confirmation email
  console.log('New registration:', parsed.data)

  return NextResponse.json({ message: 'Registered successfully' })
}