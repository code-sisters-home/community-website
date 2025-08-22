const withMDX = require("@next/mdx")({
  extension: /\.mdx$/, // Указываем, что мы будем работать с MDX файлами
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"], // Указываем расширения для страниц, включая .mdx
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};
module.exports = nextConfig;
