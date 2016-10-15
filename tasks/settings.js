module.exports = {
  "browsersync": {
    "files": [
      "./app/assets/_compiled/styles.css",
      "./app/assets/_compiled/*.js"
    ],
    "server": "app",
    "notify": false,
    "open": false
  },
  "templatePath": "/*.html" // Relative to the app directory
}
