import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { CookieConsentBanner } from '../site/CookieConsentBanner'
import { Footer } from '../site/Footer'
import { SiteHeader } from '../site/SiteHeader'

const { Content } = Layout

export function SiteLayout() {
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
