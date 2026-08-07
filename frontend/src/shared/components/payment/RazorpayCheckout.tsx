import React, { useState } from 'react'
import { App, Button } from 'antd'
import { ShoppingCartOutlined, LockOutlined } from '@ant-design/icons'
import { API_URL } from '../../lib/api'

interface RazorpayCheckoutProps {
  amountInRupees: number
  itemName: string
  bookId?: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  buttonText?: string
  onSuccess: (data: { paymentId: string; orderId: string; bookId?: string }) => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  amountInRupees,
  itemName,
  bookId = 'jivan-jitvu-che',
  customerName,
  customerEmail,
  customerPhone = '',
  buttonText = 'Buy E-Book Now',
  onSuccess,
}) => {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )
      if (existingScript) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    if (!customerEmail || !customerName) {
      message.error('Please enter your Name and Email address first.')
      return
    }

    setLoading(true)

    try {
      const resLoaded = await loadRazorpayScript()
      if (!resLoaded) {
        message.error('Razorpay SDK failed to load. Please check your internet connection.')
        setLoading(false)
        return
      }

      // 1. Create order on backend
      const response = await fetch(`${API_URL}/api/payment/create-ebook-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountInRupees,
          buyerName: customerName,
          buyerEmail: customerEmail,
          bookId,
          itemName,
        }),
      })

      if (!response.ok) {
        let errorMsg = 'Failed to create Razorpay order'
        try {
          const errData = await response.json()
          errorMsg = errData.error || errorMsg
        } catch {
          // Non-JSON response (e.g. 404 or 500 HTML page)
        }
        throw new Error(errorMsg)
      }

      const orderData = await response.json()

      if (!orderData.orderId) {
        throw new Error(orderData.error || 'Failed to create Razorpay order')
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.keyId

      // 2. Open Razorpay Modal
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Manish Vaghasiya',
        description: itemName,
        order_id: orderData.orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#D4A017',
        },
        handler: async (razorpayResponse: any) => {
          try {
            message.loading({ content: 'Verifying payment...', key: 'verify' })

            const verifyRes = await fetch(`${API_URL}/api/payment/verify-ebook-order`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                buyerName: customerName,
                buyerEmail: customerEmail,
                buyerPhone: customerPhone,
                amount: amountInRupees,
                bookId,
                itemName,
              }),
            })

            let verifyData: any = {}
            try {
              verifyData = await verifyRes.json()
            } catch { }

            if (verifyRes.ok && verifyData.success) {
              message.success({ content: 'Payment verified! E-Book unlocked.', key: 'verify' })
              onSuccess({
                paymentId: razorpayResponse.razorpay_payment_id,
                orderId: razorpayResponse.razorpay_order_id,
                bookId: bookId,
              })
            } else {
              message.error({ content: verifyData.error || 'Payment verification failed.', key: 'verify' })
            }
          } catch (err: any) {
            message.error({ content: err.message || 'Payment verification failed.', key: 'verify' })
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (err: any) {
      console.error('Payment error:', err)
      message.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="primary"
      size="large"
      icon={<ShoppingCartOutlined />}
      loading={loading}
      onClick={handlePayment}
      className="!h-14 !rounded-xl !bg-[#D4A017] !px-8 !text-base !font-bold hover:!bg-[#b88910] !shadow-lg flex items-center justify-center gap-2"
    >
      <span>{buttonText}</span>
      <LockOutlined className="text-xs opacity-75" />
    </Button>
  )
}
