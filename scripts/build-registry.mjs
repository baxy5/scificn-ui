/**
 * build-registry.mjs
 *
 * Reads every src/ui/{name}/{name}.tsx component file and generates
 * shadcn-compatible registry JSON files in public/r/.
 *
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcUi = join(root, 'src', 'ui')
const outDir = join(root, 'public', 'r')

mkdirSync(outDir, { recursive: true })

// ─── Component definitions ────────────────────────────────────────────────────

const components = [
  {
    name: 'button',
    title: 'Button',
    description: 'Command-style button with EXEC, OUTLINE, GHOST, and DANGER variants. Supports SM and MD sizes.',
    dependencies: ['class-variance-authority', 'clsx', 'tailwind-merge', '@radix-ui/react-slot'],
  },
  {
    name: 'badge',
    title: 'Badge',
    description: 'Status indicator badge with ACTIVE, SCANNING, WARNING, CRITICAL, and OFFLINE variants.',
    dependencies: ['clsx'],
  },
  {
    name: 'alert',
    title: 'Alert',
    description: 'Inline alert block with STATUS, WARNING, CRITICAL, and INFO variants. Includes icon prefix.',
    dependencies: ['clsx'],
  },
  {
    name: 'panel',
    title: 'Panel',
    description: 'Container with optional corner-notch clip-path. Composes PanelHeader, PanelContent, and PanelFooter.',
    dependencies: ['clsx'],
  },
  {
    name: 'spinner',
    title: 'Spinner',
    description: 'Animated loading indicator with SM, MD, and LG sizes. Optional text label.',
    dependencies: ['clsx'],
  },
  {
    name: 'separator',
    title: 'Separator',
    description: 'Horizontal or vertical rule with optional centered label.',
    dependencies: ['@radix-ui/react-separator', 'clsx'],
  },
  {
    name: 'progress',
    title: 'Progress',
    description: 'Linear progress bar built on Radix UI. Green fill with optional label and percentage display.',
    dependencies: ['@radix-ui/react-progress', 'clsx'],
  },
  {
    name: 'checkbox',
    title: 'Checkbox',
    description: 'Toggle checkbox built on Radix UI. Green checked state with optional label.',
    dependencies: ['@radix-ui/react-checkbox', 'clsx'],
  },
  {
    name: 'switch',
    title: 'Switch',
    description: 'Toggle switch built on Radix UI. Slides between off (amber) and on (green) states.',
    dependencies: ['@radix-ui/react-switch', 'clsx'],
  },
  {
    name: 'input',
    title: 'Input',
    description: 'Text input with optional label, prefix symbol, and inline error message.',
    dependencies: ['clsx'],
  },
  {
    name: 'textarea',
    title: 'Textarea',
    description: 'Multi-line text field with optional label and inline error message.',
    dependencies: ['clsx'],
  },
  {
    name: 'select',
    title: 'Select',
    description: 'Dropdown selector built on Radix UI. Supports groups, labels, and separators.',
    dependencies: ['@radix-ui/react-select', 'clsx'],
  },
  {
    name: 'dialog',
    title: 'Dialog',
    description: 'Modal dialog built on Radix UI. Backdrop blur overlay with green-accented header.',
    dependencies: ['@radix-ui/react-dialog', 'clsx'],
  },
  {
    name: 'tabs',
    title: 'Tabs',
    description: 'Tabbed panel built on Radix UI. Active tab highlighted with green underline.',
    dependencies: ['@radix-ui/react-tabs', 'clsx'],
  },
  {
    name: 'tooltip',
    title: 'Tooltip',
    description: 'Contextual label built on Radix UI. Fade + zoom animation. Requires TooltipProvider.',
    dependencies: ['@radix-ui/react-tooltip', 'clsx'],
  },
  {
    name: 'toast',
    title: 'Toast',
    description: 'Non-blocking notification built on Radix UI. Four semantic variants. Managed via useToast hook.',
    dependencies: ['@radix-ui/react-toast', 'clsx'],
    extraFiles: ['use-toast.ts'],
  },
]

// ─── Build each component ─────────────────────────────────────────────────────

const indexItems = []

for (const comp of components) {
  const mainFile = `${comp.name}.tsx`
  const mainPath = join(srcUi, comp.name, mainFile)
  const mainContent = readFileSync(mainPath, 'utf8')

  const files = [
    {
      path: `ui/${comp.name}/${mainFile}`,
      type: 'registry:ui',
      content: mainContent,
    },
  ]

  if (comp.extraFiles) {
    for (const extra of comp.extraFiles) {
      const extraPath = join(srcUi, comp.name, extra)
      const extraContent = readFileSync(extraPath, 'utf8')
      files.push({
        path: `ui/${comp.name}/${extra}`,
        type: 'registry:ui',
        content: extraContent,
      })
    }
  }

  const registryItem = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: comp.name,
    type: 'registry:ui',
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
    registryDependencies: [],
    files,
  }

  const outPath = join(outDir, `${comp.name}.json`)
  writeFileSync(outPath, JSON.stringify(registryItem, null, 2), 'utf8')
  console.log(`  ✓ ${comp.name}.json`)

  indexItems.push({
    name: comp.name,
    type: 'registry:ui',
    title: comp.title,
    description: comp.description,
    dependencies: comp.dependencies,
  })
}

// ─── Build index.json ─────────────────────────────────────────────────────────

const index = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'scificn',
  homepage: 'https://scificn.dev',
  items: indexItems,
}

writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log('  ✓ index.json')
console.log(`\nRegistry built → public/r/ (${components.length + 1} files)`)
