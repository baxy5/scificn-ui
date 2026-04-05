/**
 * build-registry.mjs
 *
 * Dynamically reads every src/registry/{name}.json metadata file and the
 * referenced component sources, then writes shadcn-compatible registry JSON
 * files to public/r/.
 *
 * Adding a new component only requires creating src/registry/{name}.json —
 * no changes to this script are needed.
 *
 * Run: node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcRegistryDir = join(root, 'src', 'registry')
const outDir = join(root, 'public', 'r')

mkdirSync(outDir, { recursive: true })

// ── Helpers ───────────────────────────────────────────────────────────────────

/** "bar-chart" → "Bar Chart" */
function toTitle(name) {
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

/**
 * Map the source file type to the shadcn registry:* type.
 * Barrel exports (index.ts) are not included in the output.
 */
function toRegistryType(srcType) {
  switch (srcType) {
    case 'hook':    return 'registry:hook'
    case 'utility': return 'registry:lib'
    default:        return 'registry:ui'
  }
}

/**
 * Derive the top-level registry item type from the component's files.
 * If every included file is a utility, the item is registry:lib.
 * Otherwise it is registry:ui.
 */
function itemType(files) {
  const included = files.filter(f => f.type !== 'barrel')
  if (included.length > 0 && included.every(f => f.type === 'utility')) {
    return 'registry:lib'
  }
  return 'registry:ui'
}

// ── Collect metadata files ────────────────────────────────────────────────────

const metaNames = readdirSync(srcRegistryDir)
  .filter(f => f.endsWith('.json'))
  .map(f => f.replace('.json', ''))

// ── Build each component ──────────────────────────────────────────────────────

const indexItems = []

for (const name of metaNames) {
  const meta = JSON.parse(
    readFileSync(join(srcRegistryDir, `${name}.json`), 'utf8')
  )

  const title = toTitle(meta.name)

  // Build the files array, skipping barrel exports
  const files = []
  for (const fileEntry of meta.files) {
    if (fileEntry.type === 'barrel') continue

    const srcPath = join(root, fileEntry.path)
    const content = readFileSync(srcPath, 'utf8')
    // Strip the leading "src/" so paths are relative to the project root
    const registryPath = fileEntry.path.replace(/^src\//, '')

    files.push({
      path: registryPath,
      type: toRegistryType(fileEntry.type),
      content,
    })
  }

  const type = itemType(meta.files)

  const registryItem = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: meta.name,
    type,
    title,
    description: meta.description,
    dependencies: meta.dependencies ?? [],
    registryDependencies: meta.registryDependencies ?? [],
    files,
  }

  const outPath = join(outDir, `${meta.name}.json`)
  writeFileSync(outPath, JSON.stringify(registryItem, null, 2), 'utf8')
  console.log(`  ✓ ${meta.name}.json`)

  indexItems.push({
    name: meta.name,
    type,
    title,
    description: meta.description,
    dependencies: meta.dependencies ?? [],
    registryDependencies: meta.registryDependencies ?? [],
  })
}

// ── Build index.json ──────────────────────────────────────────────────────────

const index = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'scificn',
  homepage: 'https://scificn.dev',
  items: indexItems,
}

writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log('  ✓ index.json')
console.log(`\nRegistry built → public/r/ (${metaNames.length + 1} files)`)
