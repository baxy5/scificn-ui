import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { useNarrow } from '@/lib/use-narrow'

export default function Introduction() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="INTRODUCTION"
        description="What scificn/ui is, why it exists, and how it works."
      />

      <Section title="WHAT IS SCIFICN/UI">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          <p>
            <span style={{ color: 'var(--color-green)', textShadow: 'var(--text-glow-green)' }}>SCIFICN/UI</span> is a retro sci-fi React component library built on{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Radix UI</span> and{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Tailwind CSS v4</span>.
            It implements a Cassette Futurism / Terminal UI design language — the visual aesthetic
            of computers as imagined by the 1970s and 1980s.
          </p>
          <p>
            Unlike traditional component libraries, scificn/ui is <span style={{ color: 'var(--text-secondary)' }}>not installed as an npm package</span>.
            Instead, you copy the component source files directly into your project.
            You own the code. Modify it freely. No version lock-in.
          </p>
        </div>
      </Section>

      <Section title="DESIGN LANGUAGE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            ['ZERO ROUNDED CORNERS',   'Hard edges everywhere. border-radius: 0px enforced globally.'],
            ['MONOSPACE ONLY',         'IBM Plex Mono as the exclusive typeface. Every character on the grid.'],
            ['PHOSPHOR GLOW',          'box-shadow and text-shadow glow effects instead of drop shadows.'],
            ['CORNER NOTCHES',         'clip-path cutoffs on panels instead of rounded corners.'],
            ['DELIBERATE PALETTE',     'Green (alive), Amber (warning), Red (danger/stop), Blue (info/system).'],
            ['ALL CAPS LABELS',        'Variant names, labels, and UI text follow terminal conventions.'],
            ['CRT EFFECTS',            'Scanlines, flicker, and blink animations for tactile presence.'],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                display:      'flex',
                flexDirection: narrow ? 'column' : 'row',
                gap:          '0.5rem',
                padding:      '0.6rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <span
                style={{
                  fontSize:      '0.65rem',
                  color:         'var(--color-green)',
                  letterSpacing: '0.08em',
                  whiteSpace:    'nowrap',
                  ...(narrow ? {} : { minWidth: '180px', flexShrink: 0 }),
                  paddingTop:    '2px',
                }}
              >
                {title}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {desc}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="ACCESSIBILITY">
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          All interactive components are built on{' '}
          <span style={{ color: 'var(--text-secondary)' }}>Radix UI primitives</span>,
          which provide WAI-ARIA compliance, keyboard navigation, focus management, and screen reader support.
          The retro aesthetic does not compromise on accessibility.
        </p>
      </Section>

      <Section title="BUILT WITH">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['React 19',                   'Component framework'],
            ['TypeScript',                 'Type safety across all components'],
            ['Tailwind CSS v4',            'Utility-first styling with CSS-first config'],
            ['Radix UI',                   'Headless accessible primitives'],
            ['class-variance-authority',   'Type-safe variant system (CVA)'],
            ['clsx + tailwind-merge',      'Class merging utilities (cn())'],
          ].map(([pkg, desc]) => (
            <div key={pkg} style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: narrow ? '0.25rem' : '1rem', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', ...(narrow ? {} : { minWidth: '220px', flexShrink: 0 }) }}>
                {pkg}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
