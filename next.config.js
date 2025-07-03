// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    // Transpile undici so Next.js can handle its private-field syntax
    config.module.rules.push({
      test: /node_modules[/\\]undici/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    })

    return config
  },
}

module.exports = nextConfig