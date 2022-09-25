/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', '*'],
  },

  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
      { test: /\.(woff2|woff|eot|ttf|otf)$/, use: ['file-loader'] }
    );
    return config;
  },
  swcMinify: true,
};

module.exports = nextConfig;
