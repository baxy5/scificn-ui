import type { Metadata } from 'next'
import ThemingContent from '@/app/_pages/docs/theming-content'

export const metadata: Metadata = {
  title: 'Theming',
  description: 'The CSS variable token system — how it works and how to customize it.',
  alternates: { canonical: '/docs/theming' },
}

export default function Page() {
  return <ThemingContent />
}
