import { Schema, model } from 'mongoose'

interface ISubscriber {
  name?: string
  email: string
  source: string
  createdAt: Date
  ip?: string
}

const subscriberSchema = new Schema<ISubscriber>({
  name:      { type: String, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  source:    { type: String, default: 'coming-soon' },
  createdAt: { type: Date, default: Date.now },
  ip:        { type: String },
})

export const Subscriber = model<ISubscriber>('Subscriber', subscriberSchema)
