import gulp from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';

let config = {
  mode: {
    css: {
      variables: {
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

gulp.task('copySprites', function () {
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

gulp.task('icons', ['cleanSprite', 'createSprite', 'copySprites', 'copyStyles', 'deleteTmpSprites']);
