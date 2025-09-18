/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://codesisters.net",
  generateRobotsTxt: true,

  // Принудительно добавляем страницы
  additionalPaths: async (config) => {
    console.log("🔍 Config received:", config);
    console.log("🔍 Site URL:", config.siteUrl);

    // Принудительно добавляем основные страницы
    const staticPaths = ["/", "/about", "/services", "/contact", "/blog"];

    console.log("🔍 Adding static paths:", staticPaths);

    const result = [];
    for (const path of staticPaths) {
      try {
        const transformed = await config.transform(config, path);
        result.push(transformed);
        console.log("✅ Added path:", path);
      } catch (error) {
        console.log("❌ Error adding path:", path, error.message);
      }
    }

    return result;
  },

  transform: async (config, path) => {
    console.log("🔧 Transforming path:", path);

    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
