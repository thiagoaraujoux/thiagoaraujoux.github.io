import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/thiagoaraujoux.github.io/', // Base path correto
  build: {
    outDir: 'dist',
    sourcemap: false, // Desative sourcemap para build mais rápido
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber'],
          gsap: ['gsap']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})