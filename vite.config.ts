import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Explicitly tell Vite where the public directory is
  build: {
    outDir: 'dist', // The standard output directory
  }
})
