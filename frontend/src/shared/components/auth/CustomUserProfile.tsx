import React, { useState, useEffect } from 'react'
import { useUser, useClerk } from '../../lib/clerk'
import {
  BookOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
  EditOutlined,
  ReadOutlined,
} from '@ant-design/icons'

import { Button, Modal, Tag, Input } from 'antd'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getUserPurchasedBooks, syncUserPurchasesFromBackend } from '../../lib/userPurchases'

interface CustomUserProfileProps {
  open: boolean
  onClose: () => void
}

export const CustomUserProfile: React.FC<CustomUserProfileProps> = ({ open, onClose }) => {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [loading, setLoading] = useState(false)
  const [purchasedBooks, setPurchasedBooks] = useState<string[]>(() => getUserPurchasedBooks(user?.id))

  useEffect(() => {
    const userEmail = user?.primaryEmailAddress?.emailAddress
    setPurchasedBooks(getUserPurchasedBooks(user?.id))

    // Sync from backend server (MongoDB paid orders)
    syncUserPurchasesFromBackend(user?.id, userEmail).then((updated) => {
      setPurchasedBooks(updated)
    })

    const handleUpdate = () => {
      setPurchasedBooks(getUserPurchasedBooks(user?.id))
    }
    window.addEventListener('purchases_updated', handleUpdate)
    return () => window.removeEventListener('purchases_updated', handleUpdate)
  }, [user?.id, user?.primaryEmailAddress?.emailAddress, open])





  const handleUpdateProfile = async () => {
    if (!user) return
    setLoading(true)
    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (err: any) {
      console.error('Failed to update profile:', err)
      toast.error(err?.errors?.[0]?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully!')
      onClose()
      navigate('/')
    } catch (err) {
      console.error('Sign out error:', err)
    }
  }

  if (!user) return null

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      className="custom-profile-modal"
    >
      <div className="p-2 sm:p-4 text-center">
        {/* Avatar */}
        <div className="relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-[#D4A017] shadow-md">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.fullName || 'User'} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-amber-100 text-amber-800 text-2xl font-bold">
              {user.firstName ? user.firstName[0] : 'U'}
            </div>
          )}
        </div>

        {/* User Name & Status */}
        {!isEditing ? (
          <div>
            <h3 className="font-playfair text-xl font-bold text-[var(--text-strong)] flex items-center justify-center gap-2">
              <span>{user.fullName || 'Manish Vaghasiya Reader'}</span>
              <button
                onClick={() => {
                  setFirstName(user.firstName || '')
                  setLastName(user.lastName || '')
                  setIsEditing(true)
                }}
                className="text-xs text-amber-700 hover:text-amber-900"
                title="Edit Name"
              >
                <EditOutlined />
              </button>
            </h3>
            <p className="text-xs text-[var(--text-soft)]">{user.primaryEmailAddress?.emailAddress}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Tag color="gold" className="!rounded-full !px-3 !py-0.5 !text-[11px] !font-bold">
                <SafetyCertificateOutlined /> VERIFIED E-BOOK READER
              </Tag>
            </div>
          </div>
        ) : (
          <div className="space-y-3 my-3 text-left bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
            <h4 className="text-xs font-bold text-[var(--text-strong)]">Update Profile Name</h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                size="small"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="!rounded-lg"
              />
              <Input
                size="small"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="!rounded-lg"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button size="small" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                size="small"
                type="primary"
                loading={loading}
                onClick={handleUpdateProfile}
                className="!bg-[#D4A017] !font-bold"
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {/* E-Book Library Access Box */}
        <div className="my-5 rounded-2xl border border-[var(--line-soft)] bg-amber-50/50 p-4 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--text-strong)] flex items-center gap-1.5">
              <BookOutlined className="text-amber-700" /> My Purchased E-Books
            </span>
            <Tag color="green" className="!rounded-full !px-2 !py-0.2 !text-[10px] !font-bold">
              {purchasedBooks.length} UNLOCKED
            </Tag>
          </div>

          {purchasedBooks.length > 0 ? (
            <div className="space-y-2 mt-2">
              {(purchasedBooks.includes('jivan-jitvu-che') || purchasedBooks.includes('combo-bundle')) && (
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-800">જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો</span>
                  <Button
                    size="small"
                    type="primary"
                    icon={<ReadOutlined />}
                    onClick={() => {
                      onClose()
                      navigate('/reader/jivan-jitvu-che')
                    }}
                    className="!bg-[#D4A017] !text-[11px] !font-bold"
                  >
                    Read
                  </Button>
                </div>
              )}
              {(purchasedBooks.includes('man-haryu-to-badhu-haryu') || purchasedBooks.includes('combo-bundle')) && (
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-200 shadow-xs">
                  <span className="text-xs font-bold text-slate-800">મન હાર્યું તો બધું હાર્યું</span>
                  <Button
                    size="small"
                    type="primary"
                    icon={<ReadOutlined />}
                    onClick={() => {
                      onClose()
                      navigate('/reader/man-haryu-to-badhu-haryu')
                    }}
                    className="!bg-[#D4A017] !text-[11px] !font-bold"
                  >
                    Read
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-1">
              <p className="text-xs text-[var(--text-soft)]">
                No e-books unlocked on this device yet.
              </p>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  onClose()
                  navigate('/resources')
                }}
                className="!px-0 !text-xs !font-bold !text-[var(--accent-earth)]"
              >
                Go to E-Book Store →
              </Button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--line-soft)]">
          <Button
            type="default"
            onClick={() => {
              onClose()
              navigate('/dashboard')
            }}
            className="!rounded-xl !text-xs !font-bold"
          >
            My Dashboard
          </Button>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleSignOut}
            className="!rounded-xl !text-xs !font-bold"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  )
}
