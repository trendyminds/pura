var gulp = require('gulp'),
    modernizr = require('gulp-modernizr'),
    uglify = require('gulp-uglify'),
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
    .pipe(uglify())
    .pipe(gulp.dest('./app/_tmp/scripts/'));
});
