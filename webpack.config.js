const currentTask = process.env.npm_lifecycle_event;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const HtmlWebpack = require("html-webpack-plugin");
const fse = require("fs-extra");

// Importing path from the Node library
const path = require("path");

const postCSSPlugins = [require("postcss-mixins"), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy Images", () => {
      fse.copySync("./app/assets/images", "./dist/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  // Style loader must go first otherwise webpack throws an error
  use: ["css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
};

let pages = fse
  .readdirSync("./app")
  .filter(file => {
    return file.endsWith(".html");
  })
  .map(page => {
    return new HtmlWebpack({
      filename: page,
      template: `./app/${page}`
    });
  });

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
  module: {
    rules: [cssConfig]
  }
};

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader");
  config.output = {
    filename: "bundled.js",
    // Generate absolute path to the correct folder
    path: path.resolve(__dirname, "app")
  };
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0"
  };
  config.mode = "development";
}

if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtract.loader);
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    // Generate absolute path to the correct folder
    path: path.resolve(__dirname, "dist")
  };
  config.mode = "production";
  config.optimization = {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [`...`, new CssMinimizer()]
  };

  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtract({ filename: "styles.[chunkhash].css" }), new RunAfterCompile());
}

module.exports = config;
