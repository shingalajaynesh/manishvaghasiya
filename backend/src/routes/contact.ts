import { Router } from 'express'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import { Enquiry } from '../models/Enquiry'

export const contactRouter = Router()

const contactSchema = z.object({
  name:         z.string().min(1, 'Name is required'),
  email:        z.string().email('Invalid email address'),
  phone:        z.string().min(1, 'Phone number is required'),
  organization: z.string().optional(),
  eventType:    z.string().min(1, 'Event type is required'),
  eventDate:    z.string().optional(),
  location:     z.string().min(1, 'Location is required'),
  message:      z.string().min(1, 'Message is required'),
})

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter
  
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.warn('⚠️ SMTP_USER and SMTP_PASS environment variables are not set. Contact email alerts are disabled.')
    return null
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
  return transporter
}

contactRouter.post('/contact', async (req, res) => {
  const result = contactSchema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors[0].message })
  }

  const { name, email, phone, organization, eventType, eventDate, location, message } = result.data
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress

  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    let enquiry = { createdAt: new Date() }

    if (isMongoConnected) {
      const created = await Enquiry.create({
        name,
        email,
        phone,
        organization,
        eventType,
        eventDate,
        location,
        message,
        ip,
      })
      enquiry = { createdAt: created.createdAt }
    } else {
      console.log(`[Offline Preview Mock Contact] Name: ${name}, Email: ${email}, Phone: ${phone}, Org: ${organization ?? '-'}, Type: ${eventType}, Date: ${eventDate ?? '-'}, Location: ${location}, Msg: ${message}`)
    }

    // Attempt email notifications if SMTP is set up
    const mailer = getTransporter()
    if (mailer) {
      try {
        const smtpUser = process.env.SMTP_USER!
        const adminEmail = process.env.ADMIN_EMAIL ?? smtpUser

        // 1. Alert to Admin
        await mailer.sendMail({
          from: smtpUser,
          to:   adminEmail,
          subject: `📅 New Event Booking Enquiry: ${eventType} in ${location}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #222; border: 1px solid #ddd; padding: 25px; border-radius: 8px;">
              <h2 style="color: #007AFF; margin-top: 0; border-bottom: 2px solid #007AFF; padding-bottom: 10px;">New Booking Enquiry</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 140px;">Name:</td>
                  <td style="padding: 6px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 6px 0;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 6px 0;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Organization:</td>
                  <td style="padding: 6px 0;">${organization ?? '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Event Type:</td>
                  <td style="padding: 6px 0;"><strong>${eventType}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Tentative Date:</td>
                  <td style="padding: 6px 0;">${eventDate ?? 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold;">Location/City:</td>
                  <td style="padding: 6px 0;">${location}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; bg-color: #f9f9f9; border-left: 4px solid #007AFF; background: #f9f9f9;">
                <h4 style="margin: 0 0 8px 0; color: #333;">Message:</h4>
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #555;">${message}</p>
              </div>
              <p style="font-size: 10px; color: #888; margin-top: 30px;">
                Submitted on: ${enquiry.createdAt.toLocaleString()} from IP: ${ip}
              </p>
            </div>
          `,
        })

        // 2. Auto-responder back to the customer
        await mailer.sendMail({
          from: `"Manish Vaghasiya" <${smtpUser}>`,
          to:   email,
          subject: '🙏 Event Booking Enquiry Received — Manish Vaghasiya',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #222; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <h2 style="color: #007AFF; margin-top: 0;">Namaste ${name}! 🙏</h2>
              <p>Thank you for your interest in booking me for your upcoming event.</p>
              <p>My team has successfully received your details regarding the <strong>${eventType}</strong> in <strong>${location}</strong>. We will review your requirements and reach out to you within 24 hours with our availability and terms.</p>
              <p>In the meantime, feel free to listen to my podcast or check out my articles:</p>
              <p style="margin: 20px 0;">
                📸 <a href="https://instagram.com/manishvaghasiya01" style="color: #007AFF; text-decoration: none; font-weight: bold; margin-right: 15px;">Instagram</a>
                ▶️ <a href="https://youtube.com/@manishvaghasiya" style="color: #007AFF; text-decoration: none; font-weight: bold;">YouTube</a>
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #888; font-size: 11px; margin-bottom: 0;">
                Manish Vaghasiya | Transformational Speaker & Coach<br />
                Surat, Gujarat, India
              </p>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email delivery error:', emailErr)
      }
    }

    const successMessage = isMongoConnected
      ? 'Enquiry submitted successfully!'
      : '[Offline Preview] Enquiry mock-submitted successfully! (MongoDB not configured)'

    return res.status(201).json({ message: successMessage })
  } catch (err) {
    console.error('Contact route handler database error:', err)
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
})
