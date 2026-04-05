/**
 * build-registry.test.mjs
 *
 * TDD tests for the registry build pipeline.
 *
 * Run: node --test scripts/build-registry.test.mjs
 */

import { describe, test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcUiDir = join(root, 'src', 'ui')
const srcRegistryDir = join(root, 'src', 'registry')
const outDir = join(root, 'public', 'r')

// ── Helpers ──────────────────────────────────────────────────────────────────

function getUiComponents() {
  return readdirSync(srcUiDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
}

function getSrcRegistryNames() {
  return readdirSync(srcRegistryDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}

// ── Run build once before all tests ──────────────────────────────────────────

before(() => {
  execSync('node scripts/build-registry.mjs', { cwd: root, stdio: 'pipe' })
})

// ── Source registry completeness ─────────────────────────────────────────────

describe('source registry completeness', () => {
  test('every directory in src/ui/ has a matching src/registry/*.json', () => {
    const missing = getUiComponents().filter(
      name => !existsSync(join(srcRegistryDir, `${name}.json`))
    )
    assert.deepEqual(
      missing,
      [],
      `Components missing a registry metadata file: ${missing.join(', ')}`
    )
  })

  test('all src/registry/*.json files have required fields', () => {
    for (const name of getSrcRegistryNames()) {
      const data = JSON.parse(
        readFileSync(join(srcRegistryDir, `${name}.json`), 'utf8')
      )
      assert.ok(data.name, `${name}.json: must have "name"`)
      assert.ok(data.description, `${name}.json: must have "description"`)
      assert.ok(Array.isArray(data.files), `${name}.json: "files" must be an array`)
      assert.ok(
        Array.isArray(data.dependencies),
        `${name}.json: "dependencies" must be an array`
      )
      assert.ok(
        Array.isArray(data.registryDependencies),
        `${name}.json: "registryDependencies" must be an array`
      )
    }
  })

  test('all file paths referenced in src/registry/*.json actually exist', () => {
    for (const name of getSrcRegistryNames()) {
      const data = JSON.parse(
        readFileSync(join(srcRegistryDir, `${name}.json`), 'utf8')
      )
      for (const fileEntry of data.files) {
        const fullPath = join(root, fileEntry.path)
        assert.ok(
          existsSync(fullPath),
          `${name}.json references missing file: ${fileEntry.path}`
        )
      }
    }
  })
})

// ── Generated registry completeness ──────────────────────────────────────────

describe('generated registry completeness', () => {
  test('public/r/ contains a JSON file for every src/registry component', () => {
    const missing = getSrcRegistryNames().filter(
      name => !existsSync(join(outDir, `${name}.json`))
    )
    assert.deepEqual(
      missing,
      [],
      `Missing generated registry files: ${missing.join(', ')}`
    )
  })

  test('index.json lists every component from src/registry/', () => {
    const index = JSON.parse(readFileSync(join(outDir, 'index.json'), 'utf8'))
    const indexNames = new Set(index.items.map(i => i.name))
    const missing = getSrcRegistryNames().filter(n => !indexNames.has(n))
    assert.deepEqual(
      missing,
      [],
      `index.json is missing these components: ${missing.join(', ')}`
    )
  })
})

// ── Generated file schema ─────────────────────────────────────────────────────

describe('generated registry-item schema', () => {
  test('each generated file has the correct $schema, type, and required fields', () => {
    for (const name of getSrcRegistryNames()) {
      const item = JSON.parse(readFileSync(join(outDir, `${name}.json`), 'utf8'))
      assert.equal(
        item.$schema,
        'https://ui.shadcn.com/schema/registry-item.json',
        `${name}.json: wrong $schema`
      )
      assert.ok(
        ['registry:ui', 'registry:lib', 'registry:hook'].includes(item.type),
        `${name}.json: unrecognised type "${item.type}"`
      )
      assert.ok(item.name,        `${name}.json: must have "name"`)
      assert.ok(item.title,       `${name}.json: must have "title"`)
      assert.ok(item.description, `${name}.json: must have "description"`)
      assert.ok(
        Array.isArray(item.files) && item.files.length > 0,
        `${name}.json: "files" must be a non-empty array`
      )
      assert.ok(
        Array.isArray(item.dependencies),
        `${name}.json: "dependencies" must be an array`
      )
      assert.ok(
        Array.isArray(item.registryDependencies),
        `${name}.json: "registryDependencies" must be an array`
      )
    }
  })

  test('each file entry inside a generated item has path, type, and non-empty content', () => {
    for (const name of getSrcRegistryNames()) {
      const item = JSON.parse(readFileSync(join(outDir, `${name}.json`), 'utf8'))
      for (const f of item.files) {
        assert.ok(f.path,    `${name}.json: file entry must have "path"`)
        assert.ok(f.type,    `${name}.json: file entry must have "type"`)
        assert.ok(f.content, `${name}.json: file entry "${f.path}" must have non-empty "content"`)
      }
    }
  })

  test('barrel (index.ts) files are NOT included in generated output', () => {
    for (const name of getSrcRegistryNames()) {
      const item = JSON.parse(readFileSync(join(outDir, `${name}.json`), 'utf8'))
      const barrelFiles = item.files.filter(f => f.path.endsWith('index.ts'))
      assert.deepEqual(
        barrelFiles,
        [],
        `${name}.json: barrel index.ts files should be excluded from the registry`
      )
    }
  })
})

// ── index.json schema ─────────────────────────────────────────────────────────

describe('index.json schema', () => {
  test('has correct $schema, name, and homepage', () => {
    const index = JSON.parse(readFileSync(join(outDir, 'index.json'), 'utf8'))
    assert.equal(index.$schema, 'https://ui.shadcn.com/schema/registry.json')
    assert.equal(index.name,    'scificn')
    assert.equal(index.homepage,'https://scificn.dev')
    assert.ok(Array.isArray(index.items), 'items must be an array')
  })

  test('each item in index.json has name, type, title, description, and dependencies', () => {
    const index = JSON.parse(readFileSync(join(outDir, 'index.json'), 'utf8'))
    for (const item of index.items) {
      assert.ok(item.name,        `index item must have "name"`)
      assert.ok(item.type,        `index item "${item.name}" must have "type"`)
      assert.ok(item.title,       `index item "${item.name}" must have "title"`)
      assert.ok(item.description, `index item "${item.name}" must have "description"`)
      assert.ok(
        Array.isArray(item.dependencies),
        `index item "${item.name}": "dependencies" must be an array`
      )
    }
  })
})
