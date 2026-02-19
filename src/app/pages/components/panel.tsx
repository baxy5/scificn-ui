import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/ui/panel'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Panel, PanelHeader, PanelTitle, PanelContent } from '@/ui/panel'

<Panel notch="md">
  <PanelHeader>
    <PanelTitle>SECTOR STATUS</PanelTitle>
  </PanelHeader>
  <PanelContent>
    Panel content goes here.
  </PanelContent>
</Panel>`

const installCode = `npm install clsx tailwind-merge`

const usageCode = `import { Panel, PanelHeader, PanelTitle, PanelContent, PanelFooter } from '@/ui/panel'

export function StatusPanel() {
  return (
    <Panel notch="md">
      <PanelHeader>
        <PanelTitle>NAVIGATION DATA</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <p>Current sector: ALPHA-7</p>
        <p>ETA: 04:32:11</p>
      </PanelContent>
      <PanelFooter>
        <span>LAST SYNC: 00:00:04</span>
      </PanelFooter>
    </Panel>
  )
}`

export default function PanelPage() {
  return (
    <div>
      <PageHeader
        title="PANEL"
        description="Container with optional corner-notch clip-path. Composes PanelHeader, PanelContent, and PanelFooter sub-components for consistent internal layout."
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Panel notch="md" style={{ width: '100%', maxWidth: '340px' }}>
              <PanelHeader>
                <PanelTitle>SECTOR STATUS</PanelTitle>
              </PanelHeader>
              <PanelContent>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Panel content goes here.</p>
              </PanelContent>
            </Panel>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/panel/panel.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="NOTCH SIZES">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {(['none', 'sm', 'md', 'lg'] as const).map((n) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Panel notch={n}>
                <PanelHeader>
                  <PanelTitle>NOTCH: {n.toUpperCase()}</PanelTitle>
                </PanelHeader>
                <PanelContent>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {n === 'none' ? 'No corner cut.' : `${n === 'sm' ? '6' : n === 'md' ? '10' : '16'}px corner cutoff.`}
                  </p>
                </PanelContent>
              </Panel>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                notch=&quot;{n}&quot;
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="ANATOMY">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['Panel',       'Root container. Applies notch clip-path, border, overflow hidden.'],
            ['PanelHeader', 'Top section with bottom border. Surface-raised background.'],
            ['PanelTitle',  'h3 label inside header. Uppercase, small, muted.'],
            ['PanelContent','Main content area with 1rem padding.'],
            ['PanelFooter', 'Bottom section with top border. Surface-raised background.'],
          ].map(([comp, desc]) => (
            <div key={comp} style={{ display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <code style={{ color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '130px', flexShrink: 0 }}>{comp}</code>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'notch',     type: 'sm | md | lg | none', defaultValue: 'md',  description: 'Corner notch size. Uses clip-path polygon to cut the top-left and bottom-right corners.' },
            { prop: 'className', type: 'string',               defaultValue: '—',   description: 'Additional classes applied to the root element.' },
          ]}
        />
      </Section>
    </div>
  )
}
