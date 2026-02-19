import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs'

<Tabs defaultValue="status">
  <TabsList>
    <TabsTrigger value="status">STATUS</TabsTrigger>
    <TabsTrigger value="sensors">SENSORS</TabsTrigger>
    <TabsTrigger value="comms">COMMS</TabsTrigger>
  </TabsList>
  <TabsContent value="status">Status panel content.</TabsContent>
  <TabsContent value="sensors">Sensor readouts here.</TabsContent>
  <TabsContent value="comms">Communications log.</TabsContent>
</Tabs>`

const installCode = `npm install @radix-ui/react-tabs clsx tailwind-merge`

const usageCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/ui/tabs'

export function SystemTabs() {
  return (
    <Tabs defaultValue="nav">
      <TabsList>
        <TabsTrigger value="nav">NAVIGATION</TabsTrigger>
        <TabsTrigger value="weapons">WEAPONS</TabsTrigger>
        <TabsTrigger value="shields">SHIELDS</TabsTrigger>
      </TabsList>
      <TabsContent value="nav">
        <p>Navigation subsystem online.</p>
      </TabsContent>
      <TabsContent value="weapons">
        <p>Weapons array charged.</p>
      </TabsContent>
      <TabsContent value="shields">
        <p>Shield matrix nominal.</p>
      </TabsContent>
    </Tabs>
  )
}`

export default function TabsPage() {
  return (
    <div>
      <PageHeader
        title="TABS"
        description="Tabbed panel built on Radix UI. Underline-style active indicator in primary color. Uppercase monospace trigger labels."
        dependencies={['@radix-ui/react-tabs']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <div style={{ width: '100%' }}>
              <Tabs defaultValue="status">
                <TabsList>
                  <TabsTrigger value="status">STATUS</TabsTrigger>
                  <TabsTrigger value="sensors">SENSORS</TabsTrigger>
                  <TabsTrigger value="comms">COMMS</TabsTrigger>
                </TabsList>
                <TabsContent value="status">
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>All systems nominal.</p>
                </TabsContent>
                <TabsContent value="sensors">
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No anomalies detected.</p>
                </TabsContent>
                <TabsContent value="comms">
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Channel open.</p>
                </TabsContent>
              </Tabs>
            </div>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/tabs/tabs.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="ANATOMY">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['Tabs',         'Root — manages active tab state. Use defaultValue or value + onValueChange.'],
            ['TabsList',     'Horizontal container with bottom border. Houses all TabsTrigger elements.'],
            ['TabsTrigger',  'Clickable tab label. Active state: primary color underline + text glow.'],
            ['TabsContent',  'Panel shown when its value matches the active tab. Adds top margin.'],
            ['TabsGroup',    'Alias for TabsList — same component, different name.'],
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
            { prop: 'defaultValue',  type: 'string',                  defaultValue: '—', description: 'Initial active tab value (uncontrolled).' },
            { prop: 'value',         type: 'string',                  defaultValue: '—', description: 'Controlled active tab value.' },
            { prop: 'onValueChange', type: '(value: string) => void', defaultValue: '—', description: 'Callback fired when active tab changes.' },
          ]}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          TabsTrigger requires a <code>value</code> prop matching the corresponding TabsContent <code>value</code>.
        </p>
      </Section>
    </div>
  )
}
