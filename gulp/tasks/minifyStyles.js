import gulp from 'gulp';
import cssnano from 'gulp-cssnano';
import paths from '../paths';

gulp.task('minifyStyles', function () {
  return gulp.src(paths.dist.css)
    .pipe(cssnano({ autoprefixer: false }))
    .pipe(gulp.dest(paths.dist.cssDir));
});
