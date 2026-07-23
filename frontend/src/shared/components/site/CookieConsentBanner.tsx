import { useEffect, useState } from 'react'
import { Button, Typography } from 'antd'

const { Text, Paragraph } = Typography

const COOKIE_CONSENT_KEY = 'mv_cookie_consent_v1'

export interface ConsentPreferences {
  necessary: boolean
  analytics: boolean
  advertising: boolean
  timestamp: string
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [advertising, setAdvertising] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!saved) {
      setVisible(true)
      updateGoogleConsentMode(false, false)
    } else {
      try {
        const parsed: ConsentPreferences = JSON.parse(saved)
        updateGoogleConsentMode(parsed.analytics, parsed.advertising)
      } catch {
        setVisible(true)
      }
    }
  }, [])

  const updateGoogleConsentMode = (analyticsGranted: boolean, adGranted: boolean) => {
    if (typeof window !== 'undefined' && 'gtag' in window && typeof (window as unknown as { gtag: Function }).gtag === 'function') {
      const gtag = (window as unknown as { gtag: Function }).gtag
      gtag('consent', 'update', {
        analytics_storage: analyticsGranted ? 'granted' : 'denied',
        ad_storage: adGranted ? 'granted' : 'denied',
        ad_user_data: adGranted ? 'granted' : 'denied',
        ad_personalization: adGranted ? 'granted' : 'denied',
      })
    }
  }

  const savePreferences = (analyticsGranted: boolean, adGranted: boolean) => {
    const prefs: ConsentPreferences = {
      necessary: true,
      analytics: analyticsGranted,
      advertising: adGranted,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    updateGoogleConsentMode(analyticsGranted, adGranted)
    setVisible(false)
  }

  const handleAcceptAll = () => {
    savePreferences(true, true)
  }

  const handleRejectOptional = () => {
    savePreferences(false, false)
  }

  const handleSaveCustom = () => {
    savePreferences(analytics, advertising)
  }

  if (!visible) return null

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-4xl rounded-2xl border border-[var(--line-soft)] bg-white/95 p-5 shadow-editorial-lg backdrop-blur-md sm:p-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 lg:max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent-earth)]" />
            <Text className="!text-xs !font-semibold !uppercase !tracking-[0.16em] !text-[var(--text-muted)]">
              Privacy & Cookie Notice
            </Text>
          </div>
          <Paragraph className="!mb-0 !text-xs !leading-6 !text-[var(--text-soft)] sm:!text-sm">
            We use essential cookies for platform security and basic functionality. With your permission, we also use optional analytics and Google AdSense advertising cookies to support continuous content creation and improve performance.
          </Paragraph>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            type="primary"
            size="middle"
            onClick={handleAcceptAll}
            className="!rounded-xl !bg-[var(--accent-earth)] hover:!bg-[var(--accent-earth-deep)]"
          >
            Accept all
          </Button>
          <Button
            size="middle"
            onClick={handleRejectOptional}
            className="!rounded-xl"
            style={{ borderColor: 'var(--line-strong)' }}
          >
            Reject optional
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => setShowDetails(!showDetails)}
            className="!text-xs !text-[var(--text-muted)] hover:!text-[var(--accent-earth)]"
          >
            {showDetails ? 'Hide options' : 'Manage preferences'}
          </Button>
        </div>
      </div>

      {showDetails ? (
        <div className="mt-4 border-t border-[var(--line-soft)] pt-4 text-xs">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--line-soft)] bg-[var(--panel-soft)] p-3">
              <span className="font-semibold text-[var(--text-strong)]">Essential Cookies</span>
              <p className="mt-1 text-[11px] text-[var(--text-soft)]">Required for site security, navigation, and core functionality. Always enabled.</p>
            </div>
            <label className="flex flex-col justify-between rounded-xl border border-[var(--line-soft)] bg-white p-3 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--text-strong)]">Analytics Cookies</span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="rounded accent-[var(--accent-earth)]"
                />
              </div>
              <p className="mt-1 text-[11px] text-[var(--text-soft)]">Helps us understand how readers use articles and resources.</p>
            </label>
            <label className="flex flex-col justify-between rounded-xl border border-[var(--line-soft)] bg-white p-3 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--text-strong)]">Advertising Cookies</span>
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  className="rounded accent-[var(--accent-earth)]"
                />
              </div>
              <p className="mt-1 text-[11px] text-[var(--text-soft)]">Used by Google AdSense to serve relevant ads after approval.</p>
            </label>
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              size="small"
              type="primary"
              onClick={handleSaveCustom}
              className="!rounded-lg !bg-[var(--accent-earth)]"
            >
              Save choices
            </Button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}
