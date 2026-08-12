import { Schema, model, models } from 'mongoose'

export interface CustomBookDocument {
  id: string
  title: string
  subtitle: string
  description: string
  pages: string
  price: number
  originalPrice: number
  discountTag: string
  image: string
  pdf: string
  badge: string
  createdAt: Date
}

export const customBookSchema = new Schema<CustomBookDocument>({
  id: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, trim: true },
  description: { type: String, required: true },
  pages: { type: String, default: '200+ Pages' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 499 },
  discountTag: { type: String, default: 'SPECIAL EDITION' },
  image: { type: String, required: true },
  pdf: { type: String, required: true },
  badge: { type: String, default: 'NEW MASTER E-BOOK' },
  createdAt: { type: Date, default: Date.now },
})

export const CustomBook = models.CustomBook || model<CustomBookDocument>('CustomBook', customBookSchema)
