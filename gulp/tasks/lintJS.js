import gulp from 'gulp';
import eslint from 'gulp-eslint';
import paths from '../paths';

gulp.task('lintJS', function () {
  return gulp.src([paths.app.scripts, `!${paths.app.hbsAll}`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', function (err) {
      console.log(err.toString());
      process.exit(1);
    });
});
