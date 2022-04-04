const path = require("path");
// Importing path from the Node library

const postCSSPlugins = [require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")];

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    // Generate absolute path to the correct folder
    path: path.resolve(__dirname, "app")
  },
  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        // Style loader must go first otherwise webpack throws an error
        use: ["style-loader", "css-loader?url=false", { loader: "postcss-loader", options: { postcssOptions: { plugins: postCSSPlugins } } }]
      }
    ]
  }
};
