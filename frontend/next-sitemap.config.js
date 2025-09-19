/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://codesisters.net',
  outDir: './public',
  sourceDir: '.next',
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api/*', '/_next/*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  }
  // Если есть динамические роуты и их нужно включать:
  // additionalPaths: async (config) => {
  //   const extra = []
  //   // const posts = await fetch('https://codesisters.net/api/posts').then(r => r.json())
  //   // for (const p of posts) {
  //   //   extra.push({ loc: `/blog/${p.slug}`, changefreq: 'weekly', priority: 0.7 })
  //   // }
  //   return extra
  // },
}