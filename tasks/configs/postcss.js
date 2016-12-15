module.exports = {
  "use": [
    "postcss-import",
    "postcss-mixins",
    "postcss-simple-vars",
    "postcss-nested",
    "postcss-color-function",
    "postcss-hexrgba",
    "autoprefixer"
  ],
  "input": "./app/assets/styles/styles.css",
  "output": "./app/assets/_compiled/styles.css",
  "autoprefixer": {
    "browsers": "last 2 versions"
  },
  "postcss-import": {
    glob: true
  }
}
