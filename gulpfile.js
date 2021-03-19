'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const beautify = require('gulp-beautify');
const include = require('gulp-include');
const strip = require('gulp-strip-comments');
const del = require('del');
const replace = require('gulp-replace');

gulp.task('gtm-modules', () =>
  gulp.src(['./core/modules/*.js', './gtm/modules/*js'])
    .pipe(replace(/module.exports[a-z-A-Z.]*\s*=\s*([a-zA-Z\-_]+;|([a-zA-Z\-_:.={},\n\s]+);+)/g, ''))
    .pipe(concat('gtm-modules.js'))
    .pipe(beautify({
      indent_size: 2,
      max_preserve_newlines: 2
    }))
    .pipe(strip())
    .on('error', console.error)
    .pipe(gulp.dest('./tmp'))
);

gulp.task('build-gtm', () =>
  gulp.src('./gtm/main.js')
    .pipe(replace(/module.exports\s*=\s*[a-zA-Z]+;/g, ''))
    .pipe(include({
      hardFail: true,
      includePaths: [
        __dirname + '/tmp',
        __dirname + '/gtm',
      ]
    }))
    .on('error', console.error)
    .pipe(gulp.dest('./build/gtm'))
);

gulp.task('clean', () => del(['./tmp']));

gulp.task('default', gulp.series(['clean', 'gtm-modules', 'build-gtm', 'clean']));
