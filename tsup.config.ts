import { defineConfig } from 'tsup'

export default defineConfig({
  entry:      ['src/ui/index.ts'],
  format:     ['esm', 'cjs'],
  dts:        true,
  splitting:  true,
  sourcemap:  true,
  clean:      true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-slot',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-select',
    '@radix-ui/react-switch',
    '@radix-ui/react-dialog',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-toast',
    '@radix-ui/react-progress',
    '@radix-ui/react-separator',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
})
