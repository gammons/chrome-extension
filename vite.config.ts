import { crx } from '@crxjs/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import manifest from './src/manifest.config'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  // HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
  // https://github.com/crxjs/chrome-extension-tools/issues/746
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, 'node_modules/bootstrap-icons'),
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/routes/(app)'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@css': path.resolve(__dirname, 'src/css')
    }
  }
})
