import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';
import paths from '../paths';

gulp.task('lintCSS', function lintCssTask() {
  return gulp.src(paths.app.styles)
    .pipe(gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }))
    .on('error', function (err) {
      console.log(err.toString());
      process.exit(1);
    });
});
