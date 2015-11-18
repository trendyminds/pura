var gulp = require('gulp'),
    svg2png = require('gulp-svg2png'),
    del = require('del'),
    svgSprite = require('gulp-svg-sprite'),
    runSequence = require('run-sequence');

config = {
  mode: {
    css: {
      variables: {
        fallback: function() {
          return function (sprite, render) {
            return render(sprite).split('.svg').join('.png');
          };
        },
        removePath: function () {
          return function (sprite, render) {
            var fileRegex = /sprite-.{8}.{4}/g;
            var spriteFile = fileRegex.exec(render(sprite));
            return spriteFile;
          };
        }
      },
      dest: '/_tmp/styles',
      sprite: '/assets/images/sprites/sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css',
          css: '../../sprite.css'
        }
      }
    }
  }
};

gulp.task('cleanSprite', function () {
  return del('./app/assets/images/sprites/');
});

gulp.task('createSprite', ['cleanSprite'], function () {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/assets/images/icons/sprite/'));
});

gulp.task('spritePNG', ['createSprite'], function () {
  return gulp.src('./app/assets/images/sprites/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('icons', ['cleanSprite', 'createSprite', 'spritePNG']);
