var gulp = require('gulp');

var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');


gulp.task('default', ['watch']);

gulp.task('less', function () {
    return gulp.src('./less/**/*.less')
        .pipe(concat('boiteacycler.less'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css-compiled'));
});

gulp.task('watch', function () {
    return gulp.watch('./less/**/*.less', ['less'])
});
