import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Manual version string for cache busting.
// Increment this (e.g., to 'v2', 'v3', etc.) when you need to force a full cache refresh for assets.
const ASSET_VERSION = 'v2'; // <--- CHANGE THIS FROM 'v1' to 'v2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return `assets/[name]-[hash].${ASSET_VERSION}.css`;
          }
          return `assets/[name]-[hash].${ASSET_VERSION}[extname]`;
        },
        chunkFileNames: `assets/[name]-[hash].${ASSET_VERSION}.js`,
        entryFileNames: `assets/[name]-[hash].${ASSET_VERSION}.js`,
      },
    },
  }
})
