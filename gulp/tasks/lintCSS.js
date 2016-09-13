import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';
import clear from 'clear';
import chalk from 'chalk';
import paths from '../paths';

gulp.task('lintCSS', function lintCssTask() {
  return gulp.src(paths.app.styles)
    .pipe(gulpStylelint({
      reporters: [{
        formatter: 'string',
        console: true,
        save: 'stylelint.log'
      }]
    }))
    .on('error', function (err) {
      console.log(chalk.red(
        `
** CSS ERROR ***************************************************************************
Stylelint detected an error in your CSS. Your project did not build to the dist/ folder.
Review 'stylelint.log' for a full report on all CSS warnings and errors.
****************************************************************************************
        `
      ));
      console.log(err.toString());
      process.exit(1);
    });
});
