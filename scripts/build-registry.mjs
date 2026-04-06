/**
 * build-registry.mjs
 *
 * Reads every src/registry/*.json manifest and generates shadcn-compatible
 * registry JSON files in public/r/.  Component discovery is dynamic — no
 * hardcoded list.
 *
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = join(__dirname, '..')
const srcReg    = join(root, 'src', 'registry')
const outDir    = join(root, 'public', 'r')

mkdirSync(outDir, { recursive: true })

// ─── File-type mapping (source → shadcn registry) ────────────────────────────
// 'barrel' (index.ts) entries are intentionally omitted — shadcn CLI resolves
// imports itself and barrel re-exports would duplicate source files.

const FILE_TYPE_MAP = {
  component: 'registry:ui',
  hook:      'registry:hook',
  utility:   'registry:lib',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** kebab-case → Title Case  (e.g. "stat-card" → "Stat Card") */
function toTitle(name) {
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ─── Discover & build ─────────────────────────────────────────────────────────

const sourceFiles = readdirSync(srcReg).filter(f => f.endsWith('.json')).sort()
const indexItems  = []

for (const filename of sourceFiles) {
  const src = JSON.parse(readFileSync(join(srcReg, filename), 'utf8'))

  // Build the files array, skipping barrel exports
  const files = []
  for (const f of src.files) {
    const registryType = FILE_TYPE_MAP[f.type]
    if (!registryType) continue          // skip 'barrel' and any unknown types

    const outPath  = f.path.replace(/^src\//, '')   // strip leading src/
    const content  = readFileSync(join(root, f.path), 'utf8')
    files.push({ path: outPath, type: registryType, content })
  }

  // Top-level item type follows from whether any file is a utility
  const itemType = src.files.some(f => f.type === 'utility') ? 'registry:lib' : 'registry:ui'

  const registryItem = {
    $schema:              'https://ui.shadcn.com/schema/registry-item.json',
    name:                 src.name,
    type:                 itemType,
    title:                toTitle(src.name),
    description:          src.description,
    dependencies:         src.dependencies         ?? [],
    registryDependencies: src.registryDependencies ?? [],
    files,
  }

  writeFileSync(join(outDir, `${src.name}.json`), JSON.stringify(registryItem, null, 2), 'utf8')
  console.log(`  ✓ ${src.name}.json`)

  indexItems.push({
    name:         src.name,
    type:         itemType,
    title:        toTitle(src.name),
    description:  src.description,
    dependencies: src.dependencies ?? [],
  })
}

// ─── index.json ───────────────────────────────────────────────────────────────

const index = {
  $schema:  'https://ui.shadcn.com/schema/registry.json',
  name:     'scificn',
  homepage: 'https://scificn.dev',
  items:    indexItems,
}

writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log('  ✓ index.json')
console.log(`\nRegistry built → public/r/ (${sourceFiles.length + 1} files)`)
