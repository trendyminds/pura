var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    assetPaths = require('../paths');

gulp.task('images', function () {
  return gulp.src(assetPaths.appImages)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(assetPaths.distImages));
});
