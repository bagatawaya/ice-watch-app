import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Manual version string for cache busting.
// Increment this (e.g., to 'v2', 'v3', etc.) when you need to force a full cache refresh for assets.
const ASSET_VERSION = 'v1'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  // REMOVE THE 'base' PROPERTY ALTOGETHER!
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Include the ASSET_VERSION in the filename to force new URLs
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return `assets/[name]-[hash].${ASSET_VERSION}.css`; // e.g., index-GxG1u5.v1.css
          }
          return `assets/[name]-[hash].${ASSET_VERSION}[extname]`; // For other assets like images, fonts
        },
        // Include ASSET_VERSION in JS chunk/entry filenames too
        chunkFileNames: `assets/[name]-[hash].${ASSET_VERSION}.js`,
        entryFileNames: `assets/[name]-[hash].${ASSET_VERSION}.js`,
      },
    },
  }
})
