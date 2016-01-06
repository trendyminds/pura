var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    fileImport = require('postcss-import'),
    nested = require('postcss-nested'),
    mixins = require('postcss-mixins'),
    colors = require('postcss-color-function'),
    vars = require('postcss-simple-vars'),
    paths = require('../paths');

gulp.task('styles', function () {
  var processors = [
    fileImport({ glob: true }),
    vars,
    mixins,
    nested,
    colors,
    autoprefixer
  ];

  return gulp.src(paths.app.stylesMain)
    .pipe(postcss(processors))
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest(paths.app.tmpCSSDir));
});
