var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    clear = require('clear'),
    chalk = require('chalk'),
    watch = require('gulp-watch'),
    paths = require('../paths');

gulp.task('watch', function () {
  livereload.listen({ 'quiet': true });
  gulp.watch([paths.app.tmpCSS, paths.app.tmpJSMain, paths.app.tmpJSVendor]).on('change', livereload.changed);

  watch([paths.app.scriptsAll, paths.app.hbsAll], function () {
    gulp.start(['scripts:app', 'scripts:vendor']);
  });

  watch(paths.app.stylesAll, function () {
    gulp.start('styles');
  });

  watch(paths.imagesSrcAll, function () {
    gulp.start('icons');
  });

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
