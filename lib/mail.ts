import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    throw new Error('SMTP_USER/SMTP_PASS are not configured')
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
  return transporter
}

export async function sendMail(options: { subject: string; text: string; html: string; replyTo?: string }) {
  const to = process.env.CONTACT_EMAIL || process.env.SMTP_USER
  await getTransporter().sendMail({
    from: `GD Healthcare Website <${process.env.SMTP_USER}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  })
}
