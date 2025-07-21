import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { to, subject, text, html } = await req.json()

  if (!to || !subject || (!text && !html)) {
    return NextResponse.json(
      { success: false, error: 'Missing to/subject or text/html' },
      { status: 400 }
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()
    console.log('✅ SMTP connection verified')
    console.log('📧 send-email payload:', { to, subject, text, html })

    await transporter.sendMail({
      from: `"Mine The Word Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('send-email error:', err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}