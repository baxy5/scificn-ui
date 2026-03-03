import type { Metadata } from 'next'
import { StatCardContent } from '@/app/_pages/components/stat-card-content'

export const metadata: Metadata = {
  title: 'STAT CARD',
  description: 'Metric tile for dashboards. Displays a primary value, contextual label, optional delta trend indicator, and a sublabel status line.',
  alternates: { canonical: '/components/stat-card' },
}

export default function Page() {
  return <StatCardContent />
}
