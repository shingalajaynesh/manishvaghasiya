import { Schema, model } from 'mongoose'

interface IEnquiry {
  name: string
  email: string
  phone: string
  organization?: string
  eventType: string
  eventDate?: string
  location: string
  message: string
  createdAt: Date
  ip?: string
}

const enquirySchema = new Schema<IEnquiry>({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, lowercase: true, trim: true },
  phone:        { type: String, required: true, trim: true },
  organization: { type: String, trim: true },
  eventType:    { type: String, required: true, trim: true },
  eventDate:    { type: String, trim: true },
  location:     { type: String, required: true, trim: true },
  message:      { type: String, required: true, trim: true },
  createdAt:    { type: Date, default: Date.now },
  ip:           { type: String },
})

export const Enquiry = model<IEnquiry>('Enquiry', enquirySchema)
