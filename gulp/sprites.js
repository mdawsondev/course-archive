var gulp = require('gulp'),
  del = require('del'),
  rename = require('gulp-rename'),
  svgSprite = require('gulp-svg-sprite'),
  svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        sass: {
          template: './gulp/sprite.sass'
        }
      }
    }
  }
}

gulp.task('sprite', ['sprite:png'], function() {
  return del(['src/assets/img/sprite'])
});

gulp.task('sprite:png', ['sprite:move-svg'], function() {
  return gulp.src('src/assets/img/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('src/assets/img/'));
});

gulp.task('sprite:wipe', function() {
  return del(['src/assets/img/sprite*.svg'])
})

gulp.task('sprite:generate', ['sprite:wipe'], function() {
  return gulp.src('src/assets/img/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('src/assets/img/sprite/'));
});

gulp.task('sprite:move-sass', ['sprite:generate'], function() {
  return gulp.src('src/assets/img/sprite/css/*.sass')
    .pipe(rename('_sprite.sass'))
    .pipe(gulp.dest('src/assets/styles/modules/'));
})

gulp.task('sprite:move-svg', ['sprite:move-sass'], function() {
  return gulp.src('src/assets/img/sprite/css/*.svg')
    .pipe(gulp.dest('src/assets/img/'));
})
