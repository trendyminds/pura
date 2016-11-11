const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

imagemin(['dist/assets/images/**/*.{jpg,jpeg,png,svg}'], '.', {
  plugins: [
    imageminMozjpeg({
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

