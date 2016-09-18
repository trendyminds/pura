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
  "output": "./app/_compiled/styles/styles.css",
  "autoprefixer": {
    "browsers": "last 3 versions"
  },
  "postcss-import": {
    glob: true
  }
}
