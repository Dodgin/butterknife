//'use strict';

var gulp = require('gulp');
//var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var scss = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var merge = require('merge-stream');
var gulpif = require('gulp-if');

var paths = {
  scripts: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/vue/dist/vue.min.js',
      'node_modules/vue-context-menu/vue-context-menu.js',
      'node_modules/angular/angular.min.js',
      'UI/assets/js/bootstraps_bootstraps.js',
      'UI/assets/js/angular/**/*.js',
  ],
  scss: ['UI/assets/scss/**/*.scss']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});

// SCSS
gulp.task('scss', ['clean'], function() {
    return gulp.src(paths.scss)
        .pipe(scss().on('error', scss.logError))
        .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('UI/build/css'));
});

// JS
gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
      .pipe(sourcemaps.init())
      .pipe(gulpif('!**/*.min.js', uglify({mangle: true})))
      .pipe(concat('app.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('UI/build/js'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.scss, ['scss'])
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'scss']);
