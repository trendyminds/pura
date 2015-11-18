var gulp = require('gulp'),
    del = require('del'),
    assetPaths = require('../paths');

gulp.task('copy', function() {
  var paths = [
    assetPaths.app + '/**/*.*',
    assetPaths.app + '/.*',
    assetPaths.app + '/**/.htaccess',
    '!' + assetPaths.allTemplates,
    '!' + assetPaths.allStyles,
    '!' + assetPaths.allScripts,
    '!' + assetPaths.allImages,
    '!' + assetPaths.allBower,
    '!' + assetPaths.allTmp
  ];

  return gulp.src(paths).pipe(gulp.dest(assetPaths.dist));
});
