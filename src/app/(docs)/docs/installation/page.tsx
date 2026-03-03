import type { Metadata } from 'next'
import InstallationContent from '@/app/_pages/docs/installation-content'

export const metadata: Metadata = {
  title: 'Installation',
  description: 'Add any component with a single command. The shadcn CLI downloads the source into your project and installs dependencies automatically.',
  alternates: { canonical: '/docs/installation' },
}

export default function Page() {
  return <InstallationContent />
}
