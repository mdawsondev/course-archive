var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  browserSync = require('browser-sync').create(),
  compiler = require('google-closure-compiler-js').gulp(),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sorucemaps = require('gulp-sourcemaps'),
  svgSprite = require('gulp-svg-sprite');


gulp.task('sprite', ['sprite:m-svg'], function() {
  return del(['src/img/sprite'])
})

gulp.task('sprite:begin', function() {
  return del(['src/img/sprite*.svg'])
})

gulp.task('sprite:create', ['sprite:begin'], function() {
  return gulp.src('src/img/icons/**/*.svg')
    .pipe(svgSprite({
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
    }))
    .pipe(gulp.dest('src/img/sprite/'));
});

gulp.task('sprite:m-sass', ['sprite:create'], function() {
  return gulp.src('src/img/sprite/css/*.sass')
    .pipe(rename('_sprite.sass'))
    .pipe(gulp.dest('src/styles/modules/'));
})

gulp.task('sprite:m-svg', ['sprite:m-sass'], function() {
  return gulp.src('src/img/sprite/css/*.svg')
    .pipe(gulp.dest('src/img/'));
})

gulp.task('autoprefixer', function() {
  return gulp.src('dist/**/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
  });
});

gulp.task('build', ['build:remove']);

gulp.task('build:clean', function () {
  return del(['dist']);
});

gulp.task('build:copy', ['build:clean'], function(){
  return gulp.src(['src/**/*'])
  .pipe(gulp.dest('dist/'));
});

gulp.task('build:process', ['build:copy'], function() {
  gulp.start('minify-css');
  gulp.start('minify-js');
});

gulp.task('build:remove', ['build:process'], function() {
  del([
    'dist/**/*.sass',
    'dist/scripts/!(*.min.js)'
  ]);
});

gulp.task('html', function(){
  return gulp.src('src/**/*.html')
  .pipe(browserSync.stream());
});

gulp.task('minify-css', ['autoprefixer'], function() {
  return gulp.src('dist/styles/*.css')
  .pipe(cleanCSS({debug: true}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(gulp.dest('dist/styles'));
});

gulp.task('minify-js', function() {
  return gulp.src('src/scripts/*.js', {base: './'})
  .pipe(compiler({
    compilationLevel: 'SIMPLE',
    warningLevel: 'QUIET',
    outputWrapper: '(function(){\n\n}).call(this)',
    jsOutputFile: 'main.js',  // outputs single file
    createSourceMap: true,
  }))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.sass')
  .pipe(sass())
  .on('error', function(errorInfo) {
    console.log(errorInfo.toString());
    this.emit('end');
  })
  .pipe(gulp.dest('./src/'))
  .pipe(browserSync.stream());
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
})

gulp.task('default', ['browserSync', 'html', 'sass', 'watch']);
