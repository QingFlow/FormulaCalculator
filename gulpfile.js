var gulp = require("gulp");
var ts = require("gulp-typescript");
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
  scripts: {
    src: 'src/**/*.ts',
    dest: 'dist/'
  }
};

function clean() {
  return del(['dist/*']);
}

function script() {
  return gulp.src(paths.scripts.src)
    .pipe(ts())
    // .pipe(uglify())
    // .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function watchScripts() {
  gulp.watch(paths.scripts.src, build);
}

var build = gulp.series(clean, script);
var watch = gulp.series(build, watchScripts);

exports.build = build;
exports.watch = watch;
exports.default = watch;