var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    'clean',
    ['copy', 'styles', 'scripts:app', 'scripts:vendor', 'icons', 'usemin'],
    ['modernizr', 'images', 'minifyStyles']
  );
});
