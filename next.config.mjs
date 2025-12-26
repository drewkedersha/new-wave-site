/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },

  async redirects() {
    return [
      {
        source: "/articles/Daniel-ceasar-son-of-spergy",
        destination: "/articles/daniel-ceasar-son-of-spergy",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
