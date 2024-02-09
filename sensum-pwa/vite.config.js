import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    VitePWA({
      includeAssets: ['/assets/img/favicon.svg', '/assets/img/favicon.ico', '/assets/robots.txt', '/assets/img/apple-touch-icon.png'],  
      strategies: 'injectManifest', // Vs generateSW (more out of the box, less customizable!)
      registerType: 'autoUpdate', // Vs Prompt for new content
      srcDir: 'src',
      filename: 'ServiceWorker.js',
      manifest: {
        name: 'd-sensum',
        short_name: 'd-sensum',
        display_override: ["fullscreen", "minimal-ui"],
        display: "standalone", // https://developer.mozilla.org/en-US/docs/Web/Manifest/display_override#values
        start_url: '/dsensum/',
        description: 'mysterious app',
        theme_color: '#4B3968',
        background_color: '#4B3968',
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
          },
          {
            src: '/assets/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }),
  ]
})
