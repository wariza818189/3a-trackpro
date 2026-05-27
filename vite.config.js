import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.js', 'resources/js/src/index.css'],
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
  root: '.',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  },
  build: {
    manifest: true,
    outDir: 'public/build',
  }
})