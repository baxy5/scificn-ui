import type { Metadata } from 'next'
import { LineChartContent } from '@/app/_pages/components/line-chart-content'

export const metadata: Metadata = {
  title: 'LINE CHART',
  description: 'SVG line chart with multi-series support, animated draw-on effect, optional area fill, grid lines, and an automatic legend.',
  alternates: { canonical: '/components/line-chart' },
}

export default function Page() {
  return <LineChartContent />
}
