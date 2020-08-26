const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [path.resolve(__dirname, "src", "main.ts")];
    config.resolve.extensions = [...config.resolve.extensions, ".ts"];

    config.plugins.push(new ForkTsCheckerWebpackPlugin());

    return config;
  },
};
