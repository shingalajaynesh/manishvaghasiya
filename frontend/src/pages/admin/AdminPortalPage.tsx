import React, { useState, useEffect } from 'react'
import {
  SafetyCertificateOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  PlusOutlined,
  GiftOutlined,
  KeyOutlined,
  CheckCircleOutlined,
  FilePdfOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import { Button, Input, Table, Tag, Card, Modal, Select, Statistic, Alert } from 'antd'
import toast from 'react-hot-toast'
import { SeoHead } from '../../shared/components/site/SeoHead'
import { PageHero } from '../../shared/components/site/PageHero'
import { API_URL } from '../../shared/lib/api'

export function AdminPortalPage() {
  const [pin, setPin] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true'
  })

  // Admin Data State
  const [stats, setStats] = useState<{ totalRevenue: number; totalPaidOrders: number; totalSubscribers: number; customBooksCount: number }>({
    totalRevenue: 0,
    totalPaidOrders: 0,
    totalSubscribers: 0,
    customBooksCount: 0,
  })
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Grant Free Access Form State
  const [grantEmail, setGrantEmail] = useState('')
  const [grantName, setGrantName] = useState('')
  const [grantBookId, setGrantBookId] = useState('jivan-jitvu-che')
  const [grantLoading, setGrantLoading] = useState(false)

  // Add Book Form State
  const [addBookModalOpen, setAddBookModalOpen] = useState(false)
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    pages: '250 Pages',
    price: 199,
    originalPrice: 499,
    discountTag: '60% OFF',
    image: '/books/images/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati.png',
    pdf: '/books/pdf/Jivan-Jitvu-Che-To-Parivar-Thi-Sharu-Karo_Gujarati_Master.pdf',
    badge: 'NEW RELEASE',
  })
  const [addBookLoading, setAddBookLoading] = useState(false)

  // 1. Authenticate PIN
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === '1908' || pin === 'chll eutt yflc dwal') {
      sessionStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
      toast.success('Admin authentication verified!')
    } else {
      toast.error('Invalid Admin PIN code. Access denied.')
    }
  }

  // 2. Fetch Admin Data
  const fetchAdminData = async () => {
    setLoading(true)
    try {
      // Fetch Stats
      const statsRes = await fetch(`${API_URL}/api/admin/stats`, {
        headers: { 'x-admin-pin': '1908' },
      })
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        if (statsData?.stats) setStats(statsData.stats)
      }

      // Fetch Orders
      const ordersRes = await fetch(`${API_URL}/api/admin/orders`, {
        headers: { 'x-admin-pin': '1908' },
      })
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json()
        if (Array.isArray(ordersData?.orders)) setOrders(ordersData.orders)
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData()
    }
  }, [isAuthenticated])

  // 3. Grant Free Access
  const handleGrantFreeAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!grantEmail) {
      toast.error('Please enter a valid user email address')
      return
    }

    setGrantLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/admin/grant-free-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': '1908',
        },
        body: JSON.stringify({
          userEmail: grantEmail.trim(),
          buyerName: grantName.trim() || 'Gilded Reader',
          bookId: grantBookId,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`🎁 Free access granted to ${grantEmail}!`)
        setGrantEmail('')
        setGrantName('')
        fetchAdminData()
      } else {
        toast.error(data.error || 'Failed to grant free access')
      }
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to grant free access')
    } finally {
      setGrantLoading(false)
    }
  }

  // 4. Add New Book Submit
  const handleAddNewBook = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBook.title || !newBook.description) {
      toast.error('Please fill in title and description')
      return
    }

    setAddBookLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/admin/add-new-book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-pin': '1908',
        },
        body: JSON.stringify(newBook),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Book '${newBook.title}' added to E-Book Store!`)
        setAddBookModalOpen(false)
        fetchAdminData()
      } else {
        toast.error(data.error || 'Failed to add new book')
      }
    } catch (err: any) {
      console.error(err)
      toast.error('Failed to publish new book')
    } finally {
      setAddBookLoading(false)
    }
  }

  // UNAUTHENTICATED PIN PROMPT
  if (!isAuthenticated) {
    return (
      <>
        <SeoHead title="Secure Admin Portal | Manish Vaghasiya" description="Secure obfuscated portal" />
        <PageHero eyebrow="SECURE SYSTEM PORTAL" title="પ્રશાસક લોગિન (Admin Portal)" description="Enter secure 4-digit admin access PIN to continue." />
        <div className="editorial-container flex justify-center py-16 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[var(--line-soft)] bg-white p-8 shadow-xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <KeyOutlined className="text-2xl" />
            </div>
            <h3 className="font-playfair text-2xl font-bold text-[var(--text-strong)]">Admin Passcode Required</h3>
            <p className="mt-1 text-xs text-[var(--text-soft)] mb-6">Enter secure PIN 1908 to unlock system control panel.</p>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <Input.Password
                size="large"
                placeholder="Enter Admin PIN (e.g. 1908)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="!rounded-xl !text-center !font-mono !text-lg"
                required
              />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
              >
                Unlock Secure Portal
              </Button>
            </form>
          </div>
        </div>
      </>
    )
  }

  // AUTHENTICATED ADMIN DASHBOARD
  const orderColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: any) => new Date(val).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    },
    {
      title: 'Buyer Name',
      dataIndex: 'buyerName',
      key: 'buyerName',
      render: (text: string) => <span className="font-bold text-slate-800">{text}</span>,
    },
    {
      title: 'Email Address',
      dataIndex: 'buyerEmail',
      key: 'buyerEmail',
      render: (text: string) => <span className="text-xs text-amber-900 font-mono">{text}</span>,
    },
    {
      title: 'Book Unlocked',
      dataIndex: 'bookId',
      key: 'bookId',
      render: (bId: string) => <Tag color="gold">{bId}</Tag>,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amount',
      key: 'amount',
      render: (amt: number) => <span className="font-extrabold text-emerald-700">₹{amt}</span>,
    },
    {
      title: 'Payment ID',
      dataIndex: 'razorpayPaymentId',
      key: 'razorpayPaymentId',
      render: (pId: string) => <span className="text-[10px] text-gray-500 font-mono">{pId}</span>,
    },
  ]

  return (
    <>
      <SeoHead title="System Admin Control Panel | Manish Vaghasiya" description="Obfuscated Admin Control Portal" />

      <section className="editorial-container px-4 py-8">
        {/* Header Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-[var(--line-soft)]">
          <div>
            <Tag color="volcano" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
              <SafetyCertificateOutlined /> OBFUSCATED SYSTEM PORTAL (ROUTE: /1908/admin)
            </Tag>
            <h1 className="font-playfair text-3xl font-bold text-[var(--text-strong)] mt-2">
              System Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button icon={<ReloadOutlined />} onClick={fetchAdminData} loading={loading} className="!rounded-xl !font-bold">
              Refresh Data
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddBookModalOpen(true)}
              className="!rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
            >
              Add New E-Book & PDF
            </Button>
          </div>
        </div>

        {/* 1. Analytics & Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-center shadow-sm">
            <Statistic title="Total Revenue Collected" value={stats.totalRevenue} prefix="₹" styles={{ content: { color: '#8e4527', fontWeight: 800 } }} />
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-center shadow-sm">
            <Statistic title="Paid E-Book Orders" value={stats.totalPaidOrders} prefix={<ShoppingOutlined />} styles={{ content: { color: '#15803d', fontWeight: 800 } }} />
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 text-center shadow-sm">
            <Statistic title="Total Subscribers" value={stats.totalSubscribers} prefix={<UsergroupAddOutlined />} styles={{ content: { color: '#1d4ed8', fontWeight: 800 } }} />
          </div>
          <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-5 text-center shadow-sm">
            <Statistic title="Custom E-Books Published" value={stats.customBooksCount} prefix={<BookOutlined />} styles={{ content: { color: '#6b21a8', fontWeight: 800 } }} />
          </div>
        </div>

        {/* 2. Grant Free E-Book Access Tool */}
        <div className="mb-8 rounded-3xl border border-emerald-300 bg-emerald-50/70 p-6 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <Tag color="green" className="!rounded-full !px-3 !py-1 !text-xs !font-bold">
              <GiftOutlined /> GRANT FREE E-BOOK ACCESS
            </Tag>
            <span className="text-xs font-bold text-emerald-800">Gift an E-Book PDF directly to any student or user email!</span>
          </div>

          <form onSubmit={handleGrantFreeAccess} className="grid gap-3 md:grid-cols-4 items-end">
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">User Email Address *</label>
              <Input
                type="email"
                placeholder="student@gmail.com"
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                className="!rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">User Full Name (Optional)</label>
              <Input
                placeholder="Ramesh Patel"
                value={grantName}
                onChange={(e) => setGrantName(e.target.value)}
                className="!rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1">Select E-Book to Grant *</label>
              <Select
                value={grantBookId}
                onChange={setGrantBookId}
                className="w-full !rounded-xl"
                options={[
                  { value: 'jivan-jitvu-che', label: 'જીવન જીતવું છે તો પરિવારથી શરૂઆત કરો' },
                  { value: 'man-haryu-to-badhu-haryu', label: 'મન હાર્યું તો બધું હાર્યું' },
                  { value: 'combo-bundle', label: '🔥 બંને માસ્ટર પુસ્તકો બંડલ (Combo)' },
                ]}
              />
            </div>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                loading={grantLoading}
                icon={<GiftOutlined />}
                block
                className="!h-10 !rounded-xl !bg-emerald-700 !font-bold hover:!bg-emerald-800"
              >
                Grant Instant Free Access
              </Button>
            </div>
          </form>
        </div>

        {/* 3. Orders & Transactions Log Table */}
        <div className="rounded-3xl border border-[var(--line-soft)] bg-white p-6 shadow-editorial">
          <h3 className="font-playfair text-xl font-bold text-[var(--text-strong)] mb-4 flex items-center justify-between">
            <span>Recent Orders & Transactions Log ({orders.length})</span>
            <Tag color="gold">LIVE MONGO DB DATABASE</Tag>
          </h3>

          <Table
            dataSource={orders}
            columns={orderColumns}
            rowKey={(r) => r._id || r.razorpayPaymentId}
            pagination={{ pageSize: 10 }}
            className="no-scrollbar"
          />
        </div>
      </section>

      {/* Modal: Add New Book & PDF */}
      <Modal
        open={addBookModalOpen}
        onCancel={() => setAddBookModalOpen(false)}
        footer={null}
        title="➕ Publish & Add New E-Book"
        centered
        width={550}
      >
        <form onSubmit={handleAddNewBook} className="space-y-3 mt-4">
          <div>
            <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">Book Gujarati Title *</label>
            <Input
              placeholder="e.g. સફળતાના ૧૦ સોનેરી નિયમો"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="!rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">English Subtitle</label>
            <Input
              placeholder="10 Golden Rules of Success"
              value={newBook.subtitle}
              onChange={(e) => setNewBook({ ...newBook, subtitle: e.target.value })}
              className="!rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">Description *</label>
            <Input.TextArea
              rows={3}
              placeholder="Gujarati book description..."
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              className="!rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">Price (₹) *</label>
              <Input
                type="number"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
                className="!rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">Original Price (₹)</label>
              <Input
                type="number"
                value={newBook.originalPrice}
                onChange={(e) => setNewBook({ ...newBook, originalPrice: Number(e.target.value) })}
                className="!rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">Cover Image Path/URL *</label>
            <Input
              placeholder="/books/images/New-Book-Cover.png"
              value={newBook.image}
              onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
              className="!rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-soft)] mb-1">PDF File Path/URL *</label>
            <Input
              placeholder="/books/pdf/New-Book-Master.pdf"
              value={newBook.pdf}
              onChange={(e) => setNewBook({ ...newBook, pdf: e.target.value })}
              className="!rounded-xl"
              required
            />
          </div>

          <div className="pt-3">
            <Button
              type="primary"
              htmlType="submit"
              loading={addBookLoading}
              icon={<CheckCircleOutlined />}
              block
              size="large"
              className="!h-12 !rounded-xl !bg-[#D4A017] !font-bold hover:!bg-[#b88910]"
            >
              Publish Book to E-Book Store
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
