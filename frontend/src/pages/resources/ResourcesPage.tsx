import {
  BookOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  StarFilled,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Card, Col, Input, Row, Tag, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { RazorpayCheckout } from '../../shared/components/payment/RazorpayCheckout'

const { Paragraph, Title } = Typography

export function ResourcesPage() {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const [purchased, setPurchased] = useState<{
    orderId: string
    paymentId: string
    name?: string
    email?: string
  } | null>(null)

  const ebookPrice = 199

  useEffect(() => {
    try {
      const savedPurchase = localStorage.getItem('mv_ebook_purchased')
      if (savedPurchase) {
        const parsed = JSON.parse(savedPurchase)
        if (parsed?.orderId && parsed?.paymentId) {
          setPurchased(parsed)
          if (parsed.name) setCustomerName(parsed.name)
          if (parsed.email) setCustomerEmail(parsed.email)
        }
      }
    } catch (e) {
      console.error('Failed restoring purchase state from localStorage:', e)
    }
  }, [])

  const handleDownloadPdf = () => {
    const pdfUrl = '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleResetSession = () => {
    localStorage.removeItem('mv_ebook_purchased')
    setPurchased(null)
  }


  return (
    <>
      <SeoHead
        title="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો (Official E-Book) | Manish Vaghasiya"
        description="Buy & download Manish Vaghasiya's official Gujarati E-Book 'Jivan Jitvu Che To Parivar Thi Sharu Karo' (276 Pages) for family transformation, student mindset, and parent guidance."
        canonicalUrl="https://www.manishvaghasiya.com/resources"
      />
      <PageHero
        eyebrow="Official Master Digital E-Book"
        title="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો"
        description="વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ. A 276-page life-changing Gujarati master handbook by Manish Vaghasiya."
      />

      <PageSection title="Buy & Download Official E-Book" tone="warm">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial-lg sm:p-10">
          {purchased ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircleOutlined className="text-4xl" />
              </div>
              <Title level={2} className="font-playfair !mb-2 !text-green-800">
                Payment Successful & Verified! 🎉
              </Title>

              <Paragraph className="!mx-auto !max-w-xl !text-base !text-[var(--text-soft)]">
                Thank you, <strong>{customerName || 'Dear Reader'}</strong>! Your payment of{' '}
                <strong>₹{ebookPrice}</strong> has been processed successfully. An email confirmation has been sent to <strong>{customerEmail}</strong>.
              </Paragraph>

              <div className="mx-auto my-6 max-w-md rounded-2xl bg-[var(--bg-warm)] p-5 text-left font-mono text-xs text-[var(--text-main)]" style={{ border: '1px solid var(--line-soft)' }}>
                <p className="mb-1"><strong>Order ID:</strong> {purchased.orderId}</p>
                <p className="m-0"><strong>Payment ID:</strong> {purchased.paymentId}</p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  onClick={handleDownloadPdf}
                  className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-[#b88910]"
                >
                  <DownloadOutlined className="text-lg" />
                  <span>Download E-Book PDF Now</span>
                </button>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleResetSession}
                  className="text-xs text-[var(--text-muted)] underline hover:text-[var(--accent-earth)]"
                >
                  Purchased on another device or want to purchase again? Click here to reset session
                </button>
              </div>
            </div>

          ) : (
            <Row gutter={[40, 32]} align="middle">
              <Col xs={24} lg={12}>
                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-warm)] p-6 text-center" style={{ border: '1px solid var(--line-soft)' }}>
                  <div className="mx-auto mb-4 overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:scale-105" style={{ maxWidth: '220px' }}>
                    <img
                      src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                      alt="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો Book Cover"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <Tag color="gold" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
                    GUJARATI MASTER E-BOOK (PDF)
                  </Tag>
                  <Title level={3} className="font-playfair !mb-1 !mt-3 !text-2xl !text-[var(--text-strong)]">
                    જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો
                  </Title>
                  <p className="text-xs font-semibold text-[var(--accent-earth)]">By Manish Vaghasiya • 276 Pages</p>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ</p>

                  <div className="mt-4 flex items-center justify-center gap-1 text-amber-500">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <span className="ml-2 text-xs font-bold text-[var(--text-main)]">4.9/5 (25,000+ Readers Across Gujarat)</span>
                  </div>

                  <div className="mt-6 flex items-baseline justify-center gap-3">
                    <span className="text-3xl font-extrabold text-[var(--accent-earth)]">₹{ebookPrice}</span>
                    <span className="text-sm text-[var(--text-muted)] line-through">₹499</span>
                    <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">60% OFF</span>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div className="space-y-4">
                  <Title level={3} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                    Enter Your Details to Unlock
                  </Title>
                  <Paragraph className="!mb-4 !text-xs !text-[var(--text-soft)]">
                    After instant online payment via Razorpay, you will immediately unlock your 276-page PDF download and receive an email copy.
                  </Paragraph>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Your Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Ramesh Patel"
                      size="large"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="!rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Your Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      size="large"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="!rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Phone Number (Optional)</label>
                    <Input
                      placeholder="+91 98765 43210"
                      size="large"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="!rounded-xl"
                    />
                  </div>

                  <div className="pt-2">
                    <RazorpayCheckout
                      amountInRupees={ebookPrice}
                      itemName="જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો (Gujarati E-Book)"
                      customerName={customerName}
                      customerEmail={customerEmail}
                      customerPhone={customerPhone}
                      buttonText={`Pay ₹${ebookPrice} & Get E-Book Now`}
                      onSuccess={(data) => {
                        const info = {
                          orderId: data.orderId,
                          paymentId: data.paymentId,
                          name: customerName,
                          email: customerEmail,
                        }
                        setPurchased(info)
                        try {
                          localStorage.setItem('mv_ebook_purchased', JSON.stringify(info))
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                    />
                  </div>


                  <div className="flex items-center justify-center gap-4 text-center text-xs text-[var(--text-muted)] pt-2">
                    <span className="flex items-center gap-1"><SafetyCertificateOutlined /> 100% Secure Razorpay Payment</span>
                    <span className="flex items-center gap-1"><ThunderboltOutlined /> Instant Download Access</span>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </PageSection>

      <PageSection title="What's Inside the E-Book? (પુસ્તકની મુખ્ય સામગ્રી)" description="Key lessons and 12 life-changing chapters included in this 276-page master handbook.">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <BookOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૧. પરિવારનું સાચું સ્થાન</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                સફળતાની દોડમાં પાછળ રહી જતું ઘર અને માતા-પિતાની કિંમત સમય રહેતાં સમજવાનો બોધપાઠ.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ThunderboltOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૨. ડિજિટલ ડિટોક્સ & સંવાદ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                ઘરમાં સંવાદ ઓછો અને મોબાઇલ વધારે કેમ? ઘરમાં ફરીથી ખુલ્લી વાતચીતનું વાતાવરણ બનાવવાની ચાવી.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <LockOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૩. બાળકનું મન & માર્ક્સ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                માર્ક્સ કરતાં બાળકનું મન વધુ મહત્વનું છે. બાળકોને સમજાવતા પહેલાં તેમને સાંભળો અને નિષ્ફળતામાં સાથ આપો.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <SafetyCertificateOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૪. સંસ્કાર & સંકલ્પ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                સંસ્કાર શીખવવામાં નથી આવતા—જીવવામાં આવે છે. દરેક પરિવારે સાથે મળીને કરવાના ૭ મુખ્ય સંકલ્પ.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                <StarFilled className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૫. સ્વીકારનું વાતાવરણ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                ઘરમાં ગુસ્સો નહીં, સ્વીકારનું વાતાવરણ બનાવો. પૈસા કમાવો પણ સંબંધો ગુમાવશો નહીં.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <CheckCircleOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૬. ૨૧ દિવસનો પડકાર</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                ૨૧ દિવસનો પરિવાર પરિવર્તન પડકાર, આત્મચિંતન કાર્યપત્રક અને ૩૦ દિવસની આદત નોંધ.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </PageSection>
    </>
  )
}
