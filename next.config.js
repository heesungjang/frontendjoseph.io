/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '*'],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
  swcMinify: true,
};

module.exports = nextConfig;
