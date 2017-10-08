// Dependencies
const gulp = require('gulp')
const gulpif = require('gulp-if')
const argv = require('yargs').argv
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const nodemon = require('gulp-nodemon')
const dotenv = require('dotenv').config()
const browserSync = require('browser-sync')
const reload = browserSync.reload

// SASS
gulp.task('sass', function() {
  return gulp.src('public/css/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('public/css'))
    .pipe(reload({stream:true}))
})

// Browser Sync
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
    proxy: "http://localhost:" + process.env.PORT,
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
        margin: '0px',
        padding: '5px',
        position: 'fixed',
        fontSize: '10px',
        zIndex: '9999',
        borderRadius: '5px 0px 0px',
        color: 'white',
        textAlign: 'center',
        display: 'block',
        backgroundColor: 'rgba(0,0,0,.4)'
      }
    }
  })
})

// Watch
gulp.task('default', ['sass', 'browser-sync'], function() {
	gulp.watch("public/css/sass/**/*.scss", ['sass'])
	gulp.watch(["public/js/**/*.js", "public/img/**", "views/**/**/*.handlebars"], reload)
})

// Nodemon
gulp.task('nodemon', function (cb) {
	var called = false
	return nodemon({script: 'server.js'}).on('start', function() {
		if (!called) {
			called = true
			cb()
		}
	})
})
