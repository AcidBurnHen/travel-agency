const path = require("path");
// Importing path from the Node library

module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    // Generate absolute path to the correct folder
    path: path.resolve(__dirname, "app")
  },
  mode: "development"
};
