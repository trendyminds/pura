module.exports = {
  "use": [
    "postcss-import",
    "postcss-simple-vars",
    "postcss-mixins",
    "postcss-nested",
    "postcss-color-function",
    "postcss-hexrgba",
    "autoprefixer"
  ],
  "input": "./app/assets/styles/styles.css",
  "output": "./app/assets/_compiled/styles.css",
  "autoprefixer": {
    "browsers": "last 3 versions"
  },
  "postcss-import": {
    glob: true
  }
}
