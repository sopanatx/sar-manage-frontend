const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    // dest: 'public', // comment out this line
    register: true,
    sw: "/sw.js",
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/",
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  webpack5: true,
  publicRuntimeConfig: {
    GRAPHQL_API_ENDPOINT: process.env.GRAPHQL_API_ENDPOINT,
    SENTRY_API_ENDPOINT: process.env.SENTRY_API_ENDPOINT,
  },
});
