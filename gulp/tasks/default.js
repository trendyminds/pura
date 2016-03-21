import gulp from 'gulp';
import clear from 'clear';
import chalk from 'chalk';
import runSequence from 'run-sequence';

gulp.task('default', function () {
  runSequence(
    ['clean', 'modernizr'],
    ['copy', 'styles', 'scripts:app', 'scripts:vendor', 'icons'],
    'usemin',
    ['images', 'minifyStyles'],
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
