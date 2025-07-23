// next.config.js
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  // needed so Next can transpile framer-motion’s "export *"
  transpilePackages: ['framer-motion'],

  webpack(config) {
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')
    return config
  },
}