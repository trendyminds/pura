var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    assetPaths = require('../paths');

gulp.task('usemin', function () {
  return gulp.src(assetPaths.allTemplateFiles)
    .pipe(usemin({
      outputRelativePath: '../',
      css: [rev()],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest(assetPaths.distTemplateFiles));
});
