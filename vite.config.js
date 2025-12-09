import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      'timers/promises': 'timers'
    }
  },
  optimizeDeps: {
    exclude: ['@supabase/supabase-js']
  }
})
