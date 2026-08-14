import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
  LockOutlined,
  BookOutlined,
  StarOutlined,
  StarFilled,
  ArrowLeftOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  DownloadOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Tooltip, notification, Spin, Tag, Modal, Input } from 'antd'
import * as pdfjsLib from 'pdfjs-dist'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { isBookOwned, syncUserPurchasesFromBackend } from '../../shared/lib/userPurchases'
import { RazorpayCheckout } from '../../shared/components/payment/RazorpayCheckout'

// Set worker source for pdfjs-dist from jsdelivr CDN safely
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version || '3.11.174'}/build/pdf.worker.min.js`
}

type ReaderTheme = 'parchment' | 'dark' | 'sepia' | 'light'

const PREVIEW_LIMIT = 15

const PDF_FILES: Record<
  string,
  {
    id: string
    title: string
    subtitle: string
    price: number
    totalPages: number
    path: string
    coverImage: string
    description: string
  }
> = {
  'jivan-jitvu-che': {
    id: 'jivan-jitvu-che',
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    subtitle: 'Jivan Jitvu Che To Parivar Thi Sharu Karo',
    price: 199,
    totalPages: 276,
    path: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
    coverImage: '/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
    description: 'વિદ્યાર્થી, માતા-પિતા અને દરેક પરિવાર માટે જીવન બદલતા ૧૨ પાઠ. A 276-page master handbook.',
  },
  'man-haryu-to-badhu-haryu': {
    id: 'man-haryu-to-badhu-haryu',
    title: 'મન હાર્યું તો બધું હાર્યું',
    subtitle: 'Man Haryu To Badhu Haryu',
    price: 199,
    totalPages: 250,
    path: '/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf',
    coverImage: '/books/images/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.png',
    description: 'માનસિક મજબૂતી, આત્મવિશ્વાસ અને પડકારો સામે હિંમત રાખવાનું માસ્ટર ગાઇડ.',
  },
  'combo-bundle': {
    id: 'combo-bundle',
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    subtitle: 'Master Gujarati E-Book Edition',
    price: 349,
    totalPages: 276,
    path: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
    coverImage: '/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
    description: 'Complete family and mindset master e-book collection by Manish Vaghasiya.',
  },
}

export function EbookReaderPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()

  const [purchaseSynced, setPurchaseSynced] = useState(false)
  const [paywallModalOpen, setPaywallModalOpen] = useState(false)
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')

  const activeBookId = bookId || 'jivan-jitvu-che'
  const bookInfo = PDF_FILES[activeBookId] || PDF_FILES['jivan-jitvu-che']

  // PDF render state
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [pdfError, setPdfError] = useState<string | null>(null)

  // Reader customization state
  const [theme, setTheme] = useState<ReaderTheme>('parchment')
  const [scale, setScale] = useState<number>(1.2)
  const [tocOpen, setTocOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isScreenBlurred, setIsScreenBlurred] = useState(false)
  const [securityNotice, setSecurityNotice] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const renderTaskRef = useRef<any>(null)

  // Sync purchases from backend if signed in
  useEffect(() => {
    if (user?.id && user?.primaryEmailAddress?.emailAddress) {
      setBuyerName(user.fullName || user.firstName || '')
      setBuyerEmail(user.primaryEmailAddress.emailAddress)
      syncUserPurchasesFromBackend(user.id, user.primaryEmailAddress.emailAddress).then(() => {
        setPurchaseSynced(true)
      })
    } else {
      setPurchaseSynced(true)
    }
  }, [user?.id, user?.primaryEmailAddress?.emailAddress])

  // Access status (re-evaluates when user or purchaseSynced changes)
  const hasAccess = purchaseSynced ? isBookOwned(user?.id, activeBookId) : false
  const maxAccessiblePage = hasAccess ? numPages : Math.min(numPages || PREVIEW_LIMIT, PREVIEW_LIMIT)

  // Identification watermark
  const userIdentifier =
    user?.primaryEmailAddress?.emailAddress || user?.fullName || 'Free Preview Reader'
  const watermarkText = hasAccess
    ? `LICENSED TO: ${userIdentifier} • DRM PROTECTED`
    : `FREE SAMPLE PREVIEW • MANISH VAGHASIYA OFFICIAL`

  // 1. Load PDF Document (Always load so sample preview works for all visitors!)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    let isMounted = true
    setLoading(true)
    setPdfError(null)

    try {
      pdfjsLib
        .getDocument(bookInfo.path)
        .promise.then((loadedPdf) => {
          if (!isMounted) return
          setPdfDoc(loadedPdf)
          setNumPages(loadedPdf.numPages)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Error loading PDF document:', err)
          if (isMounted) {
            setPdfError('Unable to load e-book document. Please try refreshing the page.')
            setLoading(false)
          }
        })
    } catch (e) {
      console.error('PDF initialization error:', e)
      if (isMounted) {
        setPdfError('Reader initialization error.')
        setLoading(false)
      }
    }

    return () => {
      isMounted = false
    }
  }, [bookInfo.path])

  // 2. Render Current PDF Page onto HTML5 Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    let cancelled = false

    pdfDoc.getPage(pageNum).then((page) => {
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas) return
      const context = canvas.getContext('2d')
      if (!context) return

      const viewport = page.getViewport({ scale })
      canvas.height = viewport.height
      canvas.width = viewport.width

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }

      const renderTask = page.render(renderContext)
      renderTaskRef.current = renderTask

      renderTask.promise.catch((err) => {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Error rendering page canvas:', err)
        }
      })
    })

    return () => {
      cancelled = true
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel()
      }
    }
  }, [pdfDoc, pageNum, scale])

  // 3. Screen focus protection listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Screenshots are disabled to prevent copyright piracy.')
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Printing is restricted in this interactive viewer.')
        return false
      }
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i')
      ) {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Developer inspection is restricted.')
        return false
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsScreenBlurred(true)
      }
    }
    const handleBlur = () => setIsScreenBlurred(true)
    const handleFocus = () => setIsScreenBlurred(false)

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  // Restore bookmark status
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`mv_pdf_bookmark_${activeBookId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.pageNum === pageNum) {
          setIsBookmarked(true)
        } else {
          setIsBookmarked(false)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }, [pageNum, activeBookId])

  const handleNextPage = () => {
    if (hasAccess) {
      if (pageNum < numPages) setPageNum(pageNum + 1)
    } else {
      if (pageNum < PREVIEW_LIMIT) {
        setPageNum(pageNum + 1)
      } else {
        setPaywallModalOpen(true)
      }
    }
  }

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
    }
  }

  const toggleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem(`mv_pdf_bookmark_${activeBookId}`)
      setIsBookmarked(false)
      notification.info({
        message: 'Bookmark Removed',
        description: `Page ${pageNum} bookmark removed.`,
      })
    } else {
      localStorage.setItem(
        `mv_pdf_bookmark_${activeBookId}`,
        JSON.stringify({ bookId: activeBookId, pageNum, timestamp: new Date().toISOString() })
      )
      setIsBookmarked(true)
      notification.success({
        message: 'Page Bookmarked!',
        description: `Page ${pageNum} saved.`,
      })
    }
  }

  const handleDownloadMasterPdf = () => {
    const link = document.createElement('a')
    link.href = bookInfo.path
    link.download = `${bookInfo.id}-Manish-Vaghasiya-Master-Edition.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    notification.success({
      message: 'Master PDF Download Started',
      description: 'Your complete high-resolution PDF e-book is saving to your device for offline reading.',
    })
  }

  const themeStyles = {
    parchment: {
      bg: 'bg-[#FAF5ED]',
      text: 'text-[#2D241D]',
      headerBg: 'bg-[#F3ECE0]',
      cardBg: 'bg-[#FFFDF9]',
      borderColor: 'border-[#E6DCCF]',
    },
    dark: {
      bg: 'bg-[#121417]',
      text: 'text-[#E2E8F0]',
      headerBg: 'bg-[#1E2229]',
      cardBg: 'bg-[#181C23]',
      borderColor: 'border-[#2D3442]',
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      text: 'text-[#432C1C]',
      headerBg: 'bg-[#E9DFB8]',
      cardBg: 'bg-[#FAF6EA]',
      borderColor: 'border-[#DACBA0]',
    },
    light: {
      bg: 'bg-[#FFFFFF]',
      text: 'text-[#1F2937]',
      headerBg: 'bg-[#F9FAFB]',
      cardBg: 'bg-[#FFFFFF]',
      borderColor: 'border-[#E5E7EB]',
    },
  }[theme]

  if (pdfError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5ED] p-6 text-center">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
            <FilePdfOutlined className="text-2xl" />
          </div>
          <h2 className="font-playfair text-xl font-bold text-slate-900 mb-2">E-Book Loading Error</h2>
          <p className="text-xs text-slate-600 mb-6">{pdfError}</p>
          <Button
            type="primary"
            onClick={() => window.location.reload()}
            className="!rounded-xl !bg-[#D4A017] !font-bold"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SeoHead
        title={`${bookInfo.title} | Official E-Book Reader & Preview`}
        description={`Read official Gujarati master e-book '${bookInfo.title}' by Manish Vaghasiya in our high-performance interactive reader.`}
        canonicalUrl={`https://www.manishvaghasiya.com/reader/${activeBookId}`}
      />

      <style>{`
        @media print {
          body { display: none !important; }
        }
        .prevent-select {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>

      <div
        className={`min-h-screen ${themeStyles.bg} ${themeStyles.text} transition-colors duration-300 prevent-select relative overflow-hidden flex flex-col`}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Dynamic Watermark Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-wrap items-center justify-around opacity-[0.05] select-none overflow-hidden p-6">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div
              key={idx}
              className="rotate-[-25deg] text-xs font-mono font-bold tracking-widest text-current whitespace-nowrap m-12"
            >
              {watermarkText}
            </div>
          ))}
        </div>

        {/* Security Warning Overlay */}
        {isScreenBlurred && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-6 text-center backdrop-blur-xl transition-all">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
              <LockOutlined className="text-3xl" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-white mb-2">
              Protected E-Book Reader
            </h2>
            <p className="max-w-md text-sm text-gray-300 mb-6">
              {securityNotice ||
                'Screen focus lost. Content is hidden to protect author copyright.'}
            </p>
            <Button
              type="primary"
              onClick={() => setIsScreenBlurred(false)}
              className="!h-11 !rounded-xl !bg-[#D4A017] !font-bold"
            >
              Resume Reading
            </Button>
          </div>
        )}

        {/* Free Sample Notice Banner (Visible for Guests / Unlocked previewers) */}
        {!hasAccess && (
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 text-xs font-medium flex flex-wrap items-center justify-between gap-2 shadow-sm z-30">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded bg-white/20 px-2 py-0.5 font-bold uppercase tracking-wider text-[10px]">
                <BookOutlined />
                <span>FREE PREVIEW</span>
              </span>
              <span>
                You are previewing pages 1–{PREVIEW_LIMIT} of <strong>{bookInfo.title}</strong> (Total {bookInfo.totalPages} Pages).
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPaywallModalOpen(true)}
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-1 text-xs font-bold text-amber-900 shadow hover:bg-amber-50"
              >
                <ThunderboltOutlined />
                <span>Unlock Full Book (₹{bookInfo.price})</span>
              </button>
            </div>
          </div>
        )}

        {/* Reader Top Bar */}
        <header
          className={`sticky top-0 z-20 border-b ${themeStyles.borderColor} ${themeStyles.headerBg} px-3 sm:px-6 py-2.5 shadow-sm`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => navigate('/resources')}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold hover:bg-black/5"
                title="Back to E-Book Store"
              >
                <ArrowLeftOutlined />
                <span className="hidden sm:inline">Bookstore</span>
              </button>
              <div className="h-4 w-[1px] bg-current opacity-20 hidden sm:block" />
              <div className="min-w-0">
                <h1 className="font-playfair text-xs sm:text-sm font-bold truncate leading-tight flex items-center gap-2">
                  <FilePdfOutlined className="text-red-500" />
                  <span className="truncate">{bookInfo.title}</span>
                </h1>
                <p className="text-[10px] sm:text-[11px] opacity-70 truncate">
                  {hasAccess ? (
                    <span className="flex items-center gap-1 text-green-700 font-semibold">
                      <CheckCircleOutlined />
                      <span>Full Master Edition Unlocked • Page {pageNum} of {numPages}</span>
                    </span>
                  ) : (
                    <span>Sample Preview • Page {pageNum} of {PREVIEW_LIMIT}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Controls & Download / Buy Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* If Owned: Direct Master PDF Download Button */}
              {hasAccess ? (
                <Tooltip title="Download original high-res PDF to read offline in your favorite app">
                  <Button
                    type="primary"
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadMasterPdf}
                    className="!bg-emerald-600 !font-bold !border-none hover:!bg-emerald-700 !rounded-lg text-xs"
                  >
                    <span className="hidden md:inline">Download PDF</span>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  icon={<ThunderboltOutlined />}
                  onClick={() => setPaywallModalOpen(true)}
                  className="!bg-[#D4A017] !font-bold !border-none hover:!bg-[#b88910] !rounded-lg text-xs"
                >
                  <span className="hidden md:inline">Buy Full E-Book (₹{bookInfo.price})</span>
                  <span className="md:hidden">Buy ₹{bookInfo.price}</span>
                </Button>
              )}

              {/* Table of Contents */}
              <Tooltip title="Table of Pages">
                <button
                  onClick={() => setTocOpen(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-current/10 hover:bg-black/5 text-xs"
                >
                  <MenuOutlined />
                </button>
              </Tooltip>

              {/* Bookmark */}
              <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Page'}>
                <button
                  onClick={toggleBookmark}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border border-current/10 text-xs ${
                    isBookmarked ? 'text-amber-500 bg-amber-500/10' : 'hover:bg-black/5'
                  }`}
                >
                  {isBookmarked ? <StarFilled /> : <StarOutlined />}
                </button>
              </Tooltip>

              {/* Theme Selector */}
              <div className="hidden lg:flex items-center rounded-lg border border-current/10 p-0.5 text-xs">
                {(['parchment', 'light', 'sepia', 'dark'] as ReaderTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-2 py-0.5 rounded font-medium capitalize ${
                      theme === t ? 'bg-[#D4A017] text-white shadow-sm font-bold' : 'opacity-60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 border-l border-current/10 pl-2">
                <button
                  onClick={() => setScale((prev) => Math.max(0.8, prev - 0.15))}
                  className="p-1 text-xs rounded hover:bg-black/5"
                  title="Zoom Out"
                >
                  <ZoomOutOutlined />
                </button>
                <span className="text-[10px] opacity-60 font-mono">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((prev) => Math.min(2.2, prev + 0.15))}
                  className="p-1 text-xs rounded hover:bg-black/5"
                  title="Zoom In"
                >
                  <ZoomInOutlined />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Canvas Document Viewer */}
        <main className="flex-1 flex flex-col justify-center items-center p-3 sm:p-6 overflow-auto">
          {loading ? (
            <div className="py-24 text-center">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#D4A017' }} spin />} />
              <p className="mt-4 text-xs font-semibold opacity-70">
                Loading Original Master Pages...
              </p>
            </div>
          ) : (
            <div
              className={`relative shadow-2xl rounded-xl border ${themeStyles.borderColor} overflow-hidden bg-white p-2 my-auto transition-all`}
            >
              <canvas ref={canvasRef} className="mx-auto block h-auto max-w-full rounded shadow-sm" />
            </div>
          )}
        </main>

        {/* Bottom Pagination & Navigation Controls */}
        <footer
          className={`sticky bottom-0 z-20 border-t ${themeStyles.borderColor} ${themeStyles.headerBg} px-3 sm:px-6 py-2.5 shadow-md`}
        >
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
            <Button
              type="default"
              onClick={handlePrevPage}
              disabled={pageNum <= 1}
              icon={<LeftOutlined />}
              className="!rounded-xl !font-bold text-xs"
            >
              <span className="hidden sm:inline">Previous Page</span>
            </Button>

            <div className="text-center font-mono text-xs font-bold opacity-90 flex items-center gap-2">
              <span>
                Page {pageNum} of {hasAccess ? numPages : `${PREVIEW_LIMIT} (Preview)`}
              </span>
              {!hasAccess && pageNum === PREVIEW_LIMIT && (
                <Tag color="orange" className="!text-[10px] !font-bold !rounded-md">
                  Preview End
                </Tag>
              )}
            </div>

            <Button
              type="primary"
              onClick={handleNextPage}
              className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910] text-xs"
            >
              <span>{pageNum >= PREVIEW_LIMIT && !hasAccess ? 'Unlock Full Book' : 'Next Page'}</span>
              <RightOutlined />
            </Button>
          </div>
        </footer>

        {/* Page Index Navigation Drawer */}
        <Drawer
          title="Jump to Page (પૃષ્ઠ પસંદગી)"
          placement="right"
          onClose={() => setTocOpen(false)}
          open={tocOpen}
        >
          <div className="mb-4 text-xs text-slate-500">
            {hasAccess
              ? `All ${numPages} master pages available.`
              : `Sample preview includes pages 1 to ${PREVIEW_LIMIT}. Unlock to access all ${numPages} pages.`}
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-[70vh] overflow-y-auto">
            {Array.from({ length: maxAccessiblePage }).map((_, idx) => {
              const p = idx + 1
              return (
                <button
                  key={p}
                  onClick={() => {
                    setPageNum(p)
                    setTocOpen(false)
                  }}
                  className={`rounded-lg py-2 text-xs font-bold border transition-colors ${
                    p === pageNum
                      ? 'bg-[#D4A017] text-white border-[#D4A017]'
                      : 'border-black/10 hover:bg-black/5'
                  }`}
                >
                  P. {p}
                </button>
              )
            })}
          </div>

          {!hasAccess && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
              <p className="text-xs font-semibold text-amber-900 mb-2">
                Want to read all {bookInfo.totalPages} pages?
              </p>
              <Button
                type="primary"
                block
                onClick={() => {
                  setTocOpen(false)
                  setPaywallModalOpen(true)
                }}
                className="!bg-[#D4A017] !font-bold !rounded-xl"
              >
                Unlock Entire Book (₹{bookInfo.price})
              </Button>
            </div>
          )}
        </Drawer>

        {/* Paywall Modal (When preview limit is reached or user clicks Unlock) */}
        <Modal
          open={paywallModalOpen}
          onCancel={() => setPaywallModalOpen(false)}
          footer={null}
          centered
          width={480}
        >
          <div className="text-center p-2">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <ThunderboltOutlined className="text-2xl" />
            </div>

            <Tag color="gold" className="!mb-2 !rounded-full !px-3 !py-0.5 !text-xs !font-bold">
              UNLOCK COMPLETE MASTER EDITION
            </Tag>

            <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-1">
              {bookInfo.title}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Complete {bookInfo.totalPages}-page digital master edition by Manish Vaghasiya.
            </p>

            <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/70 to-orange-50/50 p-4 mb-5 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircleOutlined className="text-emerald-600" />
                <span>Instant download link to complete high-resolution Master PDF</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircleOutlined className="text-emerald-600" />
                <span>Lifetime access in Web Reader across phone, tablet & laptop</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <CheckCircleOutlined className="text-emerald-600" />
                <span>Includes 21-Day Family & Mindset Transformation Exercises</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <SafetyCertificateOutlined className="text-blue-600" />
                <span>100% Secure Razorpay Payment (UPI, GPay, PhonePe, Cards)</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline justify-center gap-2 mb-3">
                <span className="text-3xl font-extrabold text-[#D4A017]">₹{bookInfo.price}</span>
                <span className="text-sm text-gray-400 line-through">₹499</span>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                  60% OFF
                </span>
              </div>

              {/* Guest / User Info Fields */}
              <div className="space-y-2 mb-4 text-left">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Your Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="!rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Your Email (For PDF download & receipt)
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="!rounded-xl"
                  />
                </div>
              </div>

              <RazorpayCheckout
                amountInRupees={bookInfo.price}
                itemName={bookInfo.title}
                bookId={bookInfo.id}
                customerName={buyerName || 'Valued Reader'}
                customerEmail={buyerEmail || 'reader@example.com'}
                buttonText={`Pay ₹${bookInfo.price} & Unlock Full Book`}
                onSuccess={(data) => {
                  try {
                    localStorage.setItem(
                      'mv_ebook_purchased',
                      JSON.stringify({
                        bookId: bookInfo.id,
                        orderId: data.orderId,
                        paymentId: data.paymentId,
                        email: buyerEmail,
                        name: buyerName,
                      })
                    )
                  } catch (e) {
                    console.error(e)
                  }
                  setPaywallModalOpen(false)
                  notification.success({
                    message: 'E-Book Unlocked',
                    description:
                      'Your purchase was successful! You now have full access and can download the master PDF.',
                  })
                  window.location.reload()
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <Link to="/resources" className="text-amber-700 font-semibold hover:underline">
                View Combo Bundle (Save 65%)
              </Link>
              {!isSignedIn && (
                <Link to="/sign-in" className="text-slate-600 hover:underline">
                  Already bought? Sign In
                </Link>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
