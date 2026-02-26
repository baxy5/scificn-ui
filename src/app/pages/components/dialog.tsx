import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter,
} from '@/ui/dialog'
import { Button } from '@/ui/button'
import { PageHeader } from '@/app/components/docs/page-header'
import { Section } from '@/app/components/docs/section'
import { ComponentPreview } from '@/app/components/docs/component-preview'
import { CodeBlock } from '@/app/components/docs/code-block'
import { PropsTable } from '@/app/components/docs/props-table'

const previewCode = `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter,
} from '@/ui/dialog'
import { Button } from '@/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button variant="OUTLINE">OPEN DIALOG</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>CONFIRM OPERATION</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <DialogDescription>
        This action will initiate the sequence. Proceed?
      </DialogDescription>
    </DialogBody>
    <DialogFooter>
      <Button variant="ABORT" size="SM">CANCEL</Button>
      <Button variant="EXEC" size="SM">CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`

const installCode = `npx shadcn@latest add @scificn/dialog`


const usageCode = `import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogTitle, DialogDescription,
  DialogBody, DialogFooter,
} from '@/ui/dialog'
import { Button } from '@/ui/button'

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="EXEC">INITIATE SEQUENCE</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SEQUENCE CONFIRMATION</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Warning: this action cannot be undone. All systems will
            be locked until the sequence completes.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <Button variant="ABORT" size="SM">ABORT</Button>
          <Button variant="EXEC" size="SM">EXECUTE</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`

export default function DialogPage() {
  return (
    <div>
      <PageHeader
        title="DIALOG"
        description="Modal overlay built on Radix UI. Corner-notched panel with animated entrance. Composable sub-components for header, body, and footer layout."
        dependencies={['@radix-ui/react-dialog']}
      />

      <Section title="PREVIEW">
        <ComponentPreview
          code={previewCode}
          preview={
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="OUTLINE">OPEN DIALOG</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>CONFIRM OPERATION</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <DialogDescription>
                    This action will initiate the sequence. All systems will be locked until complete.
                  </DialogDescription>
                </DialogBody>
                <DialogFooter>
                  <Button variant="ABORT" size="SM">CANCEL</Button>
                  <Button variant="EXEC" size="SM">CONFIRM</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />
      </Section>

      <Section title="INSTALLATION">
        <CodeBlock code={installCode} language="bash" />
      </Section>

      <Section title="USAGE">
        <CodeBlock code={usageCode} />
      </Section>

      <Section title="ANATOMY">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            ['Dialog',             'Root — manages open/closed state via Radix.'],
            ['DialogTrigger',      'Wraps the element that opens the dialog.'],
            ['DialogContent',      'The panel — renders in a Portal with overlay. Contains close button.'],
            ['DialogHeader',       'Top section with bottom border. Place DialogTitle here.'],
            ['DialogTitle',        'Required for accessibility. Uppercase monospace heading.'],
            ['DialogDescription',  'Optional body text. Muted color.'],
            ['DialogBody',         'Main content area with standard padding.'],
            ['DialogFooter',       'Bottom section with top border. Right-aligns action buttons.'],
            ['DialogClose',        'Re-exported Radix close primitive for custom close triggers.'],
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
            { prop: 'open',           type: 'boolean',            defaultValue: '—',     description: 'Controlled open state.' },
            { prop: 'onOpenChange',   type: '(open: boolean) => void', defaultValue: '—', description: 'Callback fired when the dialog opens or closes.' },
            { prop: 'defaultOpen',    type: 'boolean',            defaultValue: 'false', description: 'Initial open state (uncontrolled).' },
            { prop: 'modal',          type: 'boolean',            defaultValue: 'true',  description: 'When true, interaction outside the dialog is blocked.' },
          ]}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          DialogContent, DialogHeader, DialogBody, DialogFooter extend <code>React.HTMLAttributes&lt;HTMLDivElement&gt;</code>.
        </p>
      </Section>
    </div>
  )
}
