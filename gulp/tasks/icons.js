var gulp = require('gulp'),
    q = require('q'),
    path = require('path'),
    fs = require('fs'),
    del = require('del'),
    Grunticon = require('grunticon-lib'),
    assetPaths = require('../paths');

// Before we can create the icons, we need to start fresh
//  and delete the old batch
gulp.task('clean-icons', function () {
  return del(assetPaths.appIconsDirCompiled);
});

// Use grunticon to create the SVG/PNG sprites
gulp.task('icons', ['clean-icons'], function () {
  var deferred = q.defer(),
      iconDir = assetPaths.appIconsDir,
      options = {
        enhanceSVG: true,
        corsEmbed: true
      };

  var files = fs.readdirSync(iconDir).map(function (fileName) {
    return path.join(iconDir, fileName);
  });

  var grunticon = new Grunticon(files, assetPaths.appIconsDirCompiled, options);

  grunticon.process(function () {
    deferred.resolve();
  });

  return deferred.promise;
});
