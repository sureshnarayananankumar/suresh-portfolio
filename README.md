# Suresh Kumar N — Portfolio

Personal portfolio for **Suresh Kumar N, Full Stack Developer** (Java · Spring Boot · Angular · React · Node.js · Generative AI).

Built with **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**, animated with **Motion**, icons from **Lucide**. Fonts are self-hosted (Inter + Space Grotesk via Fontsource), so the site makes no third-party requests.

## Features

- Dark theme by default with a light-theme toggle (choice remembered per visitor)
- Responsive navigation with an animated active-section indicator and an accessible mobile menu
- Hero with an original CSS/SVG workspace illustration
- Count-up impact metrics, About, Featured Work with case-study dialogs, Skills, Experience timeline, Achievements, Education, Contact
- Contact form with validation, and success/error states — works with **no backend** (mailto fallback) or a form service
- Respects `prefers-reduced-motion`, keyboard accessible, skip link, semantic landmarks
- SEO: title/description, Open Graph + Twitter cards, JSON-LD `Person`, favicon, `robots.txt`
- `404.html` fallback for static hosts

## Project structure

```
suresh-portfolio/
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── public/
│   ├── resume.pdf                 # ← your resume (Download Resume buttons link here)
│   ├── og-image.png               # social share image (1200×630)
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   └── .nojekyll
├── scripts/postbuild.mjs          # creates dist/404.html
├── src/
│   ├── data/profile.ts            # ★ ALL content: profile, links, projects, skills, experience
│   ├── types.ts
│   ├── components/                # Navbar, Hero, HeroVisual, Impact, About, Projects,
│   │                              # ProjectModal, ProjectIllustration, Skills, Experience,
│   │                              # Achievements, Contact, Footer, Reveal, SectionHeading, ...
│   ├── hooks/                     # useTheme, useActiveSection
│   ├── lib/asset.ts               # base-path-aware URLs for /public files
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                  # design tokens (dark + light) and utilities
├── index.html                     # SEO / Open Graph / JSON-LD
├── netlify.toml
├── vite.config.ts
├── .env.example
└── package.json
```

## Run locally

Requires **Node.js 20.19+** (22 LTS recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Customising content

Edit **`src/data/profile.ts`** — every section reads from it.

| What | Where |
| --- | --- |
| Hide the "Open to Opportunities" badge | `profile.availability = null` |
| Add GitHub | `profile.github = 'https://github.com/<you>'` (icon appears in footer) |
| Add a project demo / repo button | set `liveUrl` / `repoUrl` on a project (buttons stay hidden while empty) |
| Replace the resume | overwrite `public/resume.pdf` (keep the same file name) |
| Colours | CSS variables at the top of `src/index.css` |

## Contact form

The form works out of the box: on submit it opens the visitor's email app with the message pre-filled to `sureshnarayanan122@gmail.com`.

To deliver messages directly to your inbox instead (no backend needed):

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. **Local:** copy `.env.example` to `.env.local` and set `VITE_FORM_ENDPOINT=...`.
3. **GitHub Pages:** repo → *Settings → Secrets and variables → Actions → Variables* → add `VITE_FORM_ENDPOINT`.
4. **Netlify:** *Site configuration → Environment variables* → add `VITE_FORM_ENDPOINT`.

The endpoint is a public form ID, not a secret. Any service that accepts a JSON `POST` and returns 2xx works.

## Deploy — GitHub Pages (recommended)

1. Create a new **public** repository on GitHub, e.g. `portfolio` (or `<username>.github.io` to serve from the root).
2. Push this project:
   ```bash
   cd suresh-portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: “GitHub Actions”**.
4. The workflow in `.github/workflows/deploy.yml` runs on every push to `main`. Watch it in the **Actions** tab.
5. Your site will be live at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` for a `<username>.github.io` repo).

The workflow sets the correct base path automatically. If you add a **custom domain**, change `BASE_PATH` in the workflow to `'/'`.

## Deploy — Netlify (alternative)

1. Push the repository to GitHub (steps above).
2. In Netlify: **Add new site → Import an existing project** → pick the repo.
3. Build settings are read from `netlify.toml` (`npm run build`, publish `dist`). Click **Deploy**.

## After deploying

- Open Graph image URLs are relative. For the best LinkedIn/X previews, replace `%BASE_URL%og-image.png` in `index.html` with your absolute site URL (e.g. `https://<username>.github.io/portfolio/og-image.png`) and add `<meta property="og:url" content="...">`.
- Test the share preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Notes on content

All projects shown (JSRS, RABT, NSS) were developed as part of employment at Business Gateways International. The portfolio does not claim ownership of those platforms; visuals are original illustrations, and no confidential source code, screenshots or client data are included.
