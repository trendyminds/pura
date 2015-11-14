var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    'clean',
    ['styles', 'scripts'],
    'modernizr',
    ['copy', 'images', 'usemin']
  )
});
