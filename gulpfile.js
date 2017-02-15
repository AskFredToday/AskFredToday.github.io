var gulp = require('gulp'),
    jsugly = require('gulp-uglify'),
    riot = require('gulp-riot'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  var opts = {
    conditionals: true
  };
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
