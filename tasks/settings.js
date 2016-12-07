const templatePath = "/templates/**/*.html";

module.exports = {
  "browsersync": {
    "files": [
      "./app/assets/_compiled/styles.css",
      "./app/assets/_compiled/*.js",
      "./app" + templatePath
    ],
    "proxy": "", // use this if it's NOT a static site, ex: app.trendyminds.dev
    // "server": "app" // use this if it IS a static site
    "notify": false,
    "open": true
  },
  "templatePath": templatePath // Relative to the app directory
}
