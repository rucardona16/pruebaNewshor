var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh = require('shelljs');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep').stream;
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');


var paths = {
  dev: './_dev',
  dev_index: './_dev/index.html',
  js: ['./_dev/app/**/*.js'],
  css: ['./_dev/css/*.min.css'],
  sass: ['!./scss/general/**/*', 'scss/**/**/*.scss', '!scss/main.scss', '!scss/**/**/_media*.scss'],
  sass_main: 'scss/main.scss',
  only_sass: 'scss/**/*.scss',
  dist: '../src/main/resources/public'
}

/**
 * Task for run a server in web browser
 */
gulp.task('server', function () {
  gulp.src(paths.dist)
    .pipe(webserver({
      host: '0.0.0.0',
      port: 9080,
      livereload: true
    }))
});

/**(1)
 * Task for nove html views in a final production package.
 */
gulp.task('move', function(){
  gulp.src(['_dev/app/**/*.html'], { relative: true})
    //.pipe(gulp.dest('./dist/app'));
    .pipe(gulp.dest(paths.dist+'/app'));
  gulp.src(['_dev/img/**/*.png', '_dev/img/**/*.jpg'], { relative: true})
    .pipe(gulp.dest(paths.dist+'/img'));
});


/**(2)
 * Task for generate the compilation and minification of files in only one archive for css and js.
 */
gulp.task('useref', function (done) {
  gulp.src('./_dev/*.html')
    .pipe(useref())
    /*.pipe(gulpif('*.js', uglify()))*/
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest(paths.dist))
    .on('end', done);
});


/**
 * Task for inject the js bower_components dependencies in the index.html
 */
gulp.task('wiredep', function () {
  gulp.src(paths.dev_index)
    .pipe(wiredep({}))
    .pipe(gulp.dest(paths.dev));
});

/**
 * Task for generate a final production package.
 */
gulp.task('build', ['sass', 'move'], function() {
  gulp.start(['inject', 'wiredep', 'useref']);
});


/**
 * Task for inject the js and css features dependencies in the index.html
 */
gulp.task('inject', ['imports', 'wiredep', 'sass'], function () {
  gulp.src(paths.dev_index)
    .pipe(inject(gulp.src(paths.js).pipe(angularFilesort()), { relative: true }
    ))
    .pipe(inject(gulp.src(paths.css, { read: false }), { relative: true }
    ))
    .pipe(gulp.dest(paths.dev));
});

/**
 * Task for inject a sass files imports in the main sass file, between two tags especific.
 */
gulp.task('imports', function () {
  var sources = gulp.src(paths.sass);
  var target = gulp.src(paths.sass_main);
  return target.pipe(inject(sources, {
    starttag: '/* inject:imports */',
    endtag: '/* endinject */',
    relative: true,
    transform: function (filepath) {
      return '@import "' + filepath + '";';
    }
  }))
    .pipe(gulp.dest('./scss'));
});

/**
 * Task for listen changes in files and execute another tasks.
 */
gulp.task('watch', ['build'], function () {
  watch(paths.sass, function () {
    gulp.start('sass', 'build');
  });
});

/**
 * Task for processing a sass code and generate a css file.
 */
gulp.task('sass',['imports'], function (done) {
  gulp.src(paths.only_sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(sass(
      {
        sourceComments: true,
        outputStyle: 'expanded'
      }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./_dev/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./_dev/css/'))
    .on('end', done);
});

/**
 * Task for inject the css bower_components dependencies in the main.scss
 */
gulp.task('wiredep:sass', function () {
  gulp.src(paths.sass_main)
    .pipe(wiredep({}))
    .pipe(gulp.dest('./scss'));
});



/**
 * Git gulp default
 */
gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

/**
 * Git gulp default
 */
gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/**
 * Task for excecute default command gulp
 */
//gulp.task('default',['watch', 'server']);
gulp.task('default',['watch']);