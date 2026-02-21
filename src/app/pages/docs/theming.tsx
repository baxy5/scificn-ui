import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { CodeBlock } from '@/app/components/docs/code-block'
import { useNarrow } from '@/lib/use-narrow'

const overrideExample = `/* In your own CSS, after importing globals.css */
:root {
  /* Change the primary brand color */
  --color-pink: #FF0080;

  /* Adjust the background darkness */
  --background: #000000;

  /* Change the active border glow color */
  --border-active: #00FF80;
}`

const glowExample = `/* Apply glow to any element */
.my-element {
  box-shadow: var(--glow-green);
  text-shadow: var(--text-glow-green);
}

/* Available glow values */
--glow-green   /* #00ed3f */
--glow-amber   /* #ff8800 */
--glow-red     /* #cc2200 */
--glow-blue    /* #4466cc */
--glow-teal    /* #6DC3BB — retained */
--glow-pink    /* #B53082 — retained */
--glow-orange  /* #F2963A — retained */`

const clipExample = `/* Corner notch clip-path sizes */
--clip-corner-sm  /* 6px cut */
--clip-corner-md  /* 10px cut */
--clip-corner-lg  /* 16px cut */

/* Usage */
.my-panel {
  clip-path: var(--clip-corner-md);
}`

const palette: Array<{ name: string; value: string; role: string }> = [
  { name: '--color-green',          value: '#00ed3f', role: 'Primary accent — alive / active / online' },
  { name: '--color-amber',          value: '#ff8800', role: 'Warning / attention' },
  { name: '--color-amber-light',    value: '#ffa238', role: 'Soft amber highlight' },
  { name: '--color-red',            value: '#cc2200', role: 'Danger / critical / stop' },
  { name: '--color-blue',           value: '#4466cc', role: 'Info / navigation / system' },
  { name: '--color-bone',           value: '#E0D5BE', role: 'Primary text — warm off-white' },
  { name: '--background',           value: '#050505', role: 'Main background' },
  { name: '--surface',              value: '#0D0D0D', role: 'Panel / card background' },
  { name: '--surface-raised',       value: '#141414', role: 'Elevated elements, headers' },
  { name: '--color-teal',           value: '#6DC3BB', role: 'Retained legacy color' },
  { name: '--color-pink',           value: '#B53082', role: 'Retained legacy color' },
  { name: '--color-orange',         value: '#F2963A', role: 'Retained legacy color' },
  { name: '--color-purple',         value: '#381B57', role: 'Retained legacy color' },
]

export default function Theming() {
  const narrow = useNarrow()
  return (
    <div>
      <PageHeader
        title="THEMING"
        description="The CSS variable token system — how it works and how to customize it."
      />

      <Section title="HOW IT WORKS">
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          All design decisions are expressed as CSS custom properties in{' '}
          <span style={{ color: 'var(--color-green)' }}>src/styles/globals.css</span>.
          There are two layers:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            ['@theme {}',  'Tailwind v4 block — tokens that generate utility classes like text-teal, bg-void.'],
            [':root {}',   'Semantic tokens — contextual roles like --background, --text-primary, --glow-teal.'],
          ].map(([token, desc]) => (
            <div key={token} style={{ display: 'flex', gap: '1rem', padding: '0.6rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <code style={{ color: 'var(--color-green)', fontSize: '0.75rem', minWidth: '90px', flexShrink: 0 }}>{token}</code>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="COLOR PALETTE">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {palette.map((c) => (
            <div
              key={c.name}
              style={{
                display:       'flex',
                flexDirection: narrow ? 'column' : 'row',
                alignItems:    narrow ? 'flex-start' : 'center',
                gap:           '0.75rem',
                padding:       '0.4rem 0.6rem',
                background:    'var(--surface)',
                border:        '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width:      '28px',
                    height:     '28px',
                    background: c.value,
                    border:     '1px solid var(--border)',
                    flexShrink: 0,
                  }}
                />
                <code style={{ fontSize: '0.7rem', color: 'var(--color-green)', ...(narrow ? {} : { minWidth: '200px', flexShrink: 0 }) }}>
                  {c.name}
                </code>
                <code style={{ fontSize: '0.7rem', color: 'var(--color-amber)', ...(narrow ? {} : { minWidth: '80px', flexShrink: 0 }) }}>
                  {c.value}
                </code>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CUSTOMIZING">
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Override any CSS variable after importing globals.css. Components automatically pick up your changes.
        </p>
        <CodeBlock code={overrideExample} language="css" />
      </Section>

      <Section title="GLOW EFFECTS">
        <CodeBlock code={glowExample} language="css" />
      </Section>

      <Section title="CORNER NOTCHES">
        <CodeBlock code={clipExample} language="css" />
      </Section>
    </div>
  )
}
