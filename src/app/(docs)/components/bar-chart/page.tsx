import type { Metadata } from 'next'
import { BarChartContent } from '@/app/_pages/components/bar-chart-content'

export const metadata: Metadata = {
  title: 'BAR CHART',
  description: 'CSS-only bar chart. No charting library dependency. Supports horizontal and vertical orientations with four color variants.',
  alternates: { canonical: '/components/bar-chart' },
}

export default function Page() {
  return <BarChartContent />
}
