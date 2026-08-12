import React, { useState } from 'react'
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
  mode?: 'sign-in' | 'sign-up'
  redirectUrl?: string
}

export const CustomAuthCard: React.FC<CustomAuthCardProps> = ({ redirectUrl = '/dashboard' }) => {
  const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn()
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const { language } = useLanguage()

  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Verification State
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  // UI State
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Unified Google OAuth Handler (Works for first-time & returning users with 0 errors)
  const handleGoogleSignIn = async () => {
    setLoading(true)
    setErrorMsg('')
    try {
      if (signUp) {
        await signUp.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectUrlComplete: redirectUrl,
        })
      } else if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy: 'oauth_google',
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectUrlComplete: redirectUrl,
        })
      }
    } catch (err: any) {
      console.error('Google OAuth Error:', err)
      toast.error('Failed to initialize Google login. Please enter your email below.')
      setLoading(false)
    }
  }

  // Unified Submit: Tries Sign In first; if user does not exist, automatically registers!
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast.error('Please enter your email address and password')
      return
    }

    setErrorMsg('')
    setLoading(true)

    // 1. Try Signing In Existing User
    if (isSignInLoaded && signIn) {
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
              : 'Welcome back! Signed in successfully.'
          )
          window.location.href = redirectUrl
          return
        }
      } catch (signInErr: any) {
        console.log('User sign-in attempt failed, checking auto sign-up:', signInErr)
      }
    }

    // 2. If Sign In Failed or User is New -> Auto-Register New User
    if (isSignUpLoaded && signUp) {
      try {
        const signUpResult = await signUp.create({
          emailAddress: email.trim(),
          password,
          firstName: firstName.trim() || 'Reader',
        })

        if (signUpResult.status === 'complete') {
          await setSignUpActive({ session: signUpResult.createdSessionId })
          toast.success(
            language === 'gu'
              ? 'નવું એકાઉન્ટ બન્યું! સ્વાગત છે.'
              : 'Account created! Welcome to your dashboard.'
          )
          window.location.href = redirectUrl
          return
        }

        // Send Email Verification Code
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setPendingVerification(true)
        toast.success(
          language === 'gu'
            ? 'નવું એકાઉન્ટ બન્યું! તમારા ઇમેઇલ પર ૬-અંકનો વેરિફિકેશન કોડ મોકલ્યો છે.'
            : 'Verification code sent to your email address!'
        )
        return
      } catch (signUpErr: any) {
        console.error('Sign Up Error:', signUpErr)
        const msg = signUpErr?.errors?.[0]?.message || 'Please check your email and password credentials.'
        setErrorMsg(msg)
        toast.error(msg)
      }
    } else {
      setErrorMsg('Invalid email or password. Please try again.')
      toast.error('Invalid credentials')
    }

    setLoading(false)
  }

  // Verification Code Form
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
        window.location.href = redirectUrl
      } else {
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

  // 1. EMAIL VERIFICATION STEP
  if (pendingVerification) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-6 sm:p-8 shadow-xl text-center">
        <div id="clerk-captcha" className="mb-2 flex justify-center" />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <SafetyCertificateOutlined className="text-2xl" />
        </div>


        <h3 className="font-playfair text-2xl font-bold text-[var(--text-strong)]">
          {language === 'gu' ? 'ઇમેઇલ વેરિફિકેશન' : 'Verify Email Address'}
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
            ← Back to Sign In
          </button>
        </form>
      </div>
    )
  }

  // 2. UNIFIED ALL-IN-ONE AUTH CARD
  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-6 sm:p-8 shadow-xl">
      {/* Clerk Bot Protection / Smart CAPTCHA container */}
      <div id="clerk-captcha" className="mb-2 flex justify-center" />

      {/* Header */}

      <div className="text-center mb-6">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[var(--text-strong)]">
          {language === 'gu' ? 'લૉગ ઇન / નવું એકાઉન્ટ' : 'Sign In / Register Account'}
        </h2>
        <p className="mt-1 text-xs text-[var(--text-soft)]">
          {language === 'gu'
            ? 'તમારા ખરીદેલા ગુજરાતી માસ્ટર ઈ-બુક્સ વાંચવા લૉગ ઇન અથવા રજિસ્ટર કરો'
            : 'Access your Gujarati master E-Books & personal reader dashboard'}
        </p>
      </div>

      {/* Google One-Click Sign In (Unified for First-Time & Returning Users) */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-2xl border border-[var(--line-strong)] bg-white p-3 text-sm font-bold text-[var(--text-strong)] shadow-sm hover:bg-slate-50 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 mb-4"
      >
        <GoogleOutlined className="text-lg text-red-500" />
        <span>Continue with Google</span>
      </button>

      <Divider className="!my-4 !text-xs !text-[var(--text-muted)]">OR ENTER YOUR DETAILS</Divider>

      {errorMsg && <Alert message={errorMsg} type="error" showIcon className="mb-4 text-xs" />}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Your Name (Optional)</label>
          <Input
            size="large"
            prefix={<UserOutlined className="text-slate-400" />}
            placeholder="e.g. Ramesh Patel"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="!rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Email Address *</label>
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
          <label className="block text-xs font-semibold text-[var(--text-soft)] mb-1">Password *</label>
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
          {language === 'gu' ? 'લૉગ ઇન / એકાઉન્ટ બનાવો' : 'Continue to Dashboard'}
        </Button>
      </form>
    </div>
  )
}
