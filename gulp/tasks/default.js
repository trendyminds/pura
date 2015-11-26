var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function () {
  runSequence(
    ['clean', 'modernizr'],
    ['copy', 'styles', 'scripts:app', 'scripts:vendor', 'icons'],
    ['usemin', 'images', 'minifyStyles']
  );
});

gulp.task('build', function () {
  gulp.start('default');
});
