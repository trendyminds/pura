var gulp = require('gulp'),
    del = require('del'),
    assetPaths = require('../paths');

gulp.task('clean', function () {
  return del(assetPaths.dist);
});
