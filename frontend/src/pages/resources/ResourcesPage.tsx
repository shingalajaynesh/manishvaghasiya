import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useUser, SignInButton } from '@clerk/clerk-react'
import {
  BookOutlined,
  CheckCircleOutlined,
  FireOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  StarFilled,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { Card, Col, Input, Row, Tag, Typography } from 'antd'
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
    title: 'બંને માસ્ટર પુસ્તકો બંડલ',
    subtitle: 'Get Both Master E-Books & Save 65%',
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
  const { user, isSignedIn } = useUser()
  const [selectedBookId, setSelectedBookId] = useState<string>('jivan-jitvu-che')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>(['jivan-jitvu-che'])

  const [purchased, setPurchased] = useState<{
    orderId: string
    paymentId: string
    name?: string
    email?: string
    bookId?: string
    amount?: number
  } | null>(null)

  // Automatically pre-fill name and email when user is logged in
  useEffect(() => {
    if (isSignedIn && user) {
      setCustomerName(user.fullName || user.firstName || '')
      setCustomerEmail(user.primaryEmailAddress?.emailAddress || '')
    }
  }, [isSignedIn, user])

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
          if (parsed.bookId === 'combo-bundle') {
            setPurchasedBookIds(['jivan-jitvu-che', 'man-haryu-to-badhu-haryu', 'combo-bundle'])
          } else if (parsed.bookId && !purchasedBookIds.includes(parsed.bookId)) {
            setPurchasedBookIds((prev) => [...prev, parsed.bookId])
          }
        }
      }
    } catch (e) {
      console.error('Failed restoring purchase state from localStorage:', e)
    }
  }, [location.search])

  const isBookOwned = (id: string) => {
    if (purchasedBookIds.includes('combo-bundle') || purchased?.bookId === 'combo-bundle') {
      return true
    }
    if (purchasedBookIds.includes(id) || purchased?.bookId === id) {
      return true
    }
    return false
  }

  const hasPurchasedBook1 = isBookOwned('jivan-jitvu-che')
  const hasPurchasedBook2 = isBookOwned('man-haryu-to-badhu-haryu')
  const hasPurchasedOneBook = (hasPurchasedBook1 || hasPurchasedBook2) && !(hasPurchasedBook1 && hasPurchasedBook2)
  const isComboOwned = (hasPurchasedBook1 && hasPurchasedBook2) || isBookOwned('combo-bundle')

  // Smart Combo Upgrade calculation: If user already paid ₹199 for 1 book, upgrade cost is ₹150 (₹349 - ₹199 = ₹150)
  const effectiveComboPrice = hasPurchasedOneBook ? 150 : 349

  const selectedBook = BOOKS[selectedBookId] || BOOKS['jivan-jitvu-che']
  const activeCheckoutPrice = selectedBookId === 'combo-bundle' ? effectiveComboPrice : selectedBook.price

  const handleResetSession = () => {
    localStorage.removeItem('mv_ebook_purchased')
    setPurchased(null)
    setPurchasedBookIds([])
  }

  return (
    <>
      <SeoHead
        title="Manish Vaghasiya Master Gujarati E-Books | Buy & Download PDF"
        description="Buy and read official Gujarati master E-Books by Manish Vaghasiya: 'Jivan Jitvu Che To Parivar Thi Sharu Karo' & 'Man Haryu To Badhu Haryu' or get the Master Combo Bundle."
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
                  {hasPurchasedBook1 ? (
                    <Tag color="green" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      ✓ UNLOCKED
                    </Tag>
                  ) : (
                    <Tag color="gold" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      BOOK 1
                    </Tag>
                  )}
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    જીવન જીતવું છે તો પરિવારથી...
                  </div>
                  {hasPurchasedBook1 ? (
                    <div className="mt-1 text-xs font-bold text-green-700">Owned & Ready</div>
                  ) : (
                    <div className="mt-1 text-xs font-bold text-[var(--accent-earth)]">₹199</div>
                  )}
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
                  {hasPurchasedBook2 ? (
                    <Tag color="green" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      ✓ UNLOCKED
                    </Tag>
                  ) : (
                    <Tag color="blue" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      NEW • BOOK 2
                    </Tag>
                  )}
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    મન હાર્યું તો બધું હાર્યું
                  </div>
                  {hasPurchasedBook2 ? (
                    <div className="mt-1 text-xs font-bold text-green-700">Owned & Ready</div>
                  ) : (
                    <div className="mt-1 text-xs font-bold text-[var(--accent-earth)]">₹199</div>
                  )}
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
                  {isComboOwned ? (
                    <Tag color="green" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      ✓ FULL PACK UNLOCKED
                    </Tag>
                  ) : hasPurchasedOneBook ? (
                    <Tag color="orange" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      ⚡ SMART UPGRADE (₹150)
                    </Tag>
                  ) : (
                    <Tag color="red" className="!mb-1 !rounded-md !text-[10px] !font-bold">
                      COMBO BUNDLE
                    </Tag>
                  )}
                  <div className="font-playfair text-sm font-bold text-[var(--text-strong)] leading-tight">
                    બંને માસ્ટર પુસ્તકો બંડલ
                  </div>
                  {isComboOwned ? (
                    <div className="mt-1 text-xs font-bold text-green-700">Full Pack Owned</div>
                  ) : hasPurchasedOneBook ? (
                    <div className="mt-1 text-xs font-bold text-amber-700">Pay Balance ₹150 to Upgrade</div>
                  ) : (
                    <div className="mt-1 text-xs font-bold text-emerald-700">₹349 <span className="text-[10px] font-normal text-gray-400 line-through">₹998</span></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Card / Checkout */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial-lg sm:p-10">
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

                {isComboOwned || isBookOwned(selectedBookId) ? (
                  <Tag color="green" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
                    ✓ UNLOCKED IN YOUR ACCOUNT
                  </Tag>
                ) : hasPurchasedOneBook && selectedBookId === 'combo-bundle' ? (
                  <Tag color="orange" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
                    ⚡ SMART COMBO UPGRADE (PAY ₹150 BALANCE)
                  </Tag>
                ) : (
                  <Tag color="gold" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
                    {selectedBook.badge}
                  </Tag>
                )}

                <Title level={3} className="font-playfair !mb-1 !mt-3 !text-2xl !text-[var(--text-strong)]">
                  {selectedBook.title}
                </Title>
                <p className="text-xs font-semibold text-[var(--accent-earth)]">By Manish Vaghasiya • {selectedBook.pages}</p>
                <p className="mt-1 text-xs text-[var(--text-soft)]">
                  {hasPurchasedOneBook && selectedBookId === 'combo-bundle'
                    ? 'Upgrade to unlock both books! Since you already paid ₹199 for 1 book, pay only ₹150 balance.'
                    : selectedBook.description}
                </p>

                <div className="mt-4 flex items-center justify-center gap-1 text-amber-500">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <span className="ml-2 text-xs font-bold text-[var(--text-main)]">4.9/5 (35,000+ Gujarati Readers)</span>
                </div>

                {!(isComboOwned || isBookOwned(selectedBookId)) && (
                  <div className="mt-6 flex items-baseline justify-center gap-3">
                    <span className="text-3xl font-extrabold text-[var(--accent-earth)]">₹{activeCheckoutPrice}</span>
                    <span className="text-sm text-[var(--text-muted)] line-through">₹{selectedBook.originalPrice}</span>
                    <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      {hasPurchasedOneBook && selectedBookId === 'combo-bundle' ? '₹199 CREDIT APPLIED' : selectedBook.discountTag}
                    </span>
                  </div>
                )}
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div className="space-y-4">
                {(isComboOwned || (selectedBookId !== 'combo-bundle' && isBookOwned(selectedBookId))) ? (
                  <div className="rounded-2xl border border-green-300 bg-green-50/90 p-6 text-center shadow-md">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white">
                      <CheckCircleOutlined className="text-2xl" />
                    </div>
                    <h4 className="font-playfair text-lg font-bold text-green-900">
                      ✓ You Already Own This Master E-Book!
                    </h4>
                    <p className="mt-1 text-xs text-green-700">
                      Double payment prevented. You have already unlocked this e-book. You can read it online anytime!
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Link to={`/reader/${selectedBookId === 'combo-bundle' ? 'jivan-jitvu-che' : selectedBookId}`}>
                        <button className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-6 text-sm font-bold text-white shadow-md hover:bg-[#b88910]">
                          <BookOutlined className="text-base" />
                          <span>📖 Read Online Now (DRM Reader)</span>
                        </button>
                      </Link>
                      <Link to="/dashboard">
                        <button className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 text-sm font-bold text-white shadow-md hover:bg-slate-900">
                          <span>Go to My Dashboard</span>
                        </button>
                      </Link>
                      <button onClick={handleResetSession} className="mt-1 text-[11px] text-gray-400 underline hover:text-gray-600">
                        Reset purchase session for testing
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Title level={3} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                      {hasPurchasedOneBook && selectedBookId === 'combo-bundle' ? 'Smart Upgrade to Master Combo' : 'Enter Your Details to Unlock'}
                    </Title>
                    <Paragraph className="!mb-4 !text-xs !text-[var(--text-soft)]">
                      {hasPurchasedOneBook && selectedBookId === 'combo-bundle'
                        ? 'Pay the ₹150 balance to unlock the 2nd book in your library immediately!'
                        : 'After instant online payment via Razorpay, you will immediately unlock your official PDF reading access in your personal dashboard.'}
                    </Paragraph>

                    {!isSignedIn ? (
                      <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 text-center shadow-sm">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white">
                          <LockOutlined className="text-xl" />
                        </div>
                        <h4 className="font-playfair text-base font-bold text-[var(--text-strong)]">
                          🔒 Account Sign-In Required
                        </h4>
                        <p className="mt-1 text-xs text-[var(--text-soft)]">
                          Please sign in or register your free account to purchase e-books. All purchased books will be saved to your reader dashboard.
                        </p>
                        <div className="mt-4">
                          <SignInButton mode="modal">
                            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#D4A017] py-3 text-sm font-bold text-white shadow-md hover:bg-[#b88910]">
                              Sign In / Register Account to Buy
                            </button>
                          </SignInButton>
                        </div>
                      </div>
                    ) : (
                      <>
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
                            disabled
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-2">
                      <RazorpayCheckout
                        amountInRupees={activeCheckoutPrice}
                        itemName={hasPurchasedOneBook && selectedBookId === 'combo-bundle' ? 'Smart Combo Upgrade (2nd Book Unlock)' : selectedBook.title}
                        bookId={selectedBook.id}
                        customerName={customerName}
                        customerEmail={customerEmail}
                        buttonText={
                          hasPurchasedOneBook && selectedBookId === 'combo-bundle'
                            ? 'Pay Balance ₹150 & Unlock Both Books'
                            : `Pay ₹${activeCheckoutPrice} & Get E-Book Now`
                        }
                        onSuccess={(data) => {
                          const info = {
                            orderId: data.orderId,
                            paymentId: data.paymentId,
                            name: customerName,
                            email: customerEmail,
                            bookId: 'combo-bundle',
                            amount: activeCheckoutPrice,
                          }
                          setPurchased(info)
                          setPurchasedBookIds(['jivan-jitvu-che', 'man-haryu-to-badhu-haryu', 'combo-bundle'])
                          try {
                            localStorage.setItem('mv_ebook_purchased', JSON.stringify(info))
                          } catch (e) {
                            console.error(e)
                          }
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-center gap-4 text-center text-xs text-[var(--text-muted)] pt-2">
                  <span className="flex items-center gap-1"><SafetyCertificateOutlined /> 100% Secure Razorpay Payment</span>
                  <span className="flex items-center gap-1"><ThunderboltOutlined /> Instant DRM Online Reader</span>
                </div>
              </div>
            </Col>
          </Row>
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
                <StarFilled className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૩. આત્મવિશ્વાસનું નિર્માણ</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                અંદરથી જાગતો સાચો આત્મવિશ્વાસ જે દુનિયાના કોઈ પણ પડકાર સામે ઝૂકવા ન દે.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircleOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૪. ડિપ્રેશન & તણાવ દૂર</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                જીવનમાં આવતા માનસિક તણાવ, એકલતા અને હતાશા સામે વિજય મેળવવાની ટેકનિકો.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4A017] text-white">
                <BookOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૫. શક્તિશાળી આદતો</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                રોજિંદા જીવનમાં સવારે અને રાત્રે કરવાના ૫ માનસિક અભ્યાસ જે મનને મજબૂત બનાવે છે.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12} lg={4}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-editorial">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ThunderboltOutlined className="text-xl" />
              </div>
              <Title level={4} className="font-playfair !mb-2 !text-base">૬. ૩૦ દિવસનો માઇન્ડસેટ પ્લાન</Title>
              <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)]">
                મનને અજેય બનાવતો ૩૦ દિવસનો સ્ટેપ-બાય-સ્ટેપ પ્રેક્ટિકલ માઇન્ડસેટ ગાઇડ.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </PageSection>
    </>
  )
}
