import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import paths from '../paths';

gulp.task('scripts:app', function () {
  return browserify({
    entries: paths.app.scriptsMain,
    debug: true,
    transform: ['browserify-handlebars']
  })
  .transform(babelify)
  .bundle()
  .on('error', function (err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.app.tmpJSDir));
});

gulp.task('scripts:vendor', function () {
  return browserify({
    entries: paths.app.scriptsVendor
  })
  .transform('babelify', { presets: ['es2015'] })
  .bundle()
  .on('error', function (err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe(source('vendor.js'))
  .pipe(gulp.dest(paths.app.tmpJSDir));
});
