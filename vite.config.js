import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        pricing: './pricing.html',
        about: './about.html',
        catalog: './catalog.html',
        elegant: './elegant.html',
        coverage: './coverage.html',
        estilos: './estilos/index.html',
      }
    }
  }
})
