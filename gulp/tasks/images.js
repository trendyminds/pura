var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    paths = require('../paths');

gulp.task('images', function () {
  return gulp.src(paths.app.imagesAll)
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(paths.dist.imageDir));
});
