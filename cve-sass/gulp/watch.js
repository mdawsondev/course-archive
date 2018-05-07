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

gulp.task('liveSync', function(){
  browserSync.init({
    server: {
      baseDir: 'docs/'
    },
  });
});

gulp.task('html', function(){
  return gulp.src('src/**/*.html')
    .pipe(browserSync.stream());
});

gulp.task('js-reload', ['js'], function() {
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
  gulp.watch('src/**/!(bundle)*.js', ['js-reload']);
})

gulp.task('default', ['browserSync', 'html', 'sass', 'js-reload', 'watch']);
