var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass'),
webpack = require('webpack');

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
  });
});

gulp.task('html', function(){
  return gulp.src('src/**/*.html')
    .pipe(browserSync.stream());
});

gulp.task('reload', function() {
  return browserSync.reload();
})

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
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/*.js', ['js', 'reload']);
})

gulp.task('default', ['browserSync', 'html', 'sass', 'js', 'watch']);
