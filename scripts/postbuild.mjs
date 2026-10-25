// Copies index.html to 404.html so unknown paths on static hosts (GitHub Pages / Netlify)
// fall back to the portfolio instead of a blank error page.
import { copyFileSync, existsSync } from 'node:fs'
const src = 'dist/index.html'
if (existsSync(src)) {
  copyFileSync(src, 'dist/404.html')
  console.log('✓ dist/404.html created')
}
