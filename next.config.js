const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    disable:false,
    dest: "public",
    register: true,
  },
  target: "serverless",
  compress:true,
});
