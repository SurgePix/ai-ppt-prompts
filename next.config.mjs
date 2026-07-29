/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["antd", "@ant-design/icons"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "surgepix.ai",
      },
      {
        protocol: "https",
        hostname: "*.cos.ap-seoul.myqcloud.com",
      },
      {
        protocol: "https",
        hostname: "ui-cos.tate-a-tate.com",
      },
      {
        protocol: "https",
        hostname: "d8j0ntlcm91z4.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.higgs.ai",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
