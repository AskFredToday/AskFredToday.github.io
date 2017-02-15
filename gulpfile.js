var gulp = require('gulp'),
    jsugly = require('gulp-uglify'),
    riot = require('gulp-riot'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  var opts = {
    conditionals: true
  };
  gulp.src(['*/*.css', '!*/*.min.css'])
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'));

  return gulp.src(['./*/*.tag.html'])
    .pipe(riot({
      compact: true
     }))
    .pipe(gulp.dest('./'))
    .pipe(jsugly())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./'));
});
