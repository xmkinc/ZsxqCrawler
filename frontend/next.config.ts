import type { NextConfig } from "next";

// Railway 部署时，通过环境变量 NEXT_PUBLIC_API_BASE_URL 指定后端地址
// 例如：https://zsxqcrawler-backend.railway.app
const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8208";

const nextConfig: NextConfig = {
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
