import gulp from 'gulp';
import runSequence from 'run-sequence';
import clear from 'clear';
import chalk from 'chalk';
import watch from 'gulp-watch';
import {create as bsCreate} from 'browser-sync';
import paths from '../paths';
import config from '../config';

const browserSync = bsCreate();

gulp.task('watch', function () {
  watch([paths.app.scriptsAll, paths.app.hbsAll], function () {
    runSequence('scripts:app', 'scripts:vendor', 'reload');
  });

  watch(paths.app.stylesAll, function () {
    gulp.start('styles', 'inject-css');
  });

  watch(paths.app.imagesSrcAll, function () {
    runSequence('icons', 'reload');
  });

  gulp.watch(paths.app.templates).on('change', browserSync.reload);

  runSequence(
    ['modernizr', 'icons'],
    ['styles', 'scripts:app', 'scripts:vendor'],

    function () {
      // If Browsersync is enabled, run it in either proxy mode or flat HTML mode
      if (config.browserSync) {
        browserSync.init(config.browserSync);
      }

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
