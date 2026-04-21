import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      // Service worker lives at /sw.js, scope is root
      scope: '/',
      base: '/',

      manifest: {
        name: "Mercy Mobile's Missionary Survival Guide - Copan, Honduras",
        short_name: 'MM Survival',
        description: 'Offline wilderness & cultural survival guide for missionaries in Honduras',
        theme_color: '#07040F',
        background_color: '#07040F',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        lang: 'en',
        categories: ['utilities', 'travel'],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          }
        ]
      },

      workbox: {
        // Navigation fallback: any route that isn't a file serves index.html
        navigateFallback: '/index.html',

        // Precache all app shell assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,webmanifest}'],

        // Increase limit — Leaflet + NASB data bundles are large
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB

        runtimeCaching: [
          // ----------------------------------------------------------------
          // OpenStreetMap tile caching — the key piece for offline maps
          // Strategy: CacheFirst with a large cache so previously-visited
          // areas work offline indefinitely.
          // ----------------------------------------------------------------
          {
            // OSM tiles are cross-origin <img> requests — the browser fetches
            // them in no-cors mode naturally. The SW must NOT override mode to
            // 'cors' (that breaks the img decode). Just let the request flow
            // through as-is, cache the opaque response (status 0), and Leaflet
            // renders it fine since <img> has always allowed cross-origin PNGs.
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.+\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: {
                maxEntries: 2000,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              // status 0 = opaque cross-origin response; still renderable by <img>
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // ----------------------------------------------------------------
          // Leaflet CSS / JS from CDN (if ever loaded remotely)
          // ----------------------------------------------------------------
          {
            urlPattern: /^https:\/\/unpkg\.com\/leaflet/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'leaflet-cdn',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 90,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ----------------------------------------------------------------
          // Google Fonts (loaded in index.html for Inter + Playfair)
          // ----------------------------------------------------------------
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ----------------------------------------------------------------
          // App images (species photos etc.)
          // ----------------------------------------------------------------
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
})
