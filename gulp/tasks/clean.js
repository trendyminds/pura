var gulp = require('gulp'),
    del = require('del'),
    paths = require('../paths');

gulp.task('clean', function () {
  return del(paths.dist.dir);
});
