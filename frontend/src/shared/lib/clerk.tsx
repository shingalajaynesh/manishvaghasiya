import React from 'react'
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton, useUser, useAuth } from '@clerk/clerk-react'

export const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
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
