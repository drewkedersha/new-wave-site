/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },

  async redirects() {
    return [ ];
  },
};

export default nextConfig;
