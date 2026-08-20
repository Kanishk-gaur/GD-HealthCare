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

/** Wraps inner HTML in a branded card layout matching the site's gradient theme. */
export function emailLayout(bodyHtml: string) {
  return `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background:#f6f6f6; padding:32px 16px;">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#ffa649,#ff4c88);padding:28px 32px;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.02em;">GD Healthcare</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.9);font-size:13px;">World-Class Healthcare at Affordable Prices</p>
        </div>
        <div style="padding:32px;color:#1f2937;">
          ${bodyHtml}
        </div>
        <div style="padding:20px 32px;background:#fafafa;border-top:1px solid #f0f0f0;color:#9ca3af;font-size:12px;line-height:1.6;">
          GD Healthcare &middot; New Delhi, India<br/>
          <a href="mailto:info@gdhealthcare.in" style="color:#ff4c88;text-decoration:none;">info@gdhealthcare.in</a>
          &nbsp;&middot;&nbsp; +91 9711 614 738 / +91 9821 760 900
        </div>
      </div>
    </div>
  `
}

export async function sendMail(options: { to?: string; subject: string; text: string; html: string; replyTo?: string }) {
  const to = options.to || process.env.CONTACT_EMAIL || process.env.SMTP_USER
  await getTransporter().sendMail({
    from: `GD Healthcare <${process.env.SMTP_USER}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  })
}
