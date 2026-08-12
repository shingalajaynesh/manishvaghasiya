import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton, useUser, useAuth, useSignIn, useSignUp, useClerk } from '@clerk/clerk-react'

const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

// Production keys (pk_live_...) are strictly locked by Clerk to manishvaghasiya.com.
// On localhost, use development key to prevent HTTP 400 origin blocks.
export const CLERK_PUBLISHABLE_KEY = isLocalhost
  ? 'pk_test_ZGl2ZXJzZS1kYW5lLTQ5LmNsZXJrLmFjY291bnRzLmRldiQ'
  : (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsubWFuaXNodmFnaGFzaXlhLmNvbSQ')


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

export { SignedIn, SignedOut, UserButton, SignInButton, useUser, useAuth, useSignIn, useSignUp, useClerk }

