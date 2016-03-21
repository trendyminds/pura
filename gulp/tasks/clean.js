import gulp from 'gulp';
import del from 'del';
import paths from '../paths';

gulp.task('clean', function () {
  return del(paths.dist.dir);
});
