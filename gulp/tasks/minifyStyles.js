var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    paths = require('../paths');

gulp.task('minifyStyles', function () {
  return gulp.src(paths.dist.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.dist.cssDir));
});
