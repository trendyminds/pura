var gulp = require('gulp'),
    modernizr = require('gulp-modernizr'),
    paths = require('../paths');

gulp.task('modernizr', function () {
  return gulp.src([paths.app.stylesAll, paths.app.scriptsAll])
    .pipe(modernizr({
      "options": [
        "setClasses",
        "addTest",
        "html5printshiv",
        "testProp",
        "fnBind"
      ]
    }))
    .pipe(gulp.dest(paths.app.tmpJSDir));
});
