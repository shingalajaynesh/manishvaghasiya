import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { routePaths } from '../../../content/routes'
import { API_URL } from '../../lib/api'

const { Paragraph, Text } = Typography

interface EmailCaptureFormProps {
  successHref?: string
  successLabel?: string
}

interface FormValues {
  email: string
  name?: string
}

export function EmailCaptureForm({
  successHref = routePaths.resources,
  successLabel = 'Continue',
}: EmailCaptureFormProps) {
  const [form] = Form.useForm<FormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)

    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        const errorMessage = data.error ?? 'We could not process your request.'
        setMessage(errorMessage)
        toast.error(errorMessage)
        return
      }

      const successMessage = data.message ?? 'Your request has been received successfully.'
      setSubmitted(true)
      setMessage(successMessage)
      form.resetFields()
      toast.success(successMessage)
    } catch {
      const errorMessage = 'Network error. Please make sure the server is running.'
      setMessage(errorMessage)
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="editorial-surface rounded-[24px] px-6 py-6">
        <Space orientation="vertical" size={10}>
          <Text className="!text-sm !font-semibold !text-[var(--text-strong)]">
            Thank you for joining.
          </Text>
          <Paragraph className="!mb-0 !text-sm !leading-7 !text-[var(--text-soft)]">
            {message}
          </Paragraph>
          <Button type="primary" href={successHref} icon={<ArrowRightOutlined />}>
            {successLabel}
          </Button>
        </Space>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Text className="!mb-4 !block !text-xs !font-semibold !uppercase !tracking-[0.26em] !text-[var(--text-muted)]">
        Join the early audience
      </Text>

      <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item<FormValues> name="name" label="Your name">
          <Input placeholder="Enter your name" />
        </Form.Item>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Form.Item<FormValues>
            name="email"
            label="Email address"
            rules={[
              { required: true, message: 'Please enter a valid email address.' },
              { type: 'email', message: 'Please enter a valid email address.' },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <div className="flex items-end">
            <Button type="primary" htmlType="submit" loading={submitting} className="!w-full sm:!w-auto">
              Get the Guide
            </Button>
          </div>
        </div>
      </Form>

      {message ? (
        <Paragraph className="!mb-0 !mt-3 !text-sm !text-[var(--text-soft)]">{message}</Paragraph>
      ) : null}

      <Paragraph className="!mb-0 !mt-4 !text-xs !leading-6 !text-[var(--text-muted)]">
        By subscribing, you agree to receive practical updates, resources, and relevant platform communication.
      </Paragraph>
      <Link to={routePaths.privacy} className="editorial-link mt-2 inline-block text-xs">
        Review privacy policy
      </Link>
    </div>
  )
}
