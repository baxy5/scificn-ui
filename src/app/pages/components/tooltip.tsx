import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'
import { Button } from '@/ui/button'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'
import { Button } from '@/ui/button'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="OUTLINE" size="SM">HOVER ME</Button>
    </TooltipTrigger>
    <TooltipContent>ENGAGE WARP DRIVE</TooltipContent>
  </Tooltip>
</TooltipProvider>`

const installCode = `npm install @radix-ui/react-tooltip clsx tailwind-merge`

const usageCode = `import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from '@/ui/tooltip'

// Wrap your app (or a section) with TooltipProvider once
export function App() {
  return (
    <TooltipProvider>
      {/* ... app content ... */}
    </TooltipProvider>
  )
}

// Then use Tooltip anywhere inside:
export function IconButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button>◎</button>
      </TooltipTrigger>
      <TooltipContent side="bottom">TARGET LOCK</TooltipContent>
    </Tooltip>
  )
}`

export default function TooltipPage() {
  return (
    <div>
      <PageHeader
        title="TOOLTIP"
        description="Contextual label built on Radix UI. Appears on hover/focus with fade + zoom animation. Requires wrapping TooltipProvider."
        dependencies={['@radix-ui/react-tooltip']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="OUTLINE" size="SM">HOVER ME</Button>
                </TooltipTrigger>
                <TooltipContent>ENGAGE WARP DRIVE</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
        <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Then copy <span style={{ color: 'var(--color-green)' }}>src/ui/tooltip/tooltip.tsx</span> into your project.
        </p>
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="PLACEMENT">
        <TooltipProvider>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger asChild>
                  <Button variant="GHOST" size="SM">{side.toUpperCase()}</Button>
                </TooltipTrigger>
                <TooltipContent side={side}>TOOLTIP ON {side.toUpperCase()}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </Section>

      <Section title="ANATOMY">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['TooltipProvider', 'Context provider. Required once per subtree. Controls open delay.'],
            ['Tooltip',         'Root — manages hover state.'],
            ['TooltipTrigger',  'The element that shows the tooltip on hover/focus. Use asChild to style any element.'],
            ['TooltipContent',  'The tooltip panel. Portaled. Has fade + zoom entrance animation.'],
          ].map(([comp, desc]) => (
            <div key={comp} style={{ display: 'flex', gap: '1rem', padding: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)' }}>
              <code style={{ color: 'var(--color-green)', fontSize: '0.7rem', minWidth: '160px', flexShrink: 0 }}>{comp}</code>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="PROPS">
        <PropsTable
          rows={[
            { prop: 'side',        type: '"top" | "right" | "bottom" | "left"', defaultValue: '"top"', description: 'Side of the trigger where the tooltip appears.' },
            { prop: 'sideOffset',  type: 'number',                              defaultValue: '6',     description: 'Pixel offset from the trigger element.' },
            { prop: 'delayDuration',type: 'number (on Provider)',               defaultValue: '400',   description: 'Milliseconds before the tooltip opens on hover.' },
          ]}
        />
      </Section>
    </div>
  )
}
