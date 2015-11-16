var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    'clean',
    ['styles', 'scripts', 'icons'],
    'modernizr',
    ['copy', 'images', 'usemin']
  );
});
