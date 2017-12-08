const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

imagemin(['src/assets/images/**/*.{jpg,jpeg,png,svg}'], '.', {
  plugins: [
    imageminJpegtran({
      progressive: true
    }),
    imageminPngquant({
      quality: '90'
    }),
    imageminSvgo({
      plugins: [
        { cleanupListOfValues: { floatPrecision: 2 } },
        { cleanupNumericValues: { floatPrecision: 2 } },
        { convertPathData: { floatPrecision: 2 } }
      ]
    })
  ]
});
