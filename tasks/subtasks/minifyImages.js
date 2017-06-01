const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngcrush = require('imagemin-pngcrush');

imagemin(['src/assets/images/**/*.{jpg,jpeg,png}'], '.', {
  plugins: [
    imageminJpegtran({
      progressive: true
    }),
    imageminPngcrush({
      reduce: true
    })
  ]
});
