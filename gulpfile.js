var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

gulp.task('mocha', function() {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('run', shell.task([
    './setup.sh'
]));
