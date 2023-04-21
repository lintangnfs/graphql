
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    // swSrc: 'service-worker.js',
    // buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["s4.anilist.co"],
  },
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}],
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.after.env.js']
})

module.exports = nextConfig
