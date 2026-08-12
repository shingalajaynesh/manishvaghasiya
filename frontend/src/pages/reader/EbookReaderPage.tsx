import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
  LockOutlined,
  StarOutlined,
  StarFilled,
  ArrowLeftOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Tooltip, notification, Spin, Tag } from 'antd'
import * as pdfjsLib from 'pdfjs-dist'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { isBookOwned, syncUserPurchasesFromBackend } from '../../shared/lib/userPurchases'

// Set worker source for pdfjs-dist from cdn.jsdelivr.net to render original PDF pages securely
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

type ReaderTheme = 'parchment' | 'dark' | 'sepia'

const PDF_FILES: Record<string, { title: string; path: string }> = {
  'jivan-jitvu-che': {
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    path: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
  },
  'man-haryu-to-badhu-haryu': {
    title: 'મન હાર્યું તો બધું હાર્યું',
    path: '/books/pdf/Man-Haryu-To-Badhu-Haryu_Gujarati_Master.pdf',
  },
  'combo-bundle': {
    title: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો',
    path: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
  },
}

export function EbookReaderPage() {
  const { bookId } = useParams<{ bookId: string }>()
  const navigate = useNavigate()
  const { user, isSignedIn, isLoaded } = useUser()

  const [purchaseSynced, setPurchaseSynced] = useState(false)

  useEffect(() => {
    if (user?.id && user?.primaryEmailAddress?.emailAddress) {
      syncUserPurchasesFromBackend(user.id, user.primaryEmailAddress.emailAddress).then(() => {
        setPurchaseSynced(true)
      })
    } else {
      setPurchaseSynced(true)
    }
  }, [user?.id, user?.primaryEmailAddress?.emailAddress])


  const bookInfo = PDF_FILES[bookId || 'jivan-jitvu-che'] || PDF_FILES['jivan-jitvu-che']

  // PDF render state
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  // Reader customization state
  const [theme, setTheme] = useState<ReaderTheme>('parchment')
  const [scale, setScale] = useState<number>(1.2)
  const [tocOpen, setTocOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isScreenBlurred, setIsScreenBlurred] = useState(false)
  const [securityNotice, setSecurityNotice] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const renderTaskRef = useRef<any>(null)

  // Identification watermark details
  const userIdentifier =
    user?.primaryEmailAddress?.emailAddress || user?.fullName || 'Authorized Reader'
  const watermarkText = `LICENSED TO: ${userIdentifier} • DRM PROTECTED • DO NOT DISTRIBUTE`

  const hasAccess = isBookOwned(user?.id, bookId || 'jivan-jitvu-che')

  // 1. Load Original PDF Document (Only load when signed in and access granted)
  useEffect(() => {
    if (!isLoaded || !purchaseSynced || !isSignedIn || !hasAccess) return

    let isMounted = true
    setLoading(true)

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
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [bookInfo.path, isLoaded, purchaseSynced, isSignedIn, hasAccess])

  // 2. Render Current PDF Page onto Protected HTML5 Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !hasAccess) return

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

      // Cancel previous page rendering task if ongoing
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
  }, [pdfDoc, pageNum, scale, hasAccess])

  // 3. Anti-Screenshot, Anti-Print & Window Focus Protection Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Screenshots are disabled to prevent DRM copyright piracy.')
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Printing is disabled for this protected e-book.')
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        setSecurityNotice('Downloading raw PDF files is disabled.')
        return false
      }
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Developer tools are restricted on DRM protected content.')
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
      const saved = localStorage.getItem(`mv_pdf_bookmark_${bookId}`)
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
  }, [pageNum, bookId])

  // ==================== CONDITIONAL RENDER GUARDS (ALL HOOKS CALLED ABOVE) ====================

  // 0. Access Guard Checks
  if (!isLoaded || !purchaseSynced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5ED] p-6 text-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#D4A017' }} spin />} />
        <p className="mt-4 text-xs font-bold text-slate-700">Verifying account access & e-book license...</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <>
        <SeoHead title="Sign In Required | Manish Vaghasiya DRM Reader" description="Account authentication required" />
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5ED] p-6 text-center">
          <div className="w-full max-w-md rounded-3xl border border-amber-200 bg-white p-8 shadow-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <LockOutlined className="text-2xl" />
            </div>
            <Tag color="volcano" className="!mb-3 !rounded-full !px-3 !py-0.5 !text-xs !font-bold">
              🔒 AUTHENTICATION REQUIRED
            </Tag>
            <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-2">Sign In to Read E-Book</h2>
            <p className="text-xs text-slate-600 mb-6">
              You must be logged into your account to read your purchased e-books.
            </p>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/sign-in')}
              className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
            >
              Sign In to Your Account
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (!hasAccess) {
    return (
      <>
        <SeoHead title="E-Book Access Locked | Manish Vaghasiya DRM Reader" description="E-book purchase required" />
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF5ED] p-6 text-center">
          <div className="w-full max-w-md rounded-3xl border border-amber-200 bg-white p-8 shadow-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <LockOutlined className="text-2xl" />
            </div>
            <Tag color="gold" className="!mb-3 !rounded-full !px-3 !py-0.5 !text-xs !font-bold">
              🔒 PURCHASE REQUIRED
            </Tag>
            <h2 className="font-playfair text-2xl font-bold text-slate-900 mb-2">E-Book Not Unlocked</h2>
            <p className="text-xs text-slate-600 mb-6">
              You have not unlocked this master e-book on your account yet. Visit our store to unlock instant access.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                type="primary"
                size="large"
                block
                onClick={() => navigate('/resources')}
                className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
              >
                Buy & Unlock E-Book (₹199)
              </Button>
              <Button size="large" block onClick={() => navigate('/dashboard')} className="!rounded-xl !font-bold">
                Go to My Dashboard
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }


  // 2. Render Current PDF Page onto Protected HTML5 Canvas
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

      // Cancel previous page rendering task if ongoing
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

  // 3. Anti-Screenshot, Anti-Print & Window Focus Protection Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Screenshots are disabled to prevent DRM copyright piracy.')
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Printing is disabled for this protected e-book.')
        return false
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        setSecurityNotice('Downloading raw PDF files is disabled.')
        return false
      }
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u')
      ) {
        e.preventDefault()
        setIsScreenBlurred(true)
        setSecurityNotice('Developer tools are restricted on DRM protected content.')
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
      const saved = localStorage.getItem(`mv_pdf_bookmark_${bookId}`)
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
  }, [pageNum, bookId])

  const toggleBookmark = () => {
    if (isBookmarked) {
      localStorage.removeItem(`mv_pdf_bookmark_${bookId}`)
      setIsBookmarked(false)
      notification.info({ message: 'Bookmark Removed', description: `Page ${pageNum} bookmark removed.` })
    } else {
      localStorage.setItem(
        `mv_pdf_bookmark_${bookId}`,
        JSON.stringify({ bookId, pageNum, timestamp: new Date().toISOString() })
      )
      setIsBookmarked(true)
      notification.success({ message: 'Page Bookmarked!', description: `Page ${pageNum} saved.` })
    }
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
  }[theme]

  return (
    <>
      <SeoHead
        title={`Original Reader: ${bookInfo.title} | Manish Vaghasiya DRM PDF Reader`}
        description={`Secure online PDF reader for ${bookInfo.title} by Manish Vaghasiya.`}
        canonicalUrl={`https://www.manishvaghasiya.com/reader/${bookId}`}
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
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-wrap items-center justify-around opacity-[0.06] select-none overflow-hidden p-6">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div key={idx} className="rotate-[-25deg] text-xs font-mono font-bold tracking-widest text-current whitespace-nowrap m-12">
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
              🔒 Protected DRM E-Book Reader
            </h2>
            <p className="max-w-md text-sm text-gray-300 mb-6">
              {securityNotice || 'Screen focus lost. Original book content is hidden to prevent unauthorized screen capture.'}
            </p>
            <Button
              type="primary"
              onClick={() => setIsScreenBlurred(false)}
              className="!h-11 !rounded-xl !bg-[#D4A017] !font-bold"
            >
              Resume Reading Original Book
            </Button>
          </div>
        )}

        {/* Reader Top Bar */}
        <header className={`sticky top-0 z-20 border-b ${themeStyles.borderColor} ${themeStyles.headerBg} px-4 py-3 shadow-sm`}>
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold hover:bg-black/5"
              >
                <ArrowLeftOutlined />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <div className="h-4 w-[1px] bg-current opacity-20 hidden sm:block" />
              <div className="min-w-0">
                <h1 className="font-playfair text-sm font-bold truncate leading-tight flex items-center gap-2">
                  <FilePdfOutlined className="text-red-500" />
                  <span>{bookInfo.title}</span>
                </h1>
                <p className="text-[11px] opacity-70 truncate">
                  Original Published Edition • Page {pageNum} of {numPages || '...'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <Tooltip title="Page Index">
                <button
                  onClick={() => setTocOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-current/10 hover:bg-black/5"
                >
                  <MenuOutlined />
                </button>
              </Tooltip>

              <Tooltip title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Page'}>
                <button
                  onClick={toggleBookmark}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border border-current/10 ${
                    isBookmarked ? 'text-amber-500 bg-amber-500/10' : 'hover:bg-black/5'
                  }`}
                >
                  {isBookmarked ? <StarFilled /> : <StarOutlined />}
                </button>
              </Tooltip>

              {/* Theme Switcher */}
              <div className="hidden md:flex items-center rounded-xl border border-current/10 p-0.5">
                <button
                  onClick={() => setTheme('parchment')}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${theme === 'parchment' ? 'bg-[#FAF5ED] text-[#2D241D] shadow-sm' : 'opacity-60'}`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${theme === 'sepia' ? 'bg-[#E9DFB8] text-[#432C1C] shadow-sm' : 'opacity-60'}`}
                >
                  Sepia
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-2 py-1 text-xs font-semibold rounded-lg ${theme === 'dark' ? 'bg-[#1E2229] text-white shadow-sm' : 'opacity-60'}`}
                >
                  Dark
                </button>
              </div>

              {/* Scale Zoom Adjuster */}
              <div className="flex items-center gap-1 border-l border-current/10 pl-2">

                <button
                  onClick={() => setScale((prev) => Math.max(0.8, prev - 0.15))}
                  className="px-2 py-1 text-xs font-bold rounded hover:bg-black/5"
                  title="Zoom Out"
                >
                  -
                </button>
                <span className="text-[10px] opacity-60 font-mono">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale((prev) => Math.min(2.0, prev + 0.15))}
                  className="px-2 py-1 text-xs font-bold rounded hover:bg-black/5"
                  title="Zoom In"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Canvas Display View */}
        <main className="flex-1 flex justify-center items-center p-4 sm:p-8 overflow-auto">
          {loading ? (
            <div className="py-20 text-center">
              <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#D4A017' }} spin />} />
              <p className="mt-4 text-xs font-semibold opacity-70">
                Loading Original Master PDF Pages...
              </p>
            </div>
          ) : (
            <div className={`relative shadow-2xl rounded-xl border ${themeStyles.borderColor} overflow-hidden bg-white p-2 my-auto`}>
              <canvas ref={canvasRef} className="mx-auto block h-auto max-w-full rounded shadow-sm" />
            </div>
          )}
        </main>

        {/* Footer Navigation */}
        <footer className={`sticky bottom-0 z-20 border-t ${themeStyles.borderColor} ${themeStyles.headerBg} px-4 py-3`}>
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
            <Button
              type="default"
              onClick={() => setPageNum((prev) => Math.max(1, prev - 1))}
              disabled={pageNum <= 1}
              icon={<LeftOutlined />}
              className="!rounded-xl !font-bold"
            >
              Previous Page
            </Button>

            <div className="text-center font-mono text-xs font-bold opacity-80">
              Page {pageNum} of {numPages}
            </div>

            <Button
              type="primary"
              onClick={() => setPageNum((prev) => Math.min(numPages, prev + 1))}
              disabled={pageNum >= numPages}
              className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
            >
              <span>Next Page</span>
              <RightOutlined />
            </Button>
          </div>
        </footer>

        {/* Page Index Drawer */}
        <Drawer
          title="Page Navigation (પૃષ્ઠ અનુક્રમણિકા)"
          placement="right"
          onClose={() => setTocOpen(false)}
          open={tocOpen}
        >
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: numPages }).map((_, idx) => {
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
        </Drawer>
      </div>
    </>
  )
}
