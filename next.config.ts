/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true, // Enable Turbopack
  },
  eslint : {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import these server-only modules on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        os: false,
        https: false,
        http: false,
        stream: false,
        crypto: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;