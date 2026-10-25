/** Resolve a file in /public against the configured base path (works on GitHub Pages sub-paths). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
