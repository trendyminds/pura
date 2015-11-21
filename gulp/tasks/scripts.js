var gulp = require('gulp'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    paths = require('../paths');

gulp.task('scripts:app', function () {
  return browserify({
    entries: paths.app.scriptsMain,
    debug: true,
    transform: ['browserify-handlebars']
  })
  .transform('babelify', { presets: ['es2015'] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.app.tmpJSDir));
});

gulp.task('scripts:vendor', function () {
  return browserify({
    entries: paths.app.scriptsVendor
  })
  .transform('babelify', { presets: ['es2015'] })
  .bundle()
  .pipe(source('vendor.js'))
  .pipe(gulp.dest(paths.app.tmpJSDir));
});
