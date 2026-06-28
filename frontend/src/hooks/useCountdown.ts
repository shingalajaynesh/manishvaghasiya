import { useState, useEffect, useCallback } from 'react'

export function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }, [target])

  const [time, setTime] = useState(calc)

  useEffect(() => {
    setTime(calc()) // Reset immediately on target change
    const id = setInterval(() => {
      setTime(calc())
    }, 1000)
    return () => clearInterval(id)
  }, [target, calc])

  return time
}
