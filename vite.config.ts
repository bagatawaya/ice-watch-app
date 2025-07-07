import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',   // ensures /locales & index.css end up in dist
  build: {
    outDir: 'dist',
  },
  base: '/', // ensures correct asset paths post-deploy
})
