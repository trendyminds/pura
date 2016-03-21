import gulp from 'gulp';
import usemin from 'gulp-usemin';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import paths from '../paths';

gulp.task('usemin', function () {
  return gulp.src(paths.app.templates)
    .pipe(usemin({
      outputRelativePath: paths.app.assetsRelativeToTemplates,
      css: [rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest(paths.dist.templatesDir));
});
