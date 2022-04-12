const currentTask = process.env.npm_lifecycle_event;

// Importing path from the Node library
const path = require("path");

const postCSSPlugins = [require("postcss-mixins"), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")];

let config = {
  entry: "./app/assets/scripts/App.js",
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

if (currentTask == "dev") {
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
  config.output = {
    filename: "bundled.js",
    // Generate absolute path to the correct folder
    path: path.resolve(__dirname, "dist")
  };
  config.mode = "production";
}

module.exports = config;
