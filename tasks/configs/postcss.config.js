module.exports = {
  plugins: [
    require('postcss-easy-import')({ prefix: '_' }),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-color-function'),
    require('postcss-hexrgba')(),
    require('autoprefixer')()
  ]
}
