import { Router } from 'express'
import { z } from 'zod'
import { Subscriber } from '../models/Subscriber'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'

export const subscribeRouter = Router()

const schema = z.object({
  email: z.string().email('Invalid email address'),
  name:  z.string().max(100).optional(),
})

// Lazy initialize transporter to avoid breaking on startup if credentials aren't set
let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporter) return transporter
  
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.warn('⚠️ SMTP_USER and SMTP_PASS environment variables are not set. Email delivery is disabled.')
    return null
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
  return transporter
}

subscribeRouter.post('/subscribe', async (req, res) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors[0].message })
  }

  const { email, name } = result.data
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress

  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    let subscriber = { createdAt: new Date() }

    if (isMongoConnected) {
      const existing = await Subscriber.findOne({ email })
      if (existing) {
        return res.status(409).json({ error: "You're already on the list!" })
      }
      const created = await Subscriber.create({ name, email, ip })
      subscriber = { createdAt: created.createdAt }
    } else {
      console.log(`[Offline Preview Mock Signup] Name: ${name ?? '-'}, Email: ${email}, IP: ${ip}`)
    }
    
    // Attempt email delivery if SMTP is configured
    const mailer = getTransporter()
    if (mailer) {
      try {
        const smtpUser = process.env.SMTP_USER!
        const adminEmail = process.env.ADMIN_EMAIL ?? smtpUser

        // Welcome email to subscriber
        await mailer.sendMail({
          from: `"Manish Vaghasiya" <${smtpUser}>`,
          to:   email,
          subject: '🙏 You\'re on the list — Manish Vaghasiya',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #222; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <h2 style="color: #D4A017; margin-top: 0;">Namaste ${name ?? 'Friend'}! 🙏</h2>
              <p>Thank you for signing up. I'll personally let you know the moment my new website goes live.</p>
              <p>Until then, follow me for daily inspiration:</p>
              <p style="margin: 20px 0;">
                📸 <a href="https://instagram.com/manishvaghasiya01" style="color: #D4A017; text-decoration: none; font-weight: bold; margin-right: 15px;">Instagram</a>
                📘 <a href="https://facebook.com/manish.vaghasiya.984" style="color: #D4A017; text-decoration: none; font-weight: bold;">Facebook</a>
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #888; font-size: 11px; margin-bottom: 0; line-height: 1.4;">
                Manish Vaghasiya | Transformational Speaker & Coach<br />
                Surat, Gujarat, India
              </p>
            </div>
          `,
        })

        // Notify admin
        await mailer.sendMail({
          from: smtpUser,
          to:   adminEmail,
          subject: `🚀 New subscriber: ${email}`,
          text: `Name: ${name ?? '-'}\nEmail: ${email}\nIP: ${ip}\nDate: ${subscriber.createdAt}`,
        })
      } catch (emailErr) {
        console.error('Email delivery error:', emailErr)
      }
    }

    const successMessage = isMongoConnected 
      ? `You're on the list! See you soon, ${name ?? 'friend'}! 🎉`
      : `[Offline Preview] Registered ${email} successfully! (No MongoDB connection)`

    return res.status(201).json({ message: successMessage })
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Already subscribed!' })
    }
    console.error('Subscriber registration database error:', err)
    return res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET all subscribers (protected with admin key)
subscribeRouter.get('/subscribers', async (req, res) => {
  const adminKey = req.headers['x-admin-key']
  if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 })
    return res.json({ count: subs.length, subscribers: subs })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Database query failed' })
  }
})
