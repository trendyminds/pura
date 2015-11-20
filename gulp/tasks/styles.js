var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    paths = require('../paths');

gulp.task('styles', function () {
  return gulp.src(paths.app.stylesMain)
    .pipe(stylus())
    .pipe(prefix())
    .pipe(gulp.dest(paths.app.tmpCSSDir));
});
