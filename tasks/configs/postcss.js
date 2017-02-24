module.exports = {
  "use": [
    "postcss-import",
    "postcss-mixins",
    "postcss-simple-vars",
    "postcss-nested",
    "postcss-color-function",
    "postcss-hexrgba",
    "postcss-math",
    "autoprefixer"
  ],
  "input": "./app/assets/styles/styles.css",
  "output": "./app/assets/_compiled/styles.css",
  "postcss-import": {
    glob: true
  }
}
