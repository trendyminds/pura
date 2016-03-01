var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
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
    autoprefixer({ browsers: ['last 2 versions'] })
  ];

  return gulp.src(paths.app.stylesMain)
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.app.tmpCSSDir));
});
