import { App as AntApp, ConfigProvider } from 'antd'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './router'
import { LanguageProvider } from '../shared/lib/language'
import { themeConfig } from '../shared/styles/themeConfig'
import { AppClerkProvider } from '../shared/lib/clerk'

export default function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <AppClerkProvider>
        <LanguageProvider>
          <AntApp>
            <Analytics />
            <SpeedInsights />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3500,
                style: {
                  background: '#ffffff',
                  color: '#2d241d',
                  border: '1px solid #e0d5c8',
                  borderRadius: '12px',
                  boxShadow: '0 8px 30px rgba(45, 36, 29, 0.08), 0 2px 8px rgba(45, 36, 29, 0.04)',
                },
              }}
            />
            <RouterProvider router={router} />
          </AntApp>
        </LanguageProvider>
      </AppClerkProvider>
    </ConfigProvider>
  )
}

