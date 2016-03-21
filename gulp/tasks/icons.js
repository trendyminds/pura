import gulp from 'gulp';
import svg2png from 'gulp-svg2png';
import del from 'del';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';

let config = {
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
            var fileRegex = /sprite.{8}.{5}/g;
            var spriteFile = fileRegex.exec(render(sprite));
            return spriteFile;
          };
        }
      },
      sprite: 'svg/sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
};

gulp.task('cleanSprite', function () {
  return del(['./app/_tmp/sprites/', './app/assets/images/sprites/']);
});

gulp.task('createSprite', ['cleanSprite'], function () {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/_tmp/sprites/'));
});

gulp.task('spritePNG', ['createSprite'], function () {
  return gulp.src('./app/_tmp/sprites/css/svg/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/_tmp/sprites/css/svg/'));
});

gulp.task('copySprites', ['spritePNG'], function () {
  var copyPaths = [
    './app/_tmp/sprites/css/svg/**'
  ];

  return gulp.src(copyPaths).pipe(gulp.dest('./app/assets/images/sprites/'));
});

gulp.task('copyStyles', ['copySprites'], function () {
  var copyPaths = [
    './app/_tmp/sprites/css/*.css'
  ];

  return gulp.src(copyPaths)
          .pipe(rename('_sprite.css'))
          .pipe(gulp.dest('./app/assets/styles/base'));
});

gulp.task('deleteTmpSprites', ['copyStyles'], function () {
  return del('./app/_tmp/sprites/');
});

gulp.task('icons', ['cleanSprite', 'createSprite', 'spritePNG', 'copySprites', 'copyStyles', 'deleteTmpSprites']);
