import { useNavigate, useRouteError } from 'react-router-dom'
import { HomeOutlined, BookOutlined, ReadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { SeoHead } from '../../shared/components/site/SeoHead'


export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <>
      <SeoHead
        title="404 — Page Not Found | Manish Vaghasiya"
        description="The page you requested could not be found. Explore Manish Vaghasiya Gujarati E-Books, articles, and talks."
      />
      <div className="editorial-container flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 text-amber-800">
          <ExclamationCircleOutlined className="text-3xl" />
        </div>

        <Tag color="volcano" className="!mb-3 !rounded-full !px-3 !py-1 !text-xs !font-bold !uppercase">
          404 PAGE NOT FOUND
        </Tag>

        <h1 className="font-playfair text-3xl font-bold text-[var(--text-strong)] sm:text-4xl lg:text-5xl">
          આ પેજ ઉપલબ્ધ નથી (Page Not Found)
        </h1>

        <p className="mt-3 max-w-md text-sm text-[var(--text-soft)] leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or the link may be broken. Please return home or explore our official master e-books.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
          >
            Return to Homepage
          </Button>

          <Button
            size="large"
            icon={<BookOutlined />}
            onClick={() => navigate('/resources')}
            className="!rounded-xl !font-bold"
          >
            Buy E-Books (₹199)
          </Button>

          <Button
            size="large"
            icon={<ReadOutlined />}
            onClick={() => navigate('/blog')}
            className="!rounded-xl !font-bold"
          >
            Read Blog
          </Button>
        </div>
      </div>
    </>
  )
}

export function AppErrorBoundary() {
  const error: any = useRouteError()

  return (
    <>
      <SeoHead
        title="Something went wrong | Manish Vaghasiya"
        description="An error occurred while displaying this page. Return to the home page or contact support."
      />

      <div className="editorial-container flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-100 text-red-700">
          <ExclamationCircleOutlined className="text-3xl" />
        </div>

        <Tag color="red" className="!mb-3 !rounded-full !px-3 !py-1 !text-xs !font-bold !uppercase">
          APPLICATION ERROR
        </Tag>

        <h1 className="font-playfair text-2xl font-bold text-[var(--text-strong)] sm:text-3xl">
          Something unexpected happened
        </h1>

        <p className="mt-2 max-w-md text-xs text-[var(--text-soft)]">
          {error?.statusText || error?.message || 'An error occurred while loading this page.'}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => (window.location.href = '/')}
            className="!rounded-xl !bg-[#D4A017] !font-bold"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </>
  )
}
