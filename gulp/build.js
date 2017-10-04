var gulp = require('gulp'),
  autoprefixer = require('autoprefixer'),
  compiler = require('google-closure-compiler-js').gulp(),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  postcss = require('gulp-postcss');

gulp.task('autoprefixer', function() {
  return gulp.src('dist/**/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('dist'));
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
    'dist/assets/styles/!(*.css)',
    'dist/assets/scripts/!(bundle.js)'
  ]);
});

gulp.task('minify-css', ['autoprefixer'], function() {
  return gulp.src('dist/assets/styles/*.css')
  .pipe(cleanCSS({debug: true}, function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(gulp.dest('dist/assets/styles'));
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
  .pipe(gulp.dest('dist/assets/scripts'));
});
