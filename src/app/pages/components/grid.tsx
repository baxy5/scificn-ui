import { Grid } from '@/ui/grid'
import { StatCard } from '@/ui/stat-card'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

// Placeholder tile for layout demos
function Tile({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div
      style={{
        border:        '1px solid var(--border)',
        background:    muted ? 'var(--surface)' : 'var(--surface-raised)',
        padding:       '1rem',
        fontSize:      '0.6rem',
        color:         muted ? 'var(--text-muted)' : 'var(--text-secondary)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textAlign:     'center',
      }}
    >
      {label}
    </div>
  )
}

const previewCode = `import { Grid } from '@/ui/grid'
import { StatCard } from '@/ui/stat-card'

<Grid preset="4-col" gap="1rem">
  <StatCard label="REACTOR OUTPUT" value="94.7%"  variant="ACTIVE"   sublabel="NOMINAL"  />
  <StatCard label="HULL INTEGRITY" value="61%"    variant="WARNING"  sublabel="DEGRADED" />
  <StatCard label="CREW MANIFEST"  value="312"                       sublabel="ABOARD"   />
  <StatCard label="CORE TEMP"      value="4820°K" variant="CRITICAL" sublabel="CRITICAL" />
</Grid>`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { Grid } from '@/ui/grid'

// Pre-baked preset
<Grid preset="3-col" gap="1rem">
  <Panel>...</Panel>
  <Panel>...</Panel>
  <Panel>...</Panel>
</Grid>

// sidebar + main layout
<Grid preset="sidebar-main" gap="1rem">
  <nav>...</nav>
  <main>...</main>
</Grid>

// Custom template
<Grid columns="2fr 1fr 1fr" gap="0.75rem">
  ...
</Grid>`

export default function GridPage() {
  return (
    <div>
      <PageHeader
        title="GRID"
        description="Responsive dashboard layout wrapper. Pre-baked column presets for common layouts. Accepts a custom columns string for full CSS grid-template-columns control."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Grid preset="4-col" gap="1rem" style={{ width: '100%' }}>
              <StatCard label="REACTOR OUTPUT" value="94.7%"  variant="ACTIVE"   sublabel="NOMINAL"  />
              <StatCard label="HULL INTEGRITY" value="61%"    variant="WARNING"  sublabel="DEGRADED" />
              <StatCard label="CREW MANIFEST"  value="312"                       sublabel="ABOARD"   />
              <StatCard label="CORE TEMP"      value="4820°K" variant="CRITICAL" sublabel="CRITICAL" />
            </Grid>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/grid/grid.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="PRESETS">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          {(
            [
              { preset: '2-col',        slots: ['COLUMN A', 'COLUMN B'] },
              { preset: '3-col',        slots: ['COLUMN A', 'COLUMN B', 'COLUMN C'] },
              { preset: '4-col',        slots: ['COL A', 'COL B', 'COL C', 'COL D'] },
              { preset: 'sidebar-main', slots: ['SIDEBAR 240px', 'MAIN CONTENT 1fr'] },
              { preset: 'main-sidebar', slots: ['MAIN CONTENT 1fr', 'SIDEBAR 240px'] },
            ] as const
          ).map(({ preset, slots }) => (
            <div key={preset}>
              <p
                style={{
                  marginBottom:  '0.4rem',
                  fontSize:      '0.6rem',
                  color:         'var(--text-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                preset=&quot;{preset}&quot;
              </p>
              <Grid preset={preset} gap="0.5rem" style={{ width: '100%' }}>
                {slots.map((label, i) => (
                  <Tile key={i} label={label} muted={i > 0} />
                ))}
              </Grid>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'preset',    type: '2-col | 3-col | 4-col | sidebar-main | main-sidebar', defaultValue: '"2-col"',    description: 'Pre-baked grid-template-columns value.' },
            { prop: 'columns',   type: 'string',                                              defaultValue: 'undefined', description: 'Custom CSS grid-template-columns. Overrides preset.' },
            { prop: 'gap',       type: 'string | number',                                     defaultValue: '"1rem"',    description: 'CSS gap between grid cells.' },
            { prop: 'rows',      type: 'string',                                              defaultValue: 'undefined', description: 'Custom CSS grid-template-rows.' },
            { prop: 'className', type: 'string',                                              defaultValue: '—',         description: 'Additional classes merged via cn().' },
          ]}
        />
      </Section>
    </div>
  )
}
