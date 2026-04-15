import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  srcDir: 'app/',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  alias: {
    '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
    '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
  },
  css: ['assets/css/main.css'],
})
