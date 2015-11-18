var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    assetPaths = require('../paths');

gulp.task('minifyStyles', function () {
  return gulp.src(assetPaths.distCSS)
    .pipe(minifyCSS())
    .pipe(gulp.dest(assetPaths.distStyles));
});
