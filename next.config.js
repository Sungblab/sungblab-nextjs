/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [[import("remark-math").then((m) => m.default)]],
    rehypePlugins: [[import("rehype-katex").then((m) => m.default)]],
  },
});

const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    domains: ["images.unsplash.com", "your-image-hosting-domain.com", "opengraph.githubassets.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  generateBuildId: async () => {
    return "my-build-id-" + Date.now();
  },
  onDemandEntries: {
    maxInactiveAge: 10 * 1000,
    pagesBufferLength: 1,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sungblab.vercel.app' }],
        destination: 'https://sungblab.com/:path*',
        permanent: true,
      },
    ];
  },
  headers: async () => {
    return [
      {
        // 정적 자산 (이미지, 폰트, JS/CSS 번들)은 1년 캐시
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // public 폴더 이미지 등 정적 파일
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
