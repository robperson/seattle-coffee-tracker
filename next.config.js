/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yelpcdn.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
