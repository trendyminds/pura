import gulp from 'gulp';
import paths from '../paths';

gulp.task('copy', function () {
  var copyPaths = [
    paths.app.dir + '/**/*.*',
    paths.app.dir + '/.*',
    paths.app.dir + '/**/.htaccess',
    '!' + paths.app.styles,
    '!' + paths.app.scripts
  ];

  return gulp.src(copyPaths).pipe(gulp.dest(paths.dist.dir));
});
