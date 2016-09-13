import gulp from 'gulp';
import eslint from 'gulp-eslint';
import chalk from 'chalk';
import fs from 'fs';
import paths from '../paths';

gulp.task('lintJS', function () {
  return gulp.src([paths.app.scripts, `!${paths.app.hbsAll}`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('unix', fs.createWriteStream('lintJS.log')))
    .pipe(eslint.failAfterError())
    .on('error', function (err) {
      console.log(chalk.red(
        `
** JS ERROR ****************************************************************************
ESLint detected an error in your JS. Your project did not build to the dist/ folder.
Review 'lintJS.log' for a full report on all CSS warnings and errors.
****************************************************************************************
        `
      ));
      console.log(err.toString());
      process.exit(1);
    });
});
