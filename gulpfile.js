var gulp         = require('gulp');
var util         = require('gulp-util');
var sass         = require('gulp-ruby-sass');
var watch        = require('gulp-watch');
var del          = require('del');
var plumber      = require('gulp-plumber');
var connect      = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function () {
  return gulp.src('src/scss/app.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('**/*.html')
    .pipe(plumber())
    .pipe(connect.reload());
});

gulp.task('clean', function () {
  del(['build']);
});

gulp.task('watch', ['clean'], function () {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('**/*.html', ['html']);
});

gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('default', ['connect', 'watch']);
