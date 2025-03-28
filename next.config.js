const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias["@components"] = path.resolve(__dirname, "components");

    if (!isServer) {
      config.plugins.push(
        new CleanPlugin.CleanWebpackPlugin(),
        new webpack.DefinePlugin({
          "process.env.PLATFORM": JSON.stringify(
            process.env.PLATFORM || "Samsung"
          ),
        }),
        new CopyWebpackPlugin({
          patterns: [{ from: "public", to: "dist" }],
        })
      );
    }

    config.optimization = {
      minimize: true,
      minimizer: [
        new OptimizeCssAssetsWebpackPlugin(),
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: { comments: false },
            compress: { drop_console: true },
          },
        }),
      ],
    };

    return config;
  },
};
