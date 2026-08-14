import { Layout } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CookieConsentBanner } from '../site/CookieConsentBanner'
import { Footer } from '../site/Footer'
import { SiteHeader } from '../site/SiteHeader'

const { Content } = Layout

export function SiteLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname])

  return (
    <Layout className="app-shell overflow-hidden text-[var(--text-strong)]">
      <SiteHeader />
      <Content className="relative z-[1]">
        <Outlet />
      </Content>
      <Footer />
      <CookieConsentBanner />
    </Layout>
  )
}
