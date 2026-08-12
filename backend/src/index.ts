import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dns from 'dns'
import dotenv from 'dotenv'
import { subscribeRouter } from './routes/subscribe'
import { paymentRouter } from './routes/payment'
import { adminRouter } from './routes/admin'

import { rateLimiter } from './middleware/rateLimiter'



dotenv.config()

// Ensure public DNS fallback for local ISP DNS SRV record resolution issues
try {
  dns.setServers(['8.8.8.8', '1.1.1.1'])
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: [
    'https://manishvaghasiya.com',
    'https://www.manishvaghasiya.com',
    'https://manishvaghasiya.in',
    'https://www.manishvaghasiya.in',
    'https://manishvaghasiya.onrender.com',
    'http://localhost:5173',  // dev
  ],
  methods: ['GET', 'POST'],
}))

app.use(express.json())
app.use('/api', rateLimiter)
app.use('/api', subscribeRouter)
app.use('/api', paymentRouter)
app.use('/api', adminRouter)





app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.get('/ping', (_, res) => {
  res.json({
    status: 'ok',
    message: 'pong',
    timestamp: new Date().toISOString()
  })
})

function startKeepAlive() {
  const externalUrl = process.env.PING_URL || process.env.RENDER_EXTERNAL_URL
  if (!externalUrl) {
    console.log('ℹ️ Keep-alive self-ping worker: Set PING_URL or RENDER_EXTERNAL_URL in env to enable auto-ping on Render.')
    return
  }

  const pingEndpoint = `${externalUrl.replace(/\/$/, '')}/ping`
  const INTERVAL_MS = (parseInt(process.env.PING_INTERVAL_MINUTES || '14', 10)) * 60 * 1000

  console.log(`🚀 Keep-alive service active. Ping target: ${pingEndpoint} every ${INTERVAL_MS / 60000} mins`)

  setInterval(async () => {
    try {
      const res = await fetch(pingEndpoint)
      console.log(`[Ping/Pong] Heartbeat sent to ${pingEndpoint} - Status: ${res.status}`)
    } catch (err: any) {
      console.error(`[Ping/Pong Error] Heartbeat failed: ${err.message}`)
    }
  }, INTERVAL_MS)
}

const mongoURI = process.env.MONGODB_URI

if (!mongoURI) {
  console.warn('⚠️ MONGODB_URI is not defined in the environment. Server is starting in offline mode for local preview.')
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
    startKeepAlive()
  })
} else {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('MongoDB connected')
      app.listen(PORT, () => {
        console.log(`API running on port ${PORT}`)
        startKeepAlive()
      })
    })
    .catch(err => {
      console.warn('⚠️ MongoDB connection failed:', err.message)
      console.warn('Starting API server anyway so endpoints remain accessible...')
      app.listen(PORT, () => {
        console.log(`API running on port ${PORT} (without active MongoDB connection)`)
        startKeepAlive()
      })
    })
}

