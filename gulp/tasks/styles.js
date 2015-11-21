var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    fileImport = require('postcss-import'),
    nested = require('postcss-nested'),
    mixins = require('postcss-mixins'),
    vars = require('postcss-simple-vars'),
    paths = require('../paths');

gulp.task('styles', function () {
  var processors = [
    fileImport,
    vars,
    mixins,
    nested,
    autoprefixer
  ];

  return gulp.src(paths.app.stylesMain)
    .pipe(postcss(processors))
    .pipe(gulp.dest(paths.app.tmpCSSDir));
});
