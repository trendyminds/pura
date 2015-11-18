var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    'clean',
    ['copy', 'styles', 'scripts', 'modernizr', 'icons', 'usemin'],
    ['images', 'minifyStyles']
  );
});
