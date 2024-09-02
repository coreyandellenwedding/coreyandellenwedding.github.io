'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Compile SCSS to CSS
function sassTask() {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ basename: 'styles.min' }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// Minify JS
function minifyJs() {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({ basename: 'scripts.min' }))
        .pipe(gulp.dest('./js'));
}

// Serve and watch files
function serve() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/*.scss", sassTask);
    gulp.watch("*.html").on('change', browserSync.reload);
}

// Watch SCSS files
function watchFiles() {
    gulp.watch('./sass/**/*.scss', sassTask);
}

// Default task
exports.default = gulp.series(
    gulp.parallel(sassTask, minifyJs),
    serve
);

exports.watch = watchFiles;