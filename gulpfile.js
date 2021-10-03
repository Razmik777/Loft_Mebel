let preprocessor = "scss";

const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const scss         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/'},
    notify: false,
    online: true
  })
}


function scripts() {
  return src('app/js/app.js')
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js/'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('app/' + preprocessor + '/main.' + preprocessor + ' ', {"allowEmpty": true})
  .pipe(eval(preprocessor)())
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleancss(( { level: { 1: { specialComments: 0 } }, format: 'beutify' })))
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream())
}

function images() {
  return src('app/images/**/*')
  .pipe(newer('app/dest/images/'))
  .pipe(imagemin())
  .pipe(dest('app/dest/images/'))
}

function cleanimg() {
  return del('app/dest/images/**/*', { force: true })
}

function cleandist() {
  return del('dist/**/*', { force: true })
}

function buildcopy() {
  return src([
    'app/css/**/*.min.css',
    'app/js/**/*.min.js',
    'app/dest/images/**/',
    'app/**/*.html',
    ], { base : 'app'})
   .pipe(dest('dist'));
}

function startwatch(){
  watch('app/**/' + preprocessor + '/**/*', styles);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/*.html').on('change', browserSync.reload);
  watch('app/dest/images/**/', images);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.build       = series(cleandist, styles, scripts, images, buildcopy);

exports.start       = parallel(styles, scripts, browsersync, startwatch);

const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
