const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src/"),
      "@Helpers": path.resolve(__dirname, "src/helpers"),
      "@Assets": path.resolve(__dirname, "src/assets"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Context": path.resolve(__dirname, "src/context"),
      "@Modules": path.resolve(__dirname, "src/modules"),
      "@Pages": path.resolve(__dirname, "src/pages"),
      "@Redux": path.resolve(__dirname, "src/redux"),
    },
  },
};
