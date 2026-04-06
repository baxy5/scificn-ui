/**
 * build-registry.test.mjs
 *
 * 10 tests covering source completeness, schema validity, and generated output
 * correctness.  The build script is executed once before the suite runs.
 *
 * Run: node --test scripts/build-registry.test.mjs
 */

import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = join(__dirname, '..')
const srcReg    = join(root, 'src', 'registry')
const outDir    = join(root, 'public', 'r')

const KNOWN_SOURCE_TYPES = new Set(['component', 'barrel', 'hook', 'utility'])
const REQUIRED_SOURCE_FIELDS = ['name', 'description', 'files', 'dependencies', 'registryDependencies']

// Run the build once so output files exist before any test reads them
before(() => {
  execSync('node scripts/build-registry.mjs', { cwd: root, stdio: 'pipe' })
})

// ─── Helper: load all source manifests ───────────────────────────────────────

function loadSourceEntries() {
  return readdirSync(srcReg)
    .filter(f => f.endsWith('.json'))
    .map(f => ({ filename: f, data: JSON.parse(readFileSync(join(srcReg, f), 'utf8')) }))
}

// ─── 1. Source completeness ───────────────────────────────────────────────────

test('source registry contains 33 JSON manifests', () => {
  const files = readdirSync(srcReg).filter(f => f.endsWith('.json'))
  assert.equal(files.length, 33, `Expected 33 source manifests, found ${files.length}`)
})

// ─── 2. Source schema validity ────────────────────────────────────────────────

test('every source manifest has all required fields', () => {
  const entries = loadSourceEntries()
  for (const { filename, data } of entries) {
    for (const field of REQUIRED_SOURCE_FIELDS) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(data, field),
        `${filename} is missing required field "${field}"`
      )
    }
  }
})

// ─── 3. Name matches filename ─────────────────────────────────────────────────

test('each source manifest name matches its filename', () => {
  const entries = loadSourceEntries()
  for (const { filename, data } of entries) {
    const expected = basename(filename, '.json')
    assert.equal(
      data.name,
      expected,
      `${filename}: expected name "${expected}", got "${data.name}"`
    )
  }
})

// ─── 4. Known file types ──────────────────────────────────────────────────────

test('all source file entries use a known type', () => {
  const entries = loadSourceEntries()
  for (const { filename, data } of entries) {
    for (const f of data.files) {
      assert.ok(
        KNOWN_SOURCE_TYPES.has(f.type),
        `${filename}: unknown file type "${f.type}" in path "${f.path}"`
      )
    }
  }
})

// ─── 5. Output completeness ───────────────────────────────────────────────────

test('generated public/r/ contains one JSON file per source manifest', () => {
  const entries = loadSourceEntries()
  for (const { data } of entries) {
    const outPath = join(outDir, `${data.name}.json`)
    assert.ok(existsSync(outPath), `Missing generated file: public/r/${data.name}.json`)
  }
})

// ─── 6. index.json lists every source name ────────────────────────────────────

test('index.json items include every source manifest name', () => {
  const entries  = loadSourceEntries()
  const index    = JSON.parse(readFileSync(join(outDir, 'index.json'), 'utf8'))
  const indexed  = new Set(index.items.map(i => i.name))

  for (const { data } of entries) {
    assert.ok(indexed.has(data.name), `index.json is missing entry for "${data.name}"`)
  }
  assert.equal(index.items.length, entries.length,
    `index.json has ${index.items.length} items but expected ${entries.length}`)
})

// ─── 7. No barrel files in generated output ───────────────────────────────────

test('no generated component JSON contains barrel (index.ts) file entries', () => {
  const entries = loadSourceEntries()
  for (const { data } of entries) {
    const out = JSON.parse(readFileSync(join(outDir, `${data.name}.json`), 'utf8'))
    for (const f of out.files) {
      assert.ok(
        !f.path.endsWith('index.ts'),
        `${data.name}.json contains barrel file "${f.path}"`
      )
    }
  }
})

// ─── 8. component → registry:ui mapping ──────────────────────────────────────

test('source files typed "component" are emitted as registry:ui', () => {
  const entries = loadSourceEntries()
  for (const { data } of entries) {
    const componentPaths = data.files
      .filter(f => f.type === 'component')
      .map(f => f.path.replace(/^src\//, ''))

    if (componentPaths.length === 0) continue

    const out = JSON.parse(readFileSync(join(outDir, `${data.name}.json`), 'utf8'))
    for (const p of componentPaths) {
      const emitted = out.files.find(f => f.path === p)
      assert.ok(emitted, `${data.name}.json: expected file "${p}" in output`)
      assert.equal(
        emitted.type, 'registry:ui',
        `${data.name}.json: "${p}" should be registry:ui, got "${emitted.type}"`
      )
    }
  }
})

// ─── 9. hook → registry:hook and utility → registry:lib mapping ──────────────

test('hook files map to registry:hook and utility files map to registry:lib', () => {
  const entries = loadSourceEntries()

  for (const { data } of entries) {
    const hooks     = data.files.filter(f => f.type === 'hook')
    const utilities = data.files.filter(f => f.type === 'utility')
    if (hooks.length === 0 && utilities.length === 0) continue

    const out = JSON.parse(readFileSync(join(outDir, `${data.name}.json`), 'utf8'))

    for (const f of hooks) {
      const p       = f.path.replace(/^src\//, '')
      const emitted = out.files.find(o => o.path === p)
      assert.ok(emitted, `${data.name}.json: hook file "${p}" missing from output`)
      assert.equal(emitted.type, 'registry:hook',
        `${data.name}.json: "${p}" should be registry:hook, got "${emitted.type}"`)
    }

    for (const f of utilities) {
      const p       = f.path.replace(/^src\//, '')
      const emitted = out.files.find(o => o.path === p)
      assert.ok(emitted, `${data.name}.json: utility file "${p}" missing from output`)
      assert.equal(emitted.type, 'registry:lib',
        `${data.name}.json: "${p}" should be registry:lib, got "${emitted.type}"`)
    }
  }
})

// ─── 10. registryDependencies are preserved and utils is registry:lib ─────────

test('registryDependencies from source are preserved and utils item is typed registry:lib', () => {
  const entries = loadSourceEntries()

  // Every source registryDependencies entry must appear in the generated output
  for (const { data } of entries) {
    const out = JSON.parse(readFileSync(join(outDir, `${data.name}.json`), 'utf8'))
    assert.deepEqual(
      out.registryDependencies,
      data.registryDependencies,
      `${data.name}.json: registryDependencies mismatch`
    )
  }

  // utils specifically must be emitted as registry:lib at the item level
  const utils = JSON.parse(readFileSync(join(outDir, 'utils.json'), 'utf8'))
  assert.equal(utils.type, 'registry:lib',
    `utils.json top-level type should be registry:lib, got "${utils.type}"`)
})
