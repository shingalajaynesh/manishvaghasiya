import { Schema, model, models } from 'mongoose'

export interface SubscriberDocument {
  name?: string
  email: string
  source: string
  createdAt: Date
  ip?: string
}

export const subscriberSchema = new Schema<SubscriberDocument>({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  source: { type: String, default: 'coming-soon' },
  createdAt: { type: Date, default: Date.now },
  ip: { type: String },
})

export const SubscriberModel =
  models.Subscriber || model<SubscriberDocument>('Subscriber', subscriberSchema)
