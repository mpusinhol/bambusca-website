var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var util = require('gulp-util');

var config = {
  assetsDir: './src/styles/scss',
  sassPattern: '*.scss',
  production: !!util.env.production
};

gulp.task('sass', function() {
  gulp.src(config.assetsDir+'/'+config.sassPattern)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/styles/css'));
});

gulp.task('watch', function() {
  gulp.watch(config.assetsDir+'/'+config.sassPattern, ['sass'])
});

gulp.task('default', ['sass', 'watch']);