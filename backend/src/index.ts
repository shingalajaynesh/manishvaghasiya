import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { subscribeRouter } from './routes/subscribe'
import { rateLimiter } from './middleware/rateLimiter'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({
  origin: [
    'https://manishvaghasiya.com',
    'https://www.manishvaghasiya.com',
    'https://manishvaghasiya.in',
    'https://www.manishvaghasiya.in',
    'http://localhost:5173',  // dev
  ],
  methods: ['GET', 'POST'],
}))

app.use(express.json())
app.use('/api', rateLimiter)
app.use('/api', subscribeRouter)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

const mongoURI = process.env.MONGODB_URI

if (!mongoURI) {
  console.warn('⚠️ MONGODB_URI is not defined in the environment. Server is starting in offline/mock mode for local preview.')
  app.listen(PORT, () => {
    console.log(`API running in offline preview mode on port ${PORT}`)
  })
} else {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('MongoDB connected')
      app.listen(PORT, () => console.log(`API running on port ${PORT}`))
    })
    .catch(err => {
      console.error('MongoDB error:', err)
      process.exit(1)
    })
}
