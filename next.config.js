// next.config.js
const path = require('path')

/** @type {import('next').NextConfig} **/
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['undici'],

  webpack(config) {
    // Teach webpack that "~/" is your "src" folder
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')
    return config
  },
}