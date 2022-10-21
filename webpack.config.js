const { IgnorePlugin } = require("webpack");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  plugins: [new IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       loader: "babel-loader",
  //       query: {
  //         presets: [
  //           [
  //             "env",
  //             {
  //               target: { node: "16.0" }, // Node version on AWS Lambda
  //               useBuiltIns: true,
  //               modules: false,
  //               loose: true,
  //             },
  //           ],
  //           "stage-0",
  //         ],
  //       },
  //     },
  //   ],
  // },
};
