import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH controls where the site is served from.
//  - Netlify / custom domain / user site (username.github.io): "/"
//  - GitHub Pages project site (username.github.io/repo-name): "/repo-name/"
// The GitHub Actions workflow sets BASE_PATH automatically.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.BASE_PATH || '/'
  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2022',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) return 'motion'
            if (id.includes('node_modules/react')) return 'react'
          },
        },
      },
    },
  }
})
