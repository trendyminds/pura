module.exports = {
  "browsersync": {
    "files": [
      "./app/assets/_compiled/styles.css",
      "./app/assets/_compiled/*.js",
      "./app/*.html"
    ],
    "server": "app", // use this if it IS a static site
    // "proxy": "", // use this if it's NOT a static site, ex: app.mysite.dev
    "notify": false,
    "open": false
  },
  "templatePath": "/*.html" // Relative to the app directory
}
