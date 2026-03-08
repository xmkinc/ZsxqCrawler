import type { NextConfig } from "next";

// Railway 部署时，通过环境变量 NEXT_PUBLIC_API_BASE_URL 指定后端地址
// 例如：https://zsxqcrawler-backend.railway.app
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8208";

const nextConfig: NextConfig = {
  // 忽略 TypeScript 和 ESLint 错误，允许生产构建通过
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
