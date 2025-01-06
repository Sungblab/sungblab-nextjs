/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // 외부 이미지 도메인 예시
      "your-image-hosting-domain.com",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  generateBuildId: async () => {
    return "my-build-id";
  },
};

module.exports = nextConfig;
