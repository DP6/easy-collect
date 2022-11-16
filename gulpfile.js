const { src, dest, series } = require('gulp');
const concat = require('gulp-concat');
const beautify = require('gulp-beautify');
const include = require('gulp-include');
const strip = require('gulp-strip-comments');
const replace = require('gulp-replace');

const buildGTMModules = () =>
  src(['./core/modules/*.js', './gtm/modules/*js'])
    .pipe(replace(/module.exports[a-z-A-Z.]*\s*=\s*([a-zA-Z\-_]+;|([a-zA-Z\-_:.={},\n\s]+);+)/g, ''))
    .pipe(concat('gtm-modules.js'))
    .pipe(
      beautify({
        indent_size: 2,
        max_preserve_newlines: 2,
      })
    )
    .pipe(strip())
    .on('error', console.error)
    .pipe(dest('./tmp'));

const buildGTM = () =>
  src('./gtm/main.js')
    .pipe(replace(/module.exports\s*=\s*[a-zA-Z]+;/g, ''))
    .pipe(
      include({
        hardFail: true,
        includePaths: [__dirname + '/tmp', __dirname + '/gtm'],
      })
    )
    .on('error', console.error)
    .pipe(dest('./build/gtm'));

const clean = async () => {
  const { deleteAsync } = await import('del');
  return deleteAsync(['./tmp']);
};

exports.clean = clean;
exports.buildGTMModules = buildGTMModules;
exports.buildGTM = buildGTM;
exports.default = series(clean, buildGTMModules, buildGTM, clean);
