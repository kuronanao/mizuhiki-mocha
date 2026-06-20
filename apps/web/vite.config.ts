import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/mizuhiki-mocha/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        layouts: 'layouts.html',
        logoAnimation: 'logo-animation.html',
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
