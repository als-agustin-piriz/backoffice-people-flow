/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  transpilePackages: [
    '@react-aria/visually-hidden',
    '@react-aria/utils',
    '@headlessui/react',
  ],
};

module.exports = nextConfig;
