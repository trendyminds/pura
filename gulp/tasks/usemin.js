var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    paths = require('../paths');

gulp.task('usemin', function () {
  return gulp.src(paths.app.templates)
    .pipe(usemin({
      outputRelativePath: paths.app.assetsRelativeToTemplates,
      css: [rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest(paths.dist.templatesDir));
});
