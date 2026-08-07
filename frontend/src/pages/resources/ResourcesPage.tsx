import {
  BookOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  StarFilled,
  ThunderboltOutlined,
  GiftOutlined,
  TrophyOutlined,
  HeartOutlined,
  FireOutlined,
} from '@ant-design/icons'
import { Card, Col, Input, Row, Tag, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { RazorpayCheckout } from '../../shared/components/payment/RazorpayCheckout'

const { Paragraph, Title } = Typography

export interface EbookDetail {
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
}

const BOOKS: Record<string, EbookDetail> = {
  'jivan-jitvu-che': {
    id: 'jivan-jitvu-che',
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    subtitle: 'Jivan Jitvu Che To Parivar Thi Sharu Karo',
    description: 'વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ. A 276-page life-changing Gujarati master handbook by Manish Vaghasiya.',
    pages: '276 Pages',
    price: 199,
    originalPrice: 499,
    discountTag: '60% OFF',
    image: '/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
    pdf: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
    badge: 'PARIVAR & PARENTING BESTSELLER',
  },
  'man-haryu-to-badhu-haryu': {
    id: 'man-haryu-to-badhu-haryu',
    title: 'મન હાર્યું તો બધું હાર્યું',
    subtitle: 'Man Haryu To Badhu Haryu',
    description: 'માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર ગાઇડ. Master your mind & overcome life setbacks by Manish Vaghasiya.',
    pages: '250+ Pages',
    price: 199,
    originalPrice: 499,
    discountTag: '60% OFF',
    image: '/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png',
    pdf: '/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf',
    badge: 'MINDSET & CONFIDENCE MASTER',
  },
  'combo-bundle': {
    id: 'combo-bundle',
    title: 'બંને માસ્ટર પુસ્તકો કોમ્બો બંડલ (Master E-Book Pair)',
    subtitle: 'Both Bestselling Master Books Pack',
    description: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો + મન હાર્યું તો બધું હાર્યું. Complete family & mindset master library by Manish Vaghasiya.',
    pages: '525+ Total Pages',
    price: 349,
    originalPrice: 998,
    discountTag: 'SAVE 65% • BEST VALUE',
    image: '/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png',
    pdf: 'combo',
    badge: '🔥 MOST POPULAR • BEST VALUE',
  },
}

export function ResourcesPage() {
  const location = useLocation()
  const [selectedBookId, setSelectedBookId] = useState<string>('jivan-jitvu-che')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const [purchased, setPurchased] = useState<{
    orderId: string
    paymentId: string
    name?: string
    email?: string
    bookId?: string
    amount?: number
  } | null>(null)

  useEffect(() => {
    // Check URL parameters for book selection
    const searchParams = new URLSearchParams(location.search)
    const bookParam = searchParams.get('book')
    if (bookParam && BOOKS[bookParam]) {
      setSelectedBookId(bookParam)
    }

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
  }, [location.search])

  const selectedBook = BOOKS[selectedBookId] || BOOKS['jivan-jitvu-che']

  const handleDownloadPdf = (pdfPath: string, filename: string) => {
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = filename
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
        title="Manish Vaghasiya Master Gujarati E-Books | Buy & Download PDF"
        description="Buy and download official Gujarati master E-Books by Manish Vaghasiya: 'Jivan Jitvu Che To Parivar Thi Sharu Karo' & 'Man Haryu To Badhu Haryu' or get the Master Combo Bundle."
        canonicalUrl="https://www.manishvaghasiya.com/resources"
      />
      <PageHero
        eyebrow="Official Master Gujarati E-Books Store"
        title="મનીષ વાઘાણિયા માસ્ટર ઈ-બુક સ્ટોર"
        description="પરિવાર, સંસ્કાર, માનસિક મજબૂતી અને સફળ જીવન માટેના બે સૌથી લોકપ્રિય ગુજરાતી પુસ્તકો ડિજિટલ PDF સ્વરૂપે."
      />

      <PageSection title="Select Your Master E-Book or Combo Pack" tone="warm">
        {/* Book Selector Tabs / Options */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Option 1: Book 1 */}
            <div
              onClick={() => setSelectedBookId('jivan-jitvu-che')}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                selectedBookId === 'jivan-jitvu-che'
                  ? 'border-[#D4A017] bg-amber-50/50 shadow-md ring-2 ring-[#D4A017]'
                  : 'border-[var(--line-soft)] bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                  alt="Book 1 Cover"
                  className="h-16 w-12 rounded object-cover shadow-sm"
                />
                <div>
                  <Tag color="gold" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                    BOOK 1
                  </Tag>
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    જીવન જીતવું છે તો પરિવારથી...
                  </div>
                  <div className="mt-1 text-xs font-bold text-[var(--accent-earth)]">₹199</div>
                </div>
              </div>
            </div>

            {/* Option 2: Book 2 */}
            <div
              onClick={() => setSelectedBookId('man-haryu-to-badhu-haryu')}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                selectedBookId === 'man-haryu-to-badhu-haryu'
                  ? 'border-[#D4A017] bg-amber-50/50 shadow-md ring-2 ring-[#D4A017]'
                  : 'border-[var(--line-soft)] bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                  alt="Book 2 Cover"
                  className="h-16 w-12 rounded object-cover shadow-sm"
                />
                <div>
                  <Tag color="blue" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                    NEW • BOOK 2
                  </Tag>
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    મન હાર્યું તો બધું હાર્યું
                  </div>
                  <div className="mt-1 text-xs font-bold text-[var(--accent-earth)]">₹199</div>
                </div>
              </div>
            </div>

            {/* Option 3: Combo Pack */}
            <div
              onClick={() => setSelectedBookId('combo-bundle')}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                selectedBookId === 'combo-bundle'
                  ? 'border-[#D4A017] bg-amber-50/80 shadow-lg ring-2 ring-[#D4A017]'
                  : 'border-amber-200 bg-gradient-to-br from-amber-50/30 to-orange-50/30 hover:border-amber-400'
              }`}
            >
              <span className="absolute top-0 right-0 rounded-bl-xl bg-[#D4A017] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                BEST VALUE
              </span>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-4">
                  <img
                    src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                    alt="Book 1"
                    className="h-16 w-10 rounded object-cover shadow-sm"
                  />
                  <img
                    src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                    alt="Book 2"
                    className="h-16 w-10 rounded object-cover shadow-md"
                  />
                </div>
                <div>
                  <Tag color="red" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                    COMBO BUNDLE
                  </Tag>
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    બંને માસ્ટર પુસ્તકો બંડલ
                  </div>
                  <div className="mt-1 text-xs font-bold text-emerald-700">₹349 <span className="text-[10px] font-normal text-gray-400 line-through">₹998</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Card / Checkout */}
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
                Thank you, <strong>{customerName || 'Dear Reader'}</strong>! Your payment has been processed successfully. An email confirmation with download instructions has been sent to <strong>{customerEmail}</strong>.
              </Paragraph>

              <div className="mx-auto my-6 max-w-md rounded-2xl bg-[var(--bg-warm)] p-5 text-left font-mono text-xs text-[var(--text-main)]" style={{ border: '1px solid var(--line-soft)' }}>
                <p className="mb-1"><strong>Order ID:</strong> {purchased.orderId}</p>
                <p className="m-0"><strong>Payment ID:</strong> {purchased.paymentId}</p>
              </div>

              {/* Download Buttons depending on purchase */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                {purchased.bookId === 'man-haryu-to-badhu-haryu' ? (
                  <button
                    onClick={() => handleDownloadPdf('/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf', 'Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf')}
                    className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-[#b88910]"
                  >
                    <DownloadOutlined className="text-lg" />
                    <span>Download 'મન હાર્યું તો બધું હાર્યું' PDF</span>
                  </button>
                ) : purchased.bookId === 'combo-bundle' ? (
                  <>
                    <button
                      onClick={() => handleDownloadPdf('/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf', 'Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf')}
                      className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#b88910]"
                    >
                      <DownloadOutlined className="text-lg" />
                      <span>Download Book 1 PDF</span>
                    </button>
                    <button
                      onClick={() => handleDownloadPdf('/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf', 'Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf')}
                      className="flex h-14 items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-900"
                    >
                      <DownloadOutlined className="text-lg" />
                      <span>Download Book 2 PDF</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleDownloadPdf('/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf', 'Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf')}
                    className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-8 text-base font-bold text-white shadow-lg transition-all hover:bg-[#b88910]"
                  >
                    <DownloadOutlined className="text-lg" />
                    <span>Download 'જીવન જીતવું છે તો...' PDF</span>
                  </button>
                )}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleResetSession}
                  className="text-xs text-[var(--text-muted)] underline hover:text-[var(--accent-earth)]"
                >
                  Purchased on another device or want to purchase another book? Click here to reset session
                </button>
              </div>
            </div>
          ) : (
            <Row gutter={[40, 32]} align="middle">
              <Col xs={24} lg={12}>
                <div className="relative overflow-hidden rounded-2xl bg-[var(--bg-warm)] p-6 text-center" style={{ border: '1px solid var(--line-soft)' }}>
                  {selectedBookId === 'combo-bundle' ? (
                    <div className="mx-auto mb-4 flex justify-center -space-x-6" style={{ maxWidth: '280px' }}>
                      <img
                        src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                        alt="Book 1 Cover"
                        className="h-56 w-36 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                      />
                      <img
                        src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                        alt="Book 2 Cover"
                        className="h-56 w-36 rounded-xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105 z-10"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto mb-4 overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:scale-105" style={{ maxWidth: '220px' }}>
                      <img
                        src={selectedBook.image}
                        alt={`${selectedBook.title} Cover`}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                  )}

                  <Tag color="gold" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
                    {selectedBook.badge}
                  </Tag>
                  <Title level={3} className="font-playfair !mb-1 !mt-3 !text-2xl !text-[var(--text-strong)]">
                    {selectedBook.title}
                  </Title>
                  <p className="text-xs font-semibold text-[var(--accent-earth)]">By Manish Vaghasiya • {selectedBook.pages}</p>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">{selectedBook.description}</p>

                  <div className="mt-4 flex items-center justify-center gap-1 text-amber-500">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <span className="ml-2 text-xs font-bold text-[var(--text-main)]">4.9/5 (35,000+ Gujarati Readers)</span>
                  </div>

                  <div className="mt-6 flex items-baseline justify-center gap-3">
                    <span className="text-3xl font-extrabold text-[var(--accent-earth)]">₹{selectedBook.price}</span>
                    <span className="text-sm text-[var(--text-muted)] line-through">₹{selectedBook.originalPrice}</span>
                    <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">{selectedBook.discountTag}</span>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div className="space-y-4">
                  <Title level={3} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                    Enter Your Details to Unlock
                  </Title>
                  <Paragraph className="!mb-4 !text-xs !text-[var(--text-soft)]">
                    After instant online payment via Razorpay, you will immediately unlock your official PDF download(s) and receive an email confirmation.
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
                      amountInRupees={selectedBook.price}
                      itemName={selectedBook.title}
                      bookId={selectedBook.id}
                      customerName={customerName}
                      customerEmail={customerEmail}
                      customerPhone={customerPhone}
                      buttonText={`Pay ₹${selectedBook.price} & Get E-Book Now`}
                      onSuccess={(data) => {
                        const info = {
                          orderId: data.orderId,
                          paymentId: data.paymentId,
                          name: customerName,
                          email: customerEmail,
                          bookId: selectedBook.id,
                          amount: selectedBook.price,
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

      {/* Book 1 Details */}
      <PageSection title="૧. જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો (મુખ્ય સામગ્રી)" description="વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ.">
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

      {/* Book 2 Details */}
      <PageSection title="૨. મન હાર્યું તો બધું હાર્યું (માનસિક મજબૂતી માસ્ટર ગાઇડ)" description="માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર માર્ગદર્શન." tone="warm">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <FireOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૧. માનસિક સ્થિરતા</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                મુશ્કેલ પરિસ્થિતિઓમાં મન પર કાબૂ રાખવાની અને હિંમત ન હારવાની અદભુત આંતરિક શક્તિ.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <TrophyOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૨. ઓવરથિંકિંગમાંથી મુક્તિ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                અતિશય વિચાર અને નિષ્ફળતાના ભયમાંથી બહાર નીકળી સકારાત્મક નિર્ણય લેવાનો માર્ગ.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <HeartOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૩. આત્મવિશ્વાસ પુનઃનિર્માણ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                મોટી હાર કે નિષ્ફળતા પછી પણ ફરીથી બમણા ઉત્સાહથી ઊભા થવાનું માનસિક સાધન.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <ThunderboltOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૪. લક્ષ્ય પર ધ્યાન (Focus)</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                સોશિયલ મીડિયા અને વિચલનો વચ્ચે પણ પોતાના ધ્યેય પર મક્કમ રહેવાનો સંકલ્પ.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <StarFilled className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૫. તણાવ મુક્ત આંતરિક શાંતિ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                રોજિંદા ટેન્શન અને સ્ટ્રેસ વચ્ચે મનની શાંતિ જાળવી રાખવાના વ્યવહારુ મંત્રો.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <GiftOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૬. સ્વ-મૂલ્યાંકન કાર્યપત્રક</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                પોતાની માનસિક શક્તિઓ માપવા માટેના વિશેષ પ્રશ્નાવલી અને ડેઇલી ટાસ્ક શ્રિંખલા.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </PageSection>
    </>
  )
}
