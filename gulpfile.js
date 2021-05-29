const { src, dest, parallel, series, watch } = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/'}
  })
}


function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'app/js/app.js',
  ])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js/'))
  .pipe(browserSync.stream())
}

function styles() {
  return src('app/sass/main.sass')
  .pipe(sass())
  .pipe(concat('app.min.css'))
  .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(cleancss(( { level: {1: { specialComments: 0} }, format: 'beutify' })))
  .pipe(dest('app/css/'))
  .pipe(browserSync.stream())
}

function images() {
  return src('Images/**/*')
  .pipe(newer('images/dest/'))
  .pipe(imagemin())
  .pipe(dest('images/dest/'))
}

function cleanimg() {
  return del('images/dest/**/*', { force: true })
}

function cleandist() {
  return del('dist/**/*', { force: true })
}


function startwatch(){
  watch(styles);
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  watch('app/**/*.html').on('change', browserSync.reload)
  watch('images/**/*', images);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;

exports.default     = parallel(styles, scripts, browsersync, startwatch);
