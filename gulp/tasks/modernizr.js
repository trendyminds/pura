import gulp from 'gulp';
import modernizr from 'gulp-modernizr';
import paths from '../paths';

gulp.task('modernizr', function () {
  return gulp.src([paths.app.stylesAll, paths.app.scriptsAll])
    .pipe(modernizr({
      'options': [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
      ]
    }))
    .pipe(gulp.dest(paths.app.tmpJSDir));
});
