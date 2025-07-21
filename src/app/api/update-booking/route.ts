import { NextRequest, NextResponse } from 'next/server'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '~/lib/firebaseClient'
import { Timestamp } from 'firebase/firestore'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { bookingId, status } = await req.json()

  if (!bookingId || !['confirmed', 'declined'].includes(status)) {
    return NextResponse.json(
      { success: false, error: 'Invalid bookingId or status' },
      { status: 400 }
    )
  }

  try {
    // 1) Update Firestore
    const ref = doc(db, 'bookings', bookingId)
    await updateDoc(ref, { status, updatedAt: Timestamp.now() })

    // 2) Read back the doc
    const snap = await getDoc(ref)
    const data = snap.data()
    if (!data) throw new Error('Booking not found after update')

    const to = data.requesterEmail
    const when = data.date.toDate().toLocaleString()
    const time = data.startTime

    // 3) Pick subject and body based on status
    let subject: string
    let text: string
    if (status === 'confirmed') {
      subject = 'Your booking is confirmed'
      text = `Dear friend,

Your booking on ${when} at ${time} has been confirmed. We look forward to meeting with you then.

May the Lord bless you richly,
Mine The Word Academy
`
    } else {
      subject = 'Booking Request Declined'
      text = `Dear friend,

Thank you for your request to meet on ${when} at ${time}. Regrettably, we are unable to accommodate that time slot. Please accept our apologies for any inconvenience.

If you’d like to reschedule or need further assistance, reply to this email and we’ll be happy to find another time.

May God guide your steps,
Mine The Word Academy
`
    }
    const html = `<p>${text.replace(/\n/g, '<br/>')}</p>`

    // 4) Send notification
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
    console.log('✅ SMTP connection verified (update-booking)')
    console.log('📧 update-booking payload:', { to, subject })

    await transporter.sendMail({
      from: `"Mine The Word Academy" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('update-booking error:', err)
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}