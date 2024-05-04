/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  webpack: (config) => {
    // Exclude sharp and canvas from being processed by webpack
    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas'
    });
    return config;
  }
};

module.exports = nextConfig;
