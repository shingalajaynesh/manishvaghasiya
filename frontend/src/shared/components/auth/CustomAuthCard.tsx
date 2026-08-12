import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn, useSignUp } from '../../lib/clerk'
import {
  MailOutlined,
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { Button, Input, Alert, Divider } from 'antd'
import toast from 'react-hot-toast'
import { useLanguage } from '../../lib/language'

interface CustomAuthCardProps {
  mode: 'sign-in' | 'sign-up'
  redirectUrl?: string
}

export const CustomAuthCard: React.FC<CustomAuthCardProps> = ({ mode, redirectUrl = '/dashboard' }) => {
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn()
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const navigate = useNavigate()
  const { language } = useLanguage()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Verification State
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  // UI State
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Google OAuth Handler
  const handleGoogleSignIn = async () => {
    if (!isSignInLoaded || !signIn) return
    try {
      setLoading(true)
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: `${window.location.origin}/sso-callback`,
        redirectUrlComplete: redirectUrl,
      })
    } catch (err: any) {
      console.error('Google OAuth Error:', err)
      toast.error(err?.errors?.[0]?.message || 'Failed to initialize Google Sign In')
      setLoading(false)
    }
  }

  // Handle Custom Email/Password Sign In
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignInLoaded || !signIn) return
    setErrorMsg('')
    setLoading(true)

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      })

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId })
        toast.success(
          language === 'gu'
            ? 'જીવન જીતવું છે - તમારું સ્વાગત છે!'
            : language === 'hi'
            ? 'સફળતાપૂર્વક લોગ ઇન થયા!'
            : 'Welcome back! Signed in successfully.'
        )
        navigate(redirectUrl)
      } else {
        console.log('Sign in status:', result)
        toast.error('Additional verification required')
      }
    } catch (err: any) {
      console.error('Sign In Error:', err)
      const msg = err?.errors?.[0]?.message || 'Invalid email or password. Please check your credentials.'
      setErrorMsg(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Handle Custom Email/Password Sign Up
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignUpLoaded || !signUp) return
    setErrorMsg('')
    setLoading(true)

    try {
      await signUp.create({
        emailAddress: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })

      // Send Email Code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
      toast.success(
        language === 'gu'
          ? 'તમારા ઇમેઇલ પર ૬-અંકનો વેરિફિકેશન કોડ મોકલ્યો છે!'
          : 'Verification code sent to your email address!'
      )
    } catch (err: any) {
      console.error('Sign Up Error:', err)
      const msg = err?.errors?.[0]?.message || 'Failed to create account. Please try another email.'
      setErrorMsg(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // Handle Email Verification Code Submit
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignUpLoaded || !signUp) return
    setErrorMsg('')
    setLoading(true)

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      })

      if (completeSignUp.status === 'complete') {
        await setSignUpActive({ session: completeSignUp.createdSessionId })
        toast.success(
          language === 'gu'
            ? 'એકાઉન્ટ સફળતાપૂર્વક વેરીફાઈ થયું! તમારું સ્વાગત છે.'
            : 'Account verified successfully! Welcome.'
        )
        navigate(redirectUrl)
      } else {
        console.log('Sign up status:', completeSignUp)
        setErrorMsg('Verification failed. Please check the code and try again.')
      }
    } catch (err: any) {
      console.error('Verification Error:', err)
      const msg = err?.errors?.[0]?.message || 'Invalid verification code'
      setErrorMsg(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  // 1. VERIFICATION STEP
  if (pendingVerification) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-6 sm:p-8 shadow-xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <SafetyCertificateOutlined className="text-2xl" />
        </div>

        <h3 className="font-playfair text-2xl font-bold text-[var(--text-strong)]">
          {language === 'gu' ? 'ઇમેઇલ વેરિફિકેશન' : language === 'hi' ? 'ईमेल सत्यापन' : 'Verify Email Address'}
        </h3>
        <p className="mt-1 text-xs text-[var(--text-soft)]">
          {language === 'gu'
            ? `અમે ${email} પર ૬ અંકનો કોડ મોકલ્યો છે. કૃપા કરીને નીચે ટાઇપ કરો:`
            : `We sent a 6-digit code to ${email}. Please enter it below:`}
        </p>

        {errorMsg && <Alert message={errorMsg} type="error" showIcon className="my-4 text-xs text-left" />}

        <form onSubmit={handleVerifySubmit} className="mt-6 space-y-4">
          <div>
            <Input
              size="large"
              placeholder="Enter 6-digit code (e.g. 123456)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="!rounded-xl !text-center !font-mono !text-lg !tracking-widest"
              maxLength={6}
              required
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<CheckCircleOutlined />}
            block
            size="large"
            className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
          >
            {language === 'gu' ? 'એકાઉન્ટ વેરીફાઈ કરો' : 'Verify & Continue'}
          </Button>

          <button
            type="button"
            onClick={() => setPendingVerification(false)}
            className="text-xs font-semibold text-[var(--text-muted)] hover:underline"
          >
            ← Back to Sign Up
          </button>
        </form>
      </div>
    )
  }

  // 2. SIGN IN / SIGN UP FORM
  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[var(--text-strong)]">
          {mode === 'sign-in'
            ? language === 'gu'
              ? 'લૉગ ઇન કરો'
              : language === 'hi'
              ? 'लॉग इन करें'
              : 'Sign In to Account'
            : language === 'gu'
            ? 'નવું એકાઉન્ટ બનાવો'
            : language === 'hi'
            ? 'नया खाता बनाएं'
            : 'Create Free Account'}
        </h2>
        <p className="mt-1 text-xs text-[var(--text-soft)]">
          {mode === 'sign-in'
            ? language === 'gu'
              ? 'તમારા ખરીદેલા માસ્ટર ઈ-બુક્સ વાંચવા લૉગ ઇન કરો'
              : 'Access your Gujarati E-Book reader & library'
            : language === 'gu'
            ? 'માત્ર ૩૦ સેકન્ડમાં નવું એકાઉન્ટ બનાવો'
            : 'Register in 30 seconds to purchase & read e-books'}
        </p>
      </div>

      {/* Google OAuth One-Click Sign In */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-white p-3 text-sm font-bold text-[var(--text-strong)] shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 mb-4"
      >
        <GoogleOutlined className="text-lg text-red-500" />
        <span>Continue with Google</span>
      </button>

      <Divider className="!my-4 !text-xs !text-[var(--text-muted)]">OR WITH EMAIL</Divider>

      {errorMsg && <Alert message={errorMsg} type="error" showIcon className="mb-4 text-xs" />}

      {/* Form */}
      <form onSubmit={mode === 'sign-in' ? handleSignInSubmit : handleSignUpSubmit} className="space-y-4">
        {mode === 'sign-up' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">First Name</label>
              <Input
                size="large"
                prefix={<UserOutlined className="text-slate-400" />}
                placeholder="Manish"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="!rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Last Name</label>
              <Input
                size="large"
                placeholder="Vaghasiya"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="!rounded-xl"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Email Address</label>
          <Input
            size="large"
            type="email"
            prefix={<MailOutlined className="text-slate-400" />}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="!rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Password</label>
          <Input
            size="large"
            type={showPassword ? 'text' : 'password'}
            prefix={<LockOutlined className="text-slate-400" />}
            suffix={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </button>
            }
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!rounded-xl"
            required
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<ArrowRightOutlined />}
          iconPlacement="end"

          block
          size="large"
          className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910] shadow-md"
        >
          {mode === 'sign-in'
            ? language === 'gu'
              ? 'લૉગ ઇન કરો'
              : 'Sign In'
            : language === 'gu'
            ? 'એકાઉન્ટ બનાવો'
            : 'Create Reader Account'}
        </Button>
      </form>

      {/* Switch Mode Footer */}
      <div className="mt-6 border-t border-[var(--line-soft)] pt-4 text-center text-xs text-[var(--text-soft)]">
        {mode === 'sign-in' ? (
          <>
            Don't have an account?{' '}
            <Link to="/sign-up" className="font-bold text-[var(--accent-earth)] hover:underline">
              Register Free
            </Link>
          </>
        ) : (
          <>
            Already have a reader account?{' '}
            <Link to="/sign-in" className="font-bold text-[var(--accent-earth)] hover:underline">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
