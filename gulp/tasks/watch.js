var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    clear = require('clear'),
    chalk = require('chalk'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(),
    paths = require('../paths'),
    config = require('../config');

gulp.task('watch', function () {
  gulp.watch(paths.app.stylesAll, ['styles', 'inject-css']);

  gulp.watch([paths.app.scriptsAll, paths.app.hbsAll], function () {
    runSequence('scripts:app', 'scripts:vendor', 'reload');
  });

  gulp.watch(paths.app.imagesSrcAll, function () {
    runSequence('icons', 'reload');
  });

  gulp.watch(paths.app.templates).on('change', browserSync.reload);

  runSequence(
    ['modernizr', 'icons'],
    ['styles', 'scripts:app', 'scripts:vendor'],
    function () {
      browserSync.init({ proxy: config.proxy });
      clear();
      console.log(
        chalk.yellow('Gulp is watching for new changes...')
      );
    }
  );
});

gulp.task('inject-css', function () {
  gulp.src([paths.app.tmpCSS])
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('dev', function () {
  gulp.start('watch');
});
