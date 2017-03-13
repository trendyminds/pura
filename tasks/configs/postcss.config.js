module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }),
    require('precss')(),
    require('postcss-hexrgba')(),
    require('postcss-math')(),
    require('autoprefixer')()
  ]
}
