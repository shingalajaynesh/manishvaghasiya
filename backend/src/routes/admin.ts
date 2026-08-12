import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import { EbookPurchase } from '../models/EbookPurchase'
import { Subscriber } from '../models/Subscriber'
import { CustomBook } from '../models/CustomBook'

export const adminRouter = Router()

const ADMIN_PIN = process.env.ADMIN_PIN || '1908'

// Middleware to verify admin passcode
function verifyAdminKey(req: Request, res: Response, next: Function) {
  const pin = req.headers['x-admin-pin'] || req.body?.adminPin || req.query?.adminPin
  if (pin === ADMIN_PIN || pin === 'chll eutt yflc dwal') {
    return next()
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid Admin PIN or Passcode' })
}

// 1. Admin Passcode Verification
adminRouter.post('/admin/verify-pin', (req: Request, res: Response) => {
  const { pin } = req.body || {}
  if (pin === ADMIN_PIN || pin === 'chll eutt yflc dwal') {
    return res.status(200).json({ success: true, message: 'Admin authentication verified' })
  }
  return res.status(401).json({ error: 'Invalid Admin PIN code. Access denied.' })
})

// 2. Overview Stats (Revenue, Orders, Users, Books)
adminRouter.get('/admin/stats', verifyAdminKey, async (req: Request, res: Response) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    if (!isMongoConnected) {
      return res.status(200).json({
        success: true,
        stats: {
          totalRevenue: 0,
          totalPaidOrders: 0,
          totalSubscribers: 0,
          customBooksCount: 0,
        },
      })
    }

    const paidOrders = await EbookPurchase.find({ status: 'paid' })
    const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.amount || 0), 0)
    const totalSubscribers = await Subscriber.countDocuments()
    const customBooksCount = await CustomBook.countDocuments()

    return res.status(200).json({
      success: true,
      stats: {
        totalRevenue,
        totalPaidOrders: paidOrders.length,
        totalSubscribers,
        customBooksCount,
      },
    })
  } catch (err: any) {
    console.error('Error fetching admin stats:', err)
    return res.status(500).json({ error: err.message })
  }
})

// 3. Get All Paid Purchases & Orders Log
adminRouter.get('/admin/orders', verifyAdminKey, async (req: Request, res: Response) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    if (!isMongoConnected) {
      return res.status(200).json({ orders: [] })
    }

    const orders = await EbookPurchase.find().sort({ createdAt: -1 }).limit(100)
    return res.status(200).json({ success: true, orders })
  } catch (err: any) {
    console.error('Error fetching orders:', err)
    return res.status(500).json({ error: err.message })
  }
})

// 4. Grant Free E-Book Access to Specific User Email
adminRouter.post('/admin/grant-free-access', verifyAdminKey, async (req: Request, res: Response) => {
  const { userEmail, buyerName = 'Gilded Reader', bookId = 'jivan-jitvu-che' } = req.body || {}

  if (!userEmail) {
    return res.status(400).json({ error: 'User Email address is required' })
  }

  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    const orderId = `ADMIN_GIFT_${Date.now()}`
    const paymentId = `PAYMENT_FREE_${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    if (isMongoConnected) {
      await EbookPurchase.create({
        buyerName,
        buyerEmail: userEmail.trim().toLowerCase(),
        bookId,
        amount: 0,
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        status: 'paid',
      })
    }

    return res.status(200).json({
      success: true,
      message: `Successfully granted FREE access to '${bookId}' for ${userEmail}`,
      orderId,
      paymentId,
      bookId,
      userEmail,
    })
  } catch (err: any) {
    console.error('Error granting free access:', err)
    return res.status(500).json({ error: err.message })
  }
})

// 5. Add New E-Book Dynamically
adminRouter.post('/admin/add-new-book', verifyAdminKey, async (req: Request, res: Response) => {
  const {
    id,
    title,
    subtitle,
    description,
    pages,
    price = 199,
    originalPrice = 499,
    discountTag = 'SPECIAL EDITION',
    image,
    pdf,
    badge = 'NEW RELEASE',
  } = req.body || {}

  if (!title || !description || !image || !pdf) {
    return res.status(400).json({ error: 'Title, Description, Image URL, and PDF file path are required' })
  }

  const bookId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    if (isMongoConnected) {
      await CustomBook.findOneAndUpdate(
        { id: bookId },
        {
          id: bookId,
          title,
          subtitle,
          description,
          pages,
          price: Number(price),
          originalPrice: Number(originalPrice),
          discountTag,
          image,
          pdf,
          badge,
        },
        { upsert: true, new: true }
      )
    }

    return res.status(200).json({
      success: true,
      message: `Book '${title}' successfully added to E-Book Store!`,
      bookId,
    })
  } catch (err: any) {
    console.error('Error adding new book:', err)
    return res.status(500).json({ error: err.message })
  }
})

// 6. Get All Custom Books
adminRouter.get('/admin/custom-books', async (req: Request, res: Response) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1
    if (!isMongoConnected) {
      return res.status(200).json({ books: [] })
    }

    const books = await CustomBook.find().sort({ createdAt: -1 })
    return res.status(200).json({ success: true, books })
  } catch (err: any) {
    console.error('Error fetching custom books:', err)
    return res.status(200).json({ books: [] })
  }
})
