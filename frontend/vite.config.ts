import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/core/utils/setup.tsx'],
    globals: true,
    include: ['./src/**/*.test.(ts|tsx)'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/']
    },
    exclude: ['node_modules/', 'dist/', 'coverage/'],
  }
})
