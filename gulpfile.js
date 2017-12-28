const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');



gulp.task('copyHTML', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist'))
})

gulp.task('imageMin', function() {
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
})

gulp.task('uglify', function() {
  gulp
    .src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('sass', function() {
  gulp
    .src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('concatJS', function() {
  gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('watch', ['sass'], function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('src/js/*.js', ['concatJS']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHTML']).on('change', browserSync.reload);
})
