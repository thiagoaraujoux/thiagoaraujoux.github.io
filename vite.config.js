import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // IMPORTANTE: Caminho relativo
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})