import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Generate a unique timestamp for cache busting the base URL
const VITE_APP_VERSION = new Date().toISOString().replace(/[:.-]/g, '');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  // CRITICAL: Add a unique base path to force browser/CDN to re-fetch all assets
  // Example: your-domain.com/v20250707T170000Z/
  base: `/v${VITE_APP_VERSION}/`,
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Keep default hashed naming for assets; the 'base' path will handle the cache busting
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  }
})
