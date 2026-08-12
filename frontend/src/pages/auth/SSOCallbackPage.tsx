import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function SSOCallbackPage() {
  return (
    <>
      <SeoHead
        title="Authenticating... | Manish Vaghasiya"
        description="Completing Google Sign In authentication and setting up your reader session."
      />
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 px-4">

        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4A017] border-t-transparent" />
          <h3 className="font-playfair text-xl font-bold text-[var(--text-strong)]">
            Authenticating with Google...
          </h3>
          <p className="mt-1 text-xs text-[var(--text-soft)]">
            Please wait a moment while we set up your reader account session.
          </p>
        </div>
        <AuthenticateWithRedirectCallback
          signUpForceRedirectUrl="/dashboard"
          signInForceRedirectUrl="/dashboard"
        />
      </div>
    </>
  )
}
