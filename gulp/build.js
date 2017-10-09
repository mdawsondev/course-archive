var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  compiler = require('google-closure-compiler-js').gulp(),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  postcss = require('gulp-postcss');

gulp.task('autoprefixer', function() {
  return gulp.src('docs/**/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('docs'));
});

gulp.task('build', ['build:remove']);

gulp.task('build:clean', function () {
  return del(['docs']);
});

gulp.task('build:copy', ['build:clean'], function(){
  return gulp.src(['src/**/*', "!src/assets/img/**/*"])
  .pipe(gulp.dest('docs/'));
});

gulp.task('build:optimize', function() {
  return gulp.src(['src/assets/img/**/*', '!src/assets/img/icons', '!src/assets/img/icons/**/*'])
      .pipe(imagemin({
        profressive: true,
        interlaced: true,
        multipass: true
      }))
      .pipe(gulp.dest('docs/assets/img'));
});

gulp.task('build:process', ['build:copy'], function() {
  gulp.start('minify-css');
  gulp.start('minify-js');
});

gulp.task('build:remove', ['build:process'], function() {
  del([
    'docs/assets/styles/!(*.css)',
    'docs/assets/scripts/!(bundle.js)',
    'docs/assets/img/icons'
  ]);
});

gulp.task('minify-css', ['autoprefixer'], function() {
  return gulp.src('docs/assets/styles/*.css')
  .pipe(cleanCSS({debug: true}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(gulp.dest('docs/assets/styles'));
});

gulp.task('minify-js', function() {
  return gulp.src('src/assets/scripts/bundle.js', {base: './'})
  .pipe(compiler({
    compilationLevel: 'SIMPLE',
    warningLevel: 'QUIET',
    outputWrapper: '(function(){\n\n}).call(this)',
    jsOutputFile: 'bundle.js',
    createSourceMap: true,
  }))
  .pipe(gulp.dest('docs/assets/scripts'));
});
