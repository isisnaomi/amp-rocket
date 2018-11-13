var gulp = require('gulp');
var plumber = require('gulp-plumber');

var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

gulp.task('sass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(gulp.dest('./dist'));
});

var fs = require("fs");
var inject = require('gulp-inject-string');
gulp.task('html', function () {
    var cssContent = fs.readFileSync("./dist/main.css", "utf8");
    gulp.src("./src/html/*.html")
        .pipe(inject.after('style amp-custom>', cssContent))
        .pipe(gulp.dest("./dist"))
        .pipe(reload({
            stream: true
    }));
});

var browser = require('browser-sync');
var reload = browser.reload;
gulp.task('serve', function() {
    browser({
        port: 4500,
        open: false,
        ghostMode: false,
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch("./src/sass/**", ['sass']);
    gulp.watch("./dist/*.css", ['html']);
    gulp.watch("./src/html/*.html", ['html']);
});

gulp.task('default', ['sass', 'html', 'watch', 'serve']);
