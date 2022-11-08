// /** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  images: {
    domains: ['localhost', '*'],
  },

  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
};

export default bundleAnalyzer(nextConfig);
