
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
})

module.exports = nextConfig
