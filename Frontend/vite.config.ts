import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    cors: true, // Keep CORS enabled if you have API requests
  },
  base: '/', // Make sure base is set correctly
})