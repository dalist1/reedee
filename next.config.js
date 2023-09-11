/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
  });
  
  const nextConfig = {
    swcMinify: true,
    experimental: { serverActions: true },
  };
  
  module.exports = withPWA(nextConfig);