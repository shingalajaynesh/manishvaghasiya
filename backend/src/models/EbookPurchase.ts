import { Schema, model, models } from 'mongoose'

export interface EbookPurchaseDocument {
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  amount: number
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature?: string
  status: 'created' | 'paid' | 'failed'
  createdAt: Date
}

export const ebookPurchaseSchema = new Schema<EbookPurchaseDocument>({
  buyerName: { type: String, required: true, trim: true },
  buyerEmail: { type: String, required: true, lowercase: true, trim: true },
  buyerPhone: { type: String, trim: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpaySignature: { type: String },
  status: { type: String, default: 'paid' },
  createdAt: { type: Date, default: Date.now },
})

export const EbookPurchase =
  models.EbookPurchase || model<EbookPurchaseDocument>('EbookPurchase', ebookPurchaseSchema)
export const EbookPurchaseModel = EbookPurchase

