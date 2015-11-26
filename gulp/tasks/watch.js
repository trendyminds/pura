var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    clear = require('clear'),
    chalk = require('chalk'),
    paths = require('../paths');

gulp.task('watch', function () {
  livereload.listen({ 'quiet': true });
  gulp.watch([paths.app.tmpCSS, paths.app.tmpJSMain, paths.app.tmpJSVendor]).on('change', livereload.changed);
  gulp.watch([paths.app.scriptsAll, paths.app.hbsAll], ['scripts:app', 'scripts:vendor']);
  gulp.watch(paths.app.stylesAll, ['styles']);

  runSequence(
    ['modernizr', 'icons'],
    ['styles', 'scripts:app', 'scripts:vendor'],
    function () {
      clear();
      console.log(
        chalk.yellow('Gulp is watching for new changes...')
      );
    }
  );
});

gulp.task('dev', function () {
  gulp.start('watch');
});
