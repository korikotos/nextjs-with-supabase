/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'placeholder.svg',
      'blob.v0.dev',
      'sqyloom.uk',
      'www.sqyloom.uk',
      'your-domain.com', // Add your actual domain here
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.sqyloom.uk',
      },
      {
        protocol: 'https',
        hostname: 'your-domain.com', // Replace with your actual domain
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/sqyloom/:path*',
        destination: 'https://sqyloom.uk/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
