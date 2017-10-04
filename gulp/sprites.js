var gulp = require('gulp'),
  del = require('del'),
  rename = require('gulp-rename'),
  svgSprite = require('gulp-svg-sprite');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        sass: {
          template: './gulp/sprite.sass'
        }
      }
    }
  }
}

gulp.task('sprite', ['sprite:move-svg'], function() {
  return del(['src/assets/img/sprite'])
})

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
