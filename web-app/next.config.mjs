/** @type {import('next').NextConfig} */

const nextConfig = {
  crossOrigin: 'anonymous',
  output:"standalone",
  logging: {
    fetches: {
        fullUrl: false
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
