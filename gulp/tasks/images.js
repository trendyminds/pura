import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import paths from '../paths';

gulp.task('images', function () {
  return gulp.src(paths.app.imagesAll)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
      svgoPlugins: [
        { cleanupListOfValues: { floatPrecision: 2 } },
        { cleanupNumericValues: { floatPrecision: 2 } },
        { convertPathData: { floatPrecision: 2 } }
      ]
    }))
    .pipe(gulp.dest(paths.dist.imageDir));
});
