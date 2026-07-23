import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isAdEligibleRoute } from '../../lib/adEligibility'

interface AdContainerProps {
  slotId?: string
  format?: 'auto' | 'fluid' | 'rectangle'
  responsive?: boolean
  className?: string
}

export function AdContainer({
  slotId,
  format = 'auto',
  responsive = true,
  className = '',
}: AdContainerProps) {
  const location = useLocation()
  const eligible = isAdEligibleRoute(location.pathname)

  useEffect(() => {
    if (!eligible || !slotId) return

    try {
      if (typeof window !== 'undefined' && 'adsbygoogle' in window) {
        const adsbygoogle = (window as unknown as { adsbygoogle: Array<unknown> }).adsbygoogle
        adsbygoogle.push({})
      }
    } catch (err) {
      // Suppress ad load errors prior to official AdSense account approval
      console.debug('AdSense initialization suppressed:', err)
    }
  }, [eligible, location.pathname, slotId])

  // Under Google AdSense policy Section 10:
  // - Never render empty/blank ad containers before approval or on ineligible routes
  if (!eligible || !slotId) {
    return null
  }

  return (
    <div className={`my-8 flex justify-center overflow-hidden text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-6303291083449043"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
