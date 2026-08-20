import { NextRequest, NextResponse } from 'next/server'
import { sendMail, emailLayout } from '@/lib/mail'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Strips CR/LF and other control characters so user input can't break out of
// a mail header (nodemailer's installed version has known CRLF-injection
// CVEs in header fields — see npm audit).
function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n\x00-\x1f]+/g, ' ').trim()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, subject, message } = body
    const name = typeof body.name === 'string' ? sanitizeHeaderValue(body.name) : body.name

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
    const subjectLabel = subjectLabels[subject] || sanitizeHeaderValue(String(subject))

    const adminHtml = emailLayout(`
      <h2 style="margin:0 0 20px;font-size:18px;color:#111827;">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;width:110px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;font-weight:600;color:#111827;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#ff4c88;text-decoration:none;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top;">Phone</td>
          <td style="padding:8px 0;">${escapeHtml(phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;vertical-align:top;">Subject</td>
          <td style="padding:8px 0;">
            <span style="display:inline-block;padding:3px 10px;border-radius:999px;background:linear-gradient(135deg,#ffa649,#ff4c88);color:#fff;font-size:12px;font-weight:600;">${escapeHtml(subjectLabel)}</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#fef6ee;border-radius:10px;border:1px solid #ffe3c2;">
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#b45309;font-weight:700;">Message</p>
        <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(message)}</p>
      </div>
    `)
    const adminText = `New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subjectLabel}

Message:
${message}`

    const userHtml = emailLayout(`
      <h2 style="margin:0 0 12px;font-size:20px;color:#111827;">Thank you for contacting us, ${escapeHtml(name)}!</h2>
      <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#374151;">
        We've received your message and one of our medical coordinators will get back to you within 24 hours.
      </p>
      <div style="margin:20px 0;padding:16px;background:#fef6ee;border-radius:10px;border:1px solid #ffe3c2;">
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#b45309;font-weight:700;">Your message</p>
        <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#374151;">${escapeHtml(message)}</p>
      </div>
      <p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:#374151;">
        Need a faster answer? Reach us directly on
        <a href="https://wa.me/919711614738" style="color:#ff4c88;text-decoration:none;font-weight:600;">WhatsApp</a>
        or call <a href="tel:+919711614738" style="color:#ff4c88;text-decoration:none;">+91 9711 614 738</a>.
      </p>
    `)
    const userText = `Thank you for contacting us, ${name}!

We've received your message and one of our medical coordinators will get back to you within 24 hours.

Your message:
${message}

Need a faster answer? WhatsApp us at +91 9711 614 738 or call us directly.`

    await Promise.all([
      sendMail({
        subject: `[GD Healthcare] ${subjectLabel} — ${name}`,
        text: adminText,
        html: adminHtml,
        replyTo: email,
      }),
      sendMail({
        to: email,
        subject: 'Thank you for contacting GD Healthcare',
        text: userText,
        html: userHtml,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
