const fs = require('fs')
const path = require('path')

// Customize routes to prerender / include in sitemap
const routes = ['/',]

const siteUrl = process.env.SITE_URL || 'https://teste-a944e.firebaseapp.com'

const distDir = path.join(__dirname, '..', 'dist')
const outPath = path.join(distDir, 'sitemap.xml')

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run build before generating sitemap.')
  process.exit(1)
}

const urls = routes.map((r) => {
  const loc = (r === '/') ? siteUrl + '/' : siteUrl + r.replace(/^\/?/, '/')
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>`
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`

fs.writeFileSync(outPath, xml, 'utf8')
console.log('sitemap.xml generated at', outPath)
