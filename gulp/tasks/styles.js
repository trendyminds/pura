var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    pixrem = require('gulp-pixrem'),
    assetPaths = require('../paths');

gulp.task('styles', function () {
  return gulp.src(assetPaths.appStyles)
    .pipe(stylus())
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(pixrem())
    .pipe(gulp.dest(assetPaths.tmpStyles));
});
