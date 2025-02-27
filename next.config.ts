const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
      {
        protocol: "http",
        hostname: "***",
      },
    ],
  },
});

module.exports = nextConfig;
