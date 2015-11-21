var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    paths = require('../paths');

gulp.task('watch', function () {
  runSequence(
    ['styles', 'scripts:app', 'scripts:vendor'],
    ['modernizr', 'icons']
  );

  livereload.listen();

  gulp.watch([paths.app.tmpCSS, paths.app.tmpJSMain, paths.app.tmpJSVendor]).on('change', livereload.changed);

  gulp.watch(paths.app.stylesAll, [
    'styles'
  ]);

  gulp.watch([paths.app.scriptsAll, paths.app.hbsAll], [
    'scripts'
  ]);
});
