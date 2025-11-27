import { NextRequest, NextResponse } from 'next/server'
import emailjs from '@emailjs/nodejs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'chidiebube95@gmail.com',
      },
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY!, // Use private key here
      }
    )

    if (result.text === 'OK') {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}