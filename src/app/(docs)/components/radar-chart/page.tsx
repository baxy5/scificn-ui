import type { Metadata } from 'next'
import { RadarChartContent } from '@/app/_pages/components/radar-chart-content'

export const metadata: Metadata = {
  title: 'RADAR CHART',
  description: 'SVG radar (spider) chart with configurable axes, concentric grid polygons, fade-in animation, and four color variants. Values normalized to 0–100.',
  alternates: { canonical: '/components/radar-chart' },
}

export default function Page() {
  return <RadarChartContent />
}
