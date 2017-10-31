var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

var webpackProdConfig = require('./webpack.config.prod');
var webpackDevConfig = require('./webpack.config.dev');

gulp.task("webpack:dev", function(callback) {

    webpack(webpackDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        browserSync.reload();
        callback();
    });

});

gulp.task("webpack:prod", function(callback) {

    webpack(webpackProdConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });

});

gulp.task('sass:dev', function () {

    return gulp.src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/assets/css/'))
        .pipe(browserSync.stream());

});

gulp.task('sass:prod', function () {

    return gulp.src('./src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./public/assets/css/'));


});

gulp.task('develop', ['webpack:dev', 'sass:dev'], function () {
    
    browserSync.init({
        proxy   : "71pictures.localhost"
    });

    gulp.watch('./src/js/**/*.js', ['webpack:dev']);
    gulp.watch('./src/scss/**/*.scss', ['sass:dev']);

})
