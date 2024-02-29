const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const WrapperPlugin = require("wrapper-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const headerDoc =
  fs.readFileSync(
    require.resolve("solid-auth-client/dist-lib/solid-auth-client.bundle.js"),
    "utf8"
  ) + "\n";

module.exports = (env) => {
  return {
    resolve: {
      modules: ["node_modules", "src/"],
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        url: false,
        "https-browserify": false,
        stream: false,
        "stream-browserify": false,
        crypto: false,
        buffer: require.resolve("buffer/"),
        os: false
      },
      extensions: [".ts", ".js", ".mjs"],
    },
    mode: "production",
    entry: ["./src/dokieli.js"],
    output: {
      path: path.join(__dirname, "/scripts/"),
      filename: "dokieli.js",
      library: undefined, 
      libraryExport: 'default', 
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: ["/src/__tests__/", "/node_modules/", "/__testUtils__/"],
        },
      ],
    },
    externals: {
      "text-encoding": "TextEncoder",
      "whatwg-url": "window",
      "isomorphic-fetch": "fetch",
      "@trust/webcrypto": "crypto",
      "solid-auth-client": ["solid", "auth"],
      "medium-editor": "MediumEditor",
      "medium-editor-tables": "MediumEditorTable",
    },
    devtool: "source-map",
    optimization: {
      usedExports: true,
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },

    plugins: [
      new WrapperPlugin({
        header: headerDoc,
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
      new BundleAnalyzerPlugin({ analyzerMode: 'disabled' }),
    ],
  };
};
