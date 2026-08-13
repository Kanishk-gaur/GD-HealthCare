import { NextRequest, NextResponse } from 'next/server'
import { sendMail } from '@/lib/mail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const subjectLabels: Record<string, string> = {
      consultation: 'Free Consultation',
      treatment: 'Treatment Inquiry',
      cost: 'Cost Estimation',
      visa: 'Visa Assistance',
      other: 'Other',
    }
    const subjectLabel = subjectLabels[subject] || subject

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
    `
    const text = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subjectLabel}

Message:
${message}`

    await sendMail({
      subject: `[GD Healthcare] ${subjectLabel} — ${name}`,
      text,
      html,
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
