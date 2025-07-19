import { NextResponse } from 'next/server'
import { db, serverTimestamp } from '~/lib/firebaseAdmin'
import { z } from 'zod'
import nodemailer from 'nodemailer'

// 1. Build the validation schema
const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  course: z.string().min(1),
})

// 2. Configure Nodemailer using your .env.local
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,       // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 587
  secure: false,                      // use TLS
  auth: {
    user: process.env.EMAIL_USER,     // e.g. minethewordacademy@gmail.com
    pass: process.env.EMAIL_PASS,     // your 16-char Gmail App Password
  },
})

export async function POST(request: Request) {
  // 3. Parse & validate incoming data
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  try {
    // 4. Save the registration to Firestore
    const { fullName, email, phone, course } = parsed.data
    const docRef = await db
      .collection('registrations')
      .add({
        fullName,
        email,
        phone,
        course,
        createdAt: serverTimestamp(),
      })

    // 5. Send the welcome email
    await transporter.sendMail({
      from: `"Mine The Word Academy" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '✅ Welcome to Mine The Word Academy!',
      text: `
Hi ${fullName},

Thank you for registering for our "${course}" course!

Next Steps:
1. Log in at ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard
2. Explore your course materials under “My Courses”
3. Reach out anytime: support@mine-the-word.academy

Blessings,
The MTW Academy Team
      `,
      html: `
        <h2>Hi ${fullName},</h2>
        <p>Thank you for registering for our <strong>${course}</strong> course!</p>
        <hr/>
        <h3>Next Steps:</h3>
        <ol>
          <li>Log in at <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard">${process.env.NEXT_PUBLIC_BASE_URL}/dashboard</a></li>
          <li>Explore your course materials under “My Courses”</li>
          <li>Reach out anytime: <a href="mailto:support@mine-the-word.academy">support@mine-the-word.academy</a></li>
        </ol>
        <p>Blessings,<br/>The MTW Academy Team</p>
      `,
    })

    // 6. Respond with success
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (err: any) {
    console.error('Registration error:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}