var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    assetPaths = require('../paths');

gulp.task('scripts', function () {
  return browserify({
    entries: assetPaths.appScripts,
    debug: true,
    transform: ['browserify-handlebars']
  })
  .transform('babelify', { presets: ['es2015'] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(assetPaths.tmpScripts));
});
