const Version = require("node-version-assets");

new Version({
  assets: [
    "./src/_compiled/app.css",
    "./src/_compiled/app.js",
    "./src/_compiled/vendor.js"
  ],
  grepFiles: ["./src/index.html"]
}).run();
