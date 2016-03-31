import gulp from 'gulp';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import fileImport from 'postcss-import';
import nested from 'postcss-nested';
import mixins from 'postcss-mixins';
import colors from 'postcss-color-function';
import hexrgba from 'postcss-hexrgba';
import vars from 'postcss-simple-vars';
import paths from '../paths';

gulp.task('styles', function () {
  var processors = [
    fileImport({ glob: true }),
    vars,
    mixins,
    nested,
    colors,
    hexrgba,
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
