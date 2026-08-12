import { SignIn, SignUp } from '@clerk/clerk-react'
import { PageHero } from '../../shared/components/site/PageHero'
import { SeoHead } from '../../shared/components/site/SeoHead'

export function SignInPage() {
  return (
    <>
      <SeoHead
        title="Sign In | Manish Vaghasiya E-Book Portal"
        description="Sign in to your Manish Vaghasiya reader account to access your purchased Gujarati e-books, reading progress, and bookmarks."
        canonicalUrl="https://www.manishvaghasiya.com/sign-in"
      />
      <PageHero
        eyebrow="User Authentication Portal"
        title="તમારા એકાઉન્ટમાં લૉગ ઇન કરો"
        description="તમારા ખરીદેલા માસ્ટર ઈ-બુક્સ વાંચવા અને રીડિંગ ડેશબોર્ડ એક્સેસ કરવા માટે સાઇન ઇન કરો."
      />
      <div className="editorial-container flex justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-4 shadow-editorial-lg">
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </>
  )
}

export function SignUpPage() {
  return (
    <>
      <SeoHead
        title="Register Account | Manish Vaghasiya E-Book Portal"
        description="Register a new reader account to purchase and read Manish Vaghasiya's Gujarati master e-books online with DRM protection."
        canonicalUrl="https://www.manishvaghasiya.com/sign-up"
      />
      <PageHero
        eyebrow="Create Free Reader Account"
        title="નવું રીડર એકાઉન્ટ બનાવો"
        description="માત્ર ૩૦ સેકન્ડમાં નવું એકાઉન્ટ રજીસ્ટર કરો અને તમારા ઈ-બુક લાઈબ્રેરીનો આનંદ માણો."
      />
      <div className="editorial-container flex justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-4 shadow-editorial-lg">
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </>
  )
}
