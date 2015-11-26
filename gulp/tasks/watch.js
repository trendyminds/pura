var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    paths = require('../paths');

gulp.task('watch', function () {
  runSequence(
    ['modernizr', 'icons'],
    ['styles', 'scripts:app', 'scripts:vendor']
  );

  livereload.listen();

  gulp.watch([paths.app.tmpCSS, paths.app.tmpJSMain, paths.app.tmpJSVendor]).on('change', livereload.changed);

  gulp.watch(paths.app.stylesAll, [
    'styles'
  ]);

  gulp.watch([paths.app.scriptsAll, paths.app.hbsAll], [
    'scripts:app',
    'scripts:vendor'
  ]);
});

gulp.task('dev', function () {
  gulp.start('watch');
});
