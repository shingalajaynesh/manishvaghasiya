import { FacebookFilled, InstagramFilled, LinkedinFilled, YoutubeFilled } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { socialLinks } from '../../../content/site'

const icons = {
  Instagram: <InstagramFilled />,
  Facebook: <FacebookFilled />,
  YouTube: <YoutubeFilled />,
  LinkedIn: <LinkedinFilled />,
}

export function SocialLinks() {
  return (
    <Space wrap size={[8, 8]}>
      {socialLinks.map(({ name, url }) => {
        const icon = icons[name as keyof typeof icons]

        return (
          <Button
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow Manish Vaghasiya on ${name}`}
            icon={icon}
            className="!h-9 !rounded-full !border-[var(--line-soft)] !bg-white/80 !px-3 !text-[var(--text-soft)] hover:!text-[var(--accent-earth)]"
          >
            {name}
          </Button>
        )
      })}
    </Space>
  )
}
