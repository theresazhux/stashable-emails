var gulp = require('gulp');

var emailBuilder = require('gulp-email-builder');
var htmlmin = require('gulp-htmlmin');
// var strip = require('gulp-strip-comments');

var options = {  };
var builder = emailBuilder(options);

gulp.task('emailBuilder', function() {
  return gulp.src(['*.html'])
    .pipe(emailBuilder(options).build())
    // .pipe(strip())
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, removeComments: true}))
    .pipe(gulp.dest('./output/'));
});
