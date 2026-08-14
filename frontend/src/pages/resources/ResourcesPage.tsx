import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  BookOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  FireOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  StarFilled,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { Card, Col, Drawer, Input, notification, Row, Tag, Typography } from 'antd'
import { PageHero } from '../../shared/components/site/PageHero'
import { PageSection } from '../../shared/components/site/PageSection'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { RazorpayCheckout } from '../../shared/components/payment/RazorpayCheckout'
import { syncUserPurchasesFromBackend, isBookOwned as checkIsBookOwned } from '../../shared/lib/userPurchases'

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
  highlights: string[]
}

const BOOKS: Record<string, EbookDetail> = {
  'jivan-jitvu-che': {
    id: 'jivan-jitvu-che',
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    subtitle: 'Jivan Jitvu Che To Parivar Thi Sharu Karo',
    description:
      'વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ. A 276-page master handbook on family harmony, youth parenting & emotional strength by Manish Vaghasiya.',
    pages: '276 Pages (Full Master Edition)',
    price: 199,
    originalPrice: 499,
    discountTag: '60% OFF',
    image: '/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
    pdf: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
    badge: 'PARIVAR & PARENTING BESTSELLER',
    highlights: [
      'પરિવારનું સાચું મૂલ્ય અને આપણી જવાબદારી',
      'મોબાઇલ વ્યસનમાંથી મુક્તિ અને કૌટુંબિક સંવાદ',
      'માર્ક્સ વિરુદ્ધ બાળકના સંસ્કાર અને માનસિક ઘડતર',
      '૨૧ દિવસનો પરિવાર પરિવર્તન પ્રેક્ટિકલ પડકાર',
    ],
  },
  'man-haryu-to-badhu-haryu': {
    id: 'man-haryu-to-badhu-haryu',
    title: 'મન હાર્યું તો બધું હાર્યું',
    subtitle: 'Man Haryu To Badhu Haryu',
    description:
      'માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર ગાઇડ. Master your thoughts, conquer overthinking & build unbreakable resilience.',
    pages: '250+ Pages (Full Master Edition)',
    price: 199,
    originalPrice: 499,
    discountTag: '60% OFF',
    image: '/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png',
    pdf: '/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf',
    badge: 'MINDSET & CONFIDENCE MASTER',
    highlights: [
      'ઓવરથિંકિંગ અને ચિંતામાંથી કાયમી મુક્તિ',
      'નિષ્ફળતા અને નિરાશામાંથી પુનઃનિર્માણની શક્તિ',
      'અંદરથી જાગતો સાચો અને અડગ આત્મવિશ્વાસ',
      '૩૦ દિવસનો પ્રેક્ટિકલ માઇન્ડસેટ બ્લૂપ્રિન્ટ',
    ],
  },
  'combo-bundle': {
    id: 'combo-bundle',
    title: 'બંને માસ્ટર પુસ્તકો બંડલ (Complete Collection)',
    subtitle: 'Get Both Master E-Books & Save 65%',
    description:
      'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો + મન હાર્યું તો બધું હાર્યું. Complete family, youth guidance & mindset master library by Manish Vaghasiya.',
    pages: '526+ Total Pages (2 Complete Master Editions)',
    price: 349,
    originalPrice: 998,
    discountTag: 'SAVE 65% • BEST VALUE',
    image: '/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png',
    pdf: 'combo',
    badge: 'MOST POPULAR • MAXIMUM SAVINGS',
    highlights: [
      'બંને માસ્ટર ઈ-બુકના સંપૂર્ણ ૨૭૬ + ૨૫૦ પૃષ્ઠો',
      'ઇન્સ્ટન્ટ PDF ડાઉનલોડ (ઓફલાઇન વાંચવા માટે)',
      'ઇન્ટરેક્ટિવ વેબ રીડરનું લાઇફટાઇમ એક્સેસ',
      'વિદ્યાર્થી કોન્ફિડન્સ સ્ટાર્ટર ગાઇડ બોનસ સાથે',
    ],
  },
}

export function ResourcesPage() {
  const location = useLocation()
  const { user, isSignedIn } = useUser()

  const [selectedBookId, setSelectedBookId] = useState<string>('combo-bundle')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const [lookupEmail, setLookupEmail] = useState('')
  const [lookupLoading, setLookupLoading] = useState(false)
  const [lookupDrawerOpen, setLookupDrawerOpen] = useState(false)

  const [purchasedBookIds, setPurchasedBookIds] = useState<string[]>([])
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

  // Check saved local storage purchases or URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const bookParam = searchParams.get('book')
    if (bookParam && BOOKS[bookParam]) {
      setSelectedBookId(bookParam)
    }

    try {
      const saved = localStorage.getItem('mv_ebook_purchased')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.email && !customerEmail) {
          setCustomerEmail(parsed.email)
        }
      }
    } catch (e) {
      console.error(e)
    }

    if (user?.id && user?.primaryEmailAddress?.emailAddress) {
      syncUserPurchasesFromBackend(user.id, user.primaryEmailAddress.emailAddress).then((owned) => {
        setPurchasedBookIds(owned)
      })
    }
  }, [location.search, user?.id, user?.primaryEmailAddress?.emailAddress])

  const isBookOwned = (id: string) => {
    if (purchasedBookIds.includes(id) || purchasedBookIds.includes('combo-bundle')) return true
    if (purchased?.bookId === id || purchased?.bookId === 'combo-bundle') return true
    if (isSignedIn && user?.id && checkIsBookOwned(user.id, id)) return true
    return false
  }

  const hasPurchasedBook1 = isBookOwned('jivan-jitvu-che')
  const hasPurchasedBook2 = isBookOwned('man-haryu-to-badhu-haryu')
  const hasPurchasedOneBook =
    (hasPurchasedBook1 || hasPurchasedBook2) && !(hasPurchasedBook1 && hasPurchasedBook2)
  const isComboOwned = (hasPurchasedBook1 && hasPurchasedBook2) || isBookOwned('combo-bundle')

  // Smart Upgrade price
  const effectiveComboPrice = hasPurchasedOneBook ? 150 : 349
  const selectedBook = BOOKS[selectedBookId] || BOOKS['combo-bundle']
  const activeCheckoutPrice =
    selectedBookId === 'combo-bundle' ? effectiveComboPrice : selectedBook.price

  // Direct Master PDF Download Trigger
  const handleDownloadPdf = (bookKey: string) => {
    const target = BOOKS[bookKey]
    if (!target) return
    const link = document.createElement('a')
    link.href = target.pdf
    link.download = `${target.id}-Manish-Vaghasiya-Master-Edition.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    notification.success({
      message: 'Master PDF Download Started',
      description: `Complete high-resolution PDF for '${target.title}' is saving to your device.`,
    })
  }

  // Handle Find My Purchases via Email Lookup
  const handleEmailLookup = async () => {
    if (!lookupEmail || !lookupEmail.includes('@')) {
      notification.warning({
        message: 'Invalid Email',
        description: 'Please enter a valid email address used during purchase.',
      })
      return
    }

    setLookupLoading(true)
    try {
      const res = await fetch(
        `https://manishvaghasiya.onrender.com/api/payment/my-purchased-books?email=${encodeURIComponent(
          lookupEmail.trim()
        )}`
      )
      const data = await res.json()
      if (data?.purchasedBooks && data.purchasedBooks.length > 0) {
        setPurchasedBookIds((prev) => Array.from(new Set([...prev, ...data.purchasedBooks])))
        notification.success({
          message: 'Purchases Found',
          description: `We unlocked ${data.purchasedBooks.length} master e-book(s) linked to ${lookupEmail}.`,
        })
        setCustomerEmail(lookupEmail.trim())
        setLookupDrawerOpen(false)
      } else {
        notification.info({
          message: 'No Active Purchases Found',
          description: `No completed orders found for ${lookupEmail}. If you purchased recently, please check your payment receipt email or contact support.`,
        })
      }
    } catch (e) {
      notification.error({
        message: 'Lookup Error',
        description: 'Could not connect to server. Please try again later.',
      })
    } finally {
      setLookupLoading(false)
    }
  }

  return (
    <>
      <SeoHead
        title="Official Gujarati Master E-Books Store | Manish Vaghasiya"
        description="Buy, preview, and download official Gujarati master E-Books by Manish Vaghasiya: 'Jivan Jitvu Che To Parivar Thi Sharu Karo' & 'Man Haryu To Badhu Haryu' or get the Master Combo Bundle."
        canonicalUrl="https://www.manishvaghasiya.com/resources"
      />

      {/* Hero Section */}
      <PageHero
        eyebrow="Official Master Gujarati E-Books Publishing Store"
        title="મનીષ વાઘાણિયા માસ્ટર ઈ-બુક સ્ટોર"
        description="સંસ્કાર, પરિવાર, માનસિક મજબૂતી અને સફળ જીવન માટેના બે સૌથી લોકપ્રિય ગુજરાતી પુસ્તકો. ઇન્સ્ટન્ટ PDF ડાઉનલોડ અને ઇન્ટરેક્ટિવ વેબ રીડર સાથે."
      />

      {/* Top Banner: Instant Email Retrieval & Free Preview Info */}
      <section className="editorial-container px-2 sm:px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4A017] text-white">
              <BookOutlined className="text-lg" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--text-strong)] sm:text-sm">
                વાંચવા માટે અનુકૂળ: ડાઉનલોડ અથવા ઓનલાઇન રીડર
              </div>
              <div className="text-[11px] text-[var(--text-soft)]">
                દરેક પુસ્તકના પ્રથમ ૧૫ પૃષ્ઠો મફત વાંચો અથવા ખરીદીને આખું PDF ડાઉનલોડ કરો.
              </div>
            </div>
          </div>
          <button
            onClick={() => setLookupDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm transition hover:bg-amber-50"
          >
            <SearchOutlined />
            <span>પહેલાં ખરીદેલ છે? Email થી મેળવો</span>
          </button>
        </div>
      </section>

      {/* Book Catalog / Showcase Cards */}
      <PageSection title="ઓફિશિયલ માસ્ટર ઈ-બુક્સ સિલેક્શન" tone="warm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Jivan Jitvu Che */}
          <div
            className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
              selectedBookId === 'jivan-jitvu-che'
                ? 'border-[#D4A017] bg-amber-50/50 shadow-xl ring-2 ring-[#D4A017]'
                : 'border-[var(--line-soft)] bg-white hover:border-amber-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Tag color="gold" className="!rounded-md !px-2.5 !py-0.5 !text-xs !font-bold">
                  BOOK 1 • BESTSELLER
                </Tag>
                {hasPurchasedBook1 && (
                  <Tag color="green" className="!rounded-md !px-2.5 !py-0.5 !text-xs !font-bold">
                    UNLOCKED
                  </Tag>
                )}
              </div>

              <div className="mx-auto mb-5 overflow-hidden rounded-2xl shadow-lg" style={{ maxWidth: '170px' }}>
                <img
                  src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                  alt="Jivan Jitvu Che To Parivar Thi Sharu Karo Cover"
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h3 className="font-playfair text-lg font-bold text-[var(--text-strong)] leading-snug">
                જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો
              </h3>
              <p className="mt-1 text-xs font-semibold text-[var(--accent-earth)]">
                By Manish Vaghasiya • 276 Pages
              </p>
              <p className="mt-2 text-xs text-[var(--text-soft)] leading-relaxed">
                વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                {BOOKS['jivan-jitvu-che'].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--line-soft)] pt-4">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[var(--accent-earth)]">₹199</span>
                  <span className="ml-2 text-xs text-gray-400 line-through">₹499</span>
                </div>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                  60% OFF
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {hasPurchasedBook1 ? (
                  <>
                    <button
                      onClick={() => handleDownloadPdf('jivan-jitvu-che')}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow hover:bg-emerald-700"
                    >
                      <DownloadOutlined />
                      <span>Download Master PDF</span>
                    </button>
                    <Link
                      to="/reader/jivan-jitvu-che"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      <EyeOutlined />
                      <span>Read in Web Reader</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedBookId('jivan-jitvu-che')
                        document.getElementById('checkout-box')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-4 text-xs font-bold text-white shadow hover:bg-[#b88910]"
                    >
                      <ThunderboltOutlined />
                      <span>Buy Master E-Book (₹199)</span>
                    </button>
                    <Link
                      to="/reader/jivan-jitvu-che"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50/60 px-4 text-xs font-bold text-amber-900 hover:bg-amber-100"
                    >
                      <EyeOutlined />
                      <span>Look Inside (Pages 1–15 Free)</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Man Haryu To Badhu Haryu */}
          <div
            className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
              selectedBookId === 'man-haryu-to-badhu-haryu'
                ? 'border-[#D4A017] bg-amber-50/50 shadow-xl ring-2 ring-[#D4A017]'
                : 'border-[var(--line-soft)] bg-white hover:border-amber-300 hover:shadow-md'
            }`}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Tag color="blue" className="!rounded-md !px-2.5 !py-0.5 !text-xs !font-bold">
                  NEW • BOOK 2
                </Tag>
                {hasPurchasedBook2 && (
                  <Tag color="green" className="!rounded-md !px-2.5 !py-0.5 !text-xs !font-bold">
                    UNLOCKED
                  </Tag>
                )}
              </div>

              <div className="mx-auto mb-5 overflow-hidden rounded-2xl shadow-lg" style={{ maxWidth: '170px' }}>
                <img
                  src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                  alt="Man Haryu To Badhu Haryu Cover"
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h3 className="font-playfair text-lg font-bold text-[var(--text-strong)] leading-snug">
                મન હાર્યું તો બધું હાર્યું
              </h3>
              <p className="mt-1 text-xs font-semibold text-[var(--accent-earth)]">
                By Manish Vaghasiya • 250+ Pages
              </p>
              <p className="mt-2 text-xs text-[var(--text-soft)] leading-relaxed">
                માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર ગાઇડ.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                {BOOKS['man-haryu-to-badhu-haryu'].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-[var(--line-soft)] pt-4">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-extrabold text-[var(--accent-earth)]">₹199</span>
                  <span className="ml-2 text-xs text-gray-400 line-through">₹499</span>
                </div>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                  60% OFF
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {hasPurchasedBook2 ? (
                  <>
                    <button
                      onClick={() => handleDownloadPdf('man-haryu-to-badhu-haryu')}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow hover:bg-emerald-700"
                    >
                      <DownloadOutlined />
                      <span>Download Master PDF</span>
                    </button>
                    <Link
                      to="/reader/man-haryu-to-badhu-haryu"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-800 hover:bg-slate-50"
                    >
                      <EyeOutlined />
                      <span>Read in Web Reader</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedBookId('man-haryu-to-badhu-haryu')
                        document.getElementById('checkout-box')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-4 text-xs font-bold text-white shadow hover:bg-[#b88910]"
                    >
                      <ThunderboltOutlined />
                      <span>Buy Master E-Book (₹199)</span>
                    </button>
                    <Link
                      to="/reader/man-haryu-to-badhu-haryu"
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50/60 px-4 text-xs font-bold text-amber-900 hover:bg-amber-100"
                    >
                      <EyeOutlined />
                      <span>Look Inside (Pages 1–15 Free)</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Master Combo Bundle (High converting spotlight) */}
          <div
            className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
              selectedBookId === 'combo-bundle'
                ? 'border-[#D4A017] bg-gradient-to-br from-amber-50 to-orange-50/80 shadow-2xl ring-2 ring-[#D4A017]'
                : 'border-amber-300 bg-gradient-to-br from-amber-50/40 to-orange-50/30 hover:border-amber-400 hover:shadow-lg'
            }`}
          >
            <div className="absolute top-0 right-0 rounded-bl-2xl bg-[#D4A017] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
              SAVE 65% • BEST VALUE
            </div>

            <div>
              <div className="mb-4">
                <Tag color="red" className="!rounded-md !px-2.5 !py-0.5 !text-xs !font-bold">
                  COMPLETE 2-BOOK BUNDLE
                </Tag>
              </div>

              <div className="mx-auto mb-5 flex justify-center -space-x-8" style={{ maxWidth: '240px' }}>
                <img
                  src="/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png"
                  alt="Book 1"
                  className="h-44 w-28 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
                <img
                  src="/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png"
                  alt="Book 2"
                  className="h-44 w-28 rounded-xl object-cover shadow-2xl transition-transform duration-300 hover:scale-105 z-10"
                />
              </div>

              <h3 className="font-playfair text-lg font-bold text-[var(--text-strong)] leading-snug">
                બંને માસ્ટર પુસ્તકો કલેક્શન
              </h3>
              <p className="mt-1 text-xs font-semibold text-amber-800">
                2 Full Master Editions • 526+ Total Pages
              </p>
              <p className="mt-2 text-xs text-[var(--text-soft)] leading-relaxed">
                પરિવાર સંબંધો અને માનસિક મજબૂતીનું સંપૂર્ણ માસ્ટર લાયબ્રેરી પેકેજ.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-800 font-medium">
                {BOOKS['combo-bundle'].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircleOutlined className="mt-0.5 text-amber-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-amber-200 pt-4">
              <div className="mb-4 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-amber-900">
                    ₹{effectiveComboPrice}
                  </span>
                  <span className="ml-2 text-xs text-gray-400 line-through">₹998</span>
                </div>
                <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                  {hasPurchasedOneBook ? '₹199 CREDIT APPLIED' : 'SAVE ₹649'}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {isComboOwned ? (
                  <div className="rounded-xl border border-green-300 bg-green-50 p-3 text-center">
                    <div className="text-xs font-bold text-green-800">Full Pack Unlocked</div>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleDownloadPdf('jivan-jitvu-che')}
                        className="flex-1 rounded-lg bg-emerald-600 py-1.5 text-xs font-bold text-white"
                      >
                        PDF 1
                      </button>
                      <button
                        onClick={() => handleDownloadPdf('man-haryu-to-badhu-haryu')}
                        className="flex-1 rounded-lg bg-emerald-600 py-1.5 text-xs font-bold text-white"
                      >
                        PDF 2
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedBookId('combo-bundle')
                      document.getElementById('checkout-box')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-4 text-xs font-extrabold text-white shadow-lg hover:from-amber-700 hover:to-amber-800"
                  >
                    <ThunderboltOutlined />
                    <span>
                      {hasPurchasedOneBook
                        ? 'Upgrade to Combo (Pay ₹150)'
                        : 'Get Both Books Bundle (₹349)'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Interactive Checkout Section */}
      <section id="checkout-box" className="editorial-container px-2 sm:px-4 py-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial-lg sm:p-10">
          <Row gutter={[40, 32]} align="middle">
            {/* Left: Summary Visual */}
            <Col xs={24} lg={11}>
              <div className="rounded-2xl bg-[var(--bg-warm)] p-6 text-center border border-[var(--line-soft)]">
                <Tag color="gold" className="!mb-3 !rounded-full !px-3 !py-0.5 !text-xs !font-bold">
                  {selectedBook.badge}
                </Tag>
                <Title level={3} className="font-playfair !mb-1 !text-2xl !text-[var(--text-strong)]">
                  {selectedBook.title}
                </Title>
                <p className="text-xs font-semibold text-[var(--accent-earth)]">
                  {selectedBook.pages}
                </p>
                <p className="mt-2 text-xs text-[var(--text-soft)] leading-relaxed">
                  {selectedBook.description}
                </p>

                <div className="mt-4 flex items-center justify-center gap-1 text-amber-500">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <span className="ml-2 text-xs font-bold text-slate-800">4.9 / 5 (35,000+ Readers)</span>
                </div>

                <div className="mt-6 flex items-baseline justify-center gap-3">
                  <span className="text-3xl font-extrabold text-[var(--accent-earth)]">
                    ₹{activeCheckoutPrice}
                  </span>
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    ₹{selectedBook.originalPrice}
                  </span>
                  <span className="rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    {selectedBook.discountTag}
                  </span>
                </div>
              </div>
            </Col>

            {/* Right: Customer Form & Razorpay Pay Button */}
            <Col xs={24} lg={13}>
              <div className="space-y-4">
                <div>
                  <Title level={4} className="font-playfair !mb-1 !text-xl !text-[var(--text-strong)]">
                    Instant E-Book Delivery Details
                  </Title>
                  <Paragraph className="!mb-4 !text-xs !text-[var(--text-soft)]">
                    Enter your details below. You will instantly receive your Master PDF download link and Web Reader access upon payment.
                  </Paragraph>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Your Full Name *
                    </label>
                    <Input
                      placeholder="e.g. Ramesh Patel"
                      size="large"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="!rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Your Email Address (For PDF Download Link & Receipt) *
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. ramesh@gmail.com"
                      size="large"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="!rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <RazorpayCheckout
                    amountInRupees={activeCheckoutPrice}
                    itemName={selectedBook.title}
                    bookId={selectedBook.id}
                    customerName={customerName || 'Valued Reader'}
                    customerEmail={customerEmail || 'reader@example.com'}
                    buttonText={`Pay ₹${activeCheckoutPrice} & Get Instant E-Book Access`}
                    onSuccess={(data) => {
                      const info = {
                        orderId: data.orderId,
                        paymentId: data.paymentId,
                        name: customerName,
                        email: customerEmail,
                        bookId: selectedBook.id,
                        amount: activeCheckoutPrice,
                      }
                      setPurchased(info)
                      if (selectedBook.id === 'combo-bundle') {
                        setPurchasedBookIds(['jivan-jitvu-che', 'man-haryu-to-badhu-haryu', 'combo-bundle'])
                      } else {
                        setPurchasedBookIds((prev) => [...prev, selectedBook.id])
                      }
                      try {
                        localStorage.setItem('mv_ebook_purchased', JSON.stringify(info))
                      } catch (e) {
                        console.error(e)
                      }
                      notification.success({
                        message: 'Purchase Successful',
                        description: 'Your payment was confirmed. You can now download your master PDF or read online.',
                      })
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-[var(--text-muted)] border-t border-[var(--line-soft)]">
                  <span className="flex items-center gap-1">
                    <SafetyCertificateOutlined className="text-emerald-600" />
                    256-bit Secure Razorpay SSL
                  </span>
                  <span className="flex items-center gap-1">
                    <DownloadOutlined className="text-amber-600" />
                    Instant Offline PDF Download
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Book 1 Curriculum Breakdown */}
      <PageSection
        title="૧. જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો (વિસ્તૃત વિષયસૂચિ)"
        description="પરિવાર, સંબંધો, બાળ ઘડતર અને જીવન જીવવાની કળાના ૧૨ પ્રકરણો."
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <BookOutlined className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૧. પરિવારનું સાચું સ્થાન & જવાબદારી
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                દોડધામ ભરેલા જીવનમાં સાચી શાંતિ અને પરિવારની શક્તિ ઓળખવાની પ્રેરણાદાયી સમજૂતી.
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ThunderboltOutlined className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૨. ડિજિટલ ડિટોક્સ & કૌટુંબિક સંવાદ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                સ્ક્રીન ટાઇમમાંથી બહાર નીકળીને દિલથી દિલનો સંપર્ક કરવાનો પ્રેક્ટિકલ માર્ગ.
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <StarFilled className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૩. બાળકનું મન & પેરેન્ટિંગ માસ્ટરી
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                માર્ક્સની સરખામણી બંધ કરી બાળકના અનન્ય વ્યક્તિત્વને ખીલવવાની પદ્ધતિ.
              </p>
            </Card>
          </Col>
        </Row>
      </PageSection>

      {/* Book 2 Curriculum Breakdown */}
      <PageSection
        title="૨. મન હાર્યું તો બધું હાર્યું (માનસિક મજબૂતી માર્ગદર્શન)"
        description="ચિંતા, હતાશા, ઓવરથિંકિંગ અને નિષ્ફળતાના ડર પર વિજય મેળવવાનું પુસ્તક."
        tone="warm"
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <FireOutlined className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૧. આંતરિક શક્તિ & મનનો કાબૂ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                બહારની પરિસ્થિતિ ગમે તે હોય, અંદરનું સંતુલન જાળવી રાખવાની કળા.
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <TrophyOutlined className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૨. ઓવરથિંકિંગમાંથી મુક્તિ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ભૂતકાળની ચિંતા અને ભવિષ્યના ભયને છોડી વર્તમાનમાં સક્રિય પગલાં ભરવાનો અભ્યાસ.
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card variant="borderless" className="h-full rounded-2xl border border-[var(--line-soft)] bg-white p-2 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircleOutlined className="text-lg" />
              </div>
              <h4 className="font-playfair text-base font-bold text-slate-900 mb-1">
                ૩. નિષ્ફળતામાંથી પુનઃનિર્માણ
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                દરેક પછડાટમાંથી શીખીને બમણા જોશથી ફરી ઊભા થવાનો અડગ આત્મવિશ્વાસ.
              </p>
            </Card>
          </Col>
        </Row>
      </PageSection>

      {/* Reader Testimonials Section */}
      <PageSection title="ગુજરાતી વાચકોના સાચા પ્રતિભાવો (Reader Reviews)" tone="warm">
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <div className="h-full rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "મનીષભાઈનું 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો' પુસ્તક વાંચ્યા પછી અમારા ઘરમાં રોજ રાત્રે સાથે બેસવાનો નિયમ શરૂ થયો. પરિવારમાં એક અલગ જ પ્રેમ અનુભવાય છે."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-800 text-xs">
                  PP
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">પ્રકાશ પટેલ</div>
                  <div className="text-[10px] text-slate-500">અમદાવાદ, ગુજરાત</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="h-full rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "'મન હાર્યું તો બધું હાર્યું' એ મારી પરીક્ષાના તણાવ અને ઓવરથિંકિંગને સંપૂર્ણપણે દૂર કરી દીધું. દરેક વિદ્યાર્થી અને યુવાને આ પુસ્તક જરૂર વાંચવું જોઈએ."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800 text-xs">
                  JS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">જયેશ શાહ</div>
                  <div className="text-[10px] text-slate-500">સુરત, ગુજરાત</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="h-full rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                "બંને પુસ્તકોનું કોમ્બો પેક લીધું અને તરત PDF ડાઉનલોડ થઈ ગયું. ફોનમાં સરળતાથી વાંચી શકાય છે અને પ્રિન્ટેડ બુક જેવી જ સુંદર ક્વોલિટી છે."
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800 text-xs">
                  BV
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">ભાવનાબેન વાઘેલા</div>
                  <div className="text-[10px] text-slate-500">રાજકોટ, ગુજરાત</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </PageSection>

      {/* Find My Purchases Drawer (Email Lookup) */}
      <Drawer
        title="Find My Purchased E-Books (મારી ખરીદેલી ઈ-બુક્સ શોધો)"
        placement="right"
        onClose={() => setLookupDrawerOpen(false)}
        open={lookupDrawerOpen}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            જો તમે અગાઉ આ વેબસાઇટ પરથી કોઈ પણ ઈ-બુક ખરીદી હોય, તો તમારો ઇમેઇલ દાખલ કરો. સિસ્ટમ આપોઆપ તમારી બધી ખરીદેલી પુસ્તકો અનલૉક કરી આપશે.
          </p>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Purchase Email Address *
            </label>
            <Input
              type="email"
              placeholder="e.g. yourname@gmail.com"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              className="!rounded-xl"
              size="large"
            />
          </div>

          <button
            onClick={handleEmailLookup}
            disabled={lookupLoading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#D4A017] px-4 text-xs font-bold text-white shadow hover:bg-[#b88910] disabled:opacity-50"
          >
            <SearchOutlined />
            <span>{lookupLoading ? 'Searching Purchases...' : 'Find & Unlock My Books'}</span>
          </button>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <div className="font-bold text-slate-800 mb-1">Need Help?</div>
            જો તમને ડાઉનલોડ કરવામાં કોઈ મુશ્કેલી પડે તો અમને <strong>manishvaghasiya.tech@gmail.com</strong> પર સંપર્ક કરો.
          </div>
        </div>
      </Drawer>
    </>
  )
}
