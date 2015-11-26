var gulp = require('gulp'),
    clear = require('clear'),
    chalk = require('chalk'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    ['clean', 'modernizr'],
    ['copy', 'styles', 'scripts:app', 'scripts:vendor', 'icons'],
    ['usemin', 'images', 'minifyStyles'],
    function () {
      clear();
      console.log(
        chalk.green('Project successfully built to the "dist/" directory!')
      );
    }
  );
});

gulp.task('build', function () {
  gulp.start('default');
});
