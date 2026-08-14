import { Router, Request, Response } from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import { EbookPurchase } from '../models/EbookPurchase'

export const paymentRouter = Router()

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_live_TI32TMkSyrNAqK'
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'SwKSCkOiOtcqEdK0RAWwiWdX'

  return new Razorpay({
    key_id,
    key_secret,
  })
}

// 1. Create Razorpay E-Book Order
paymentRouter.post('/payment/create-ebook-order', async (req: Request, res: Response) => {
  const { amountInRupees = 199, buyerEmail, buyerName, bookId = 'jivan-jitvu-che', itemName = '' } = req.body || {}
  const amountInPaise = Math.round(Number(amountInRupees) * 100)

  try {
    const razorpay = getRazorpayInstance()
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `ebook_rcpt_${Date.now()}`,
      notes: {
        buyerEmail: buyerEmail || '',
        buyerName: buyerName || '',
        bookId: bookId || 'jivan-jitvu-che',
        itemName: itemName || '',
      },
    }

    const order = await razorpay.orders.create(options)

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_TI32TMkSyrNAqK',
    })
  } catch (error: any) {
    console.error('Error creating Razorpay E-Book order:', error)
    const razorpayErrorMsg =
      error?.error?.description ||
      error?.message ||
      'Razorpay authentication failed. Please verify your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
    return res.status(error?.statusCode || 500).json({ error: razorpayErrorMsg })
  }
})

// 2. Verify Razorpay Payment & Grant E-Book Download
paymentRouter.post('/payment/verify-ebook-order', async (req: Request, res: Response) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      buyerName,
      buyerEmail,
      buyerPhone,
      amount = 199,
      bookId = 'jivan-jitvu-che',
      itemName = 'Manish Vaghasiya Gujarati E-Book',
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required Razorpay payment signature parameters' })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'SwKSCkOiOtcqEdK0RAWwiWdX'
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValidSignature = generatedSignature === razorpay_signature

    if (!isValidSignature) {
      console.error('❌ Invalid Razorpay signature!')
      return res.status(400).json({ error: 'Payment signature verification failed' })
    }

    // Save purchase record to MongoDB if connected
    const isMongoConnected = mongoose.connection.readyState === 1
    if (isMongoConnected) {
      await EbookPurchase.create({
        buyerName: buyerName || 'Valued Reader',
        buyerEmail: buyerEmail || 'customer@example.com',
        buyerPhone: buyerPhone || '',
        bookId: bookId || 'jivan-jitvu-che',
        amount: Number(amount),
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
      })
      console.log(`✅ Saved EbookPurchase to MongoDB for ${buyerEmail} (bookId: ${bookId})`)
    }

    // Send confirmation email via Nodemailer if configured
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    if (user && pass && buyerEmail) {
      try {
        const mailer = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass },
        })

        await mailer.sendMail({
          from: `"Manish Vaghasiya" <${user}>`,
          to: buyerEmail,
          subject: `Purchase Confirmation: ${itemName} — Manish Vaghasiya`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; color: #222; border: 1px solid #eee; padding: 24px; border-radius: 12px;">
              <h2 style="color: #D4A017; margin-top: 0;">Thank you for your purchase</h2>
              <p>Namaste <strong>${buyerName || 'Friend'}</strong>,</p>
              <p>Your payment of <strong>₹${amount}</strong> for <strong>${itemName}</strong> has been successfully processed.</p>
              
              <div style="background: #f9f8f6; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D4A017;">
                <p style="margin: 0; font-size: 14px;"><strong>Item:</strong> ${itemName}</p>
                <p style="margin: 4px 0 0 0; font-size: 14px;"><strong>Order ID:</strong> ${razorpay_order_id}</p>
                <p style="margin: 4px 0 0 0; font-size: 14px;"><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
              </div>

              <p>Click the button below to access & download your official PDF E-Book(s):</p>
              <p style="text-align: center; margin: 25px 0;">
                <a href="https://manishvaghasiya.com/resources" style="background: #D4A017; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Download E-Book PDF Now
                </a>
              </p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
              <p style="color: #888; font-size: 11px; margin-bottom: 0;">
                Manish Vaghasiya | Transformational Speaker & Author<br />
                Surat, Gujarat, India
              </p>
            </div>
          `,
        })
      } catch (mailErr) {
        console.error('Failed sending E-Book purchase email:', mailErr)
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully! E-Book access granted.',
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      bookId,
    })
  } catch (error: any) {
    console.error('Error verifying Razorpay E-Book payment:', error)
    return res.status(500).json({ error: error.message || 'Payment verification failed' })
  }
})

// 3. Fetch User Purchased E-Books by Email
paymentRouter.get('/payment/my-purchased-books', async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string
    if (!email) {
      return res.status(200).json({ purchasedBooks: [] })
    }

    const isMongoConnected = mongoose.connection.readyState === 1
    if (!isMongoConnected) {
      return res.status(200).json({ purchasedBooks: [] })
    }

    const purchases = await EbookPurchase.find({
      buyerEmail: { $regex: new RegExp(`^${email.trim()}$`, 'i') },
      status: 'paid',
    })

    const bookIds = new Set<string>()
    purchases.forEach((p) => {
      if (p.bookId === 'combo-bundle') {
        bookIds.add('jivan-jitvu-che')
        bookIds.add('man-haryu-to-badhu-haryu')
        bookIds.add('combo-bundle')
      } else if (p.bookId) {
        bookIds.add(p.bookId)
      }
    })

    return res.status(200).json({
      success: true,
      purchasedBooks: Array.from(bookIds),
    })
  } catch (err: any) {
    console.error('Error fetching purchased books:', err)
    return res.status(500).json({ error: err.message })
  }
})

