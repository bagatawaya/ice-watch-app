import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // This will ensure CSS files get a unique name every time, like 'assets/index-[hash]-v1.0.css'
        // or if you want a fixed version: 'assets/index-[hash]-v20250707.css'
        // Let's use a dynamic approach with [hash] and a unique ID to be very sure.
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            // Ensure CSS files get a different name, e.g., 'index-[hash].css'
            // You can add a timestamp here if you want to force it more, but [hash] should be unique
            return `assets/[name]-[hash].css`;
          }
          // For other assets (images, fonts), use default or specific naming if needed
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: `assets/[name]-[hash].js`, // For code-split JS chunks
        entryFileNames: `assets/[name]-[hash].js`, // For main JS entry point
      },
    },
  }
})
