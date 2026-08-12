import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton, useUser, useAuth } from '@clerk/clerk-react'

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

// Use test key on localhost if live custom domain CNAME (clerk.manishvaghasiya.com) is not propagated yet
export const CLERK_PUBLISHABLE_KEY =
  (isLocalhost
    ? 'pk_test_ZGl2ZXJzZS1kYW5lLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ'
    : import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) ||
  'pk_live_Y2xlcmsubWFuaXNodmFnaGFzaXlhLmNvbSQ'



interface AppClerkProviderProps {
  children: React.ReactNode
}

export function AppClerkProvider({ children }: AppClerkProviderProps) {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.warn('Missing Clerk Publishable Key in environment variables')
    return <>{children}</>
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  )
}

export { SignedIn, SignedOut, UserButton, SignInButton, useUser, useAuth }
