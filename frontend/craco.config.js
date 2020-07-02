const AntdPlugin = require("craco-antd");
const webpack = require("webpack");
const path = require("path");
const rootDir = path.join(__dirname);

module.exports = {
  plugins: [{ plugin: AntdPlugin }],
  webpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /node_modules\/antd\/lib\/style\/index\.less/,
        path.resolve(rootDir, "src/style.less")
      )
    ]
  }
};
