import type { Metadata } from 'next'
import { SciFiContent } from '@/app/_pages/showcase/sci-fi-content'

export const metadata: Metadata = {
  title: 'Nexus Station-7 Ops Control',
  description: 'Deep space station operations terminal for vessel docking, module monitoring, crew tracking, and transmissions.',
  alternates: { canonical: '/showcase/sci-fi' },
}

export default function Page() {
  return <SciFiContent />
}
