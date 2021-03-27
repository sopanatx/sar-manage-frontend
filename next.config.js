const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable: false,
    dest: "public",
    sw: "sw.js",
    register: true,
  },
});
