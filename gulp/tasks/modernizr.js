var gulp = require('gulp'),
    modernizr = require('gulp-modernizr'),
    assetPaths = require('../paths');

gulp.task('modernizr', function () {
  return gulp.src([assetPaths.tmpCSS, assetPaths.tmpJSMain])
    .pipe(modernizr({
      "options": [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
      ]
    }))
    .pipe(gulp.dest('./app/_tmp/scripts/'));
});
