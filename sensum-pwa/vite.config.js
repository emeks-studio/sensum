import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRefresh(),
    VitePWA({
      includeAssets: ['/assets/img/favicon.svg', '/assets/img/favicon.ico', '/assets/robots.txt', '/assets/img/apple-touch-icon.png'],  
      manifest: {
        name: 'sensum',
        short_name: 'sensum',
        start_url: '/',
        description: 'mysterious app',
        theme_color: '#4B3968',
        icons: [
          {
            src: '/assets/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
})
