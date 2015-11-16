var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    assetPaths = require('../paths');

gulp.task('watch', function () {
  runSequence(
    ['styles', 'scripts', 'icons'],
    'modernizr'
  )

  livereload.listen();

  gulp.watch([assetPaths.tmpCSS, assetPaths.tmpJSMain]).on('change', livereload.changed);

  gulp.watch(assetPaths.appStylesAll, [
    'styles'
  ]);

  gulp.watch([assetPaths.appScriptsAll, assetPaths.appHBS], [
    'scripts'
  ]);
});
