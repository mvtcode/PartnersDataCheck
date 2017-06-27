var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-cssnano');
var reactmin = require('gulp-jsmin');
var jsmin = require('gulp-uglify');
// var jsmin = require('gulp-minify');

// Default Task
//gulp.task('default', ['sass', 'js', 'react', 'watch']);
gulp.task('default', ['watch']);

gulp.task('rebuild', ['sass', 'js', 'react', 'css']);

// Compile Our Sass
gulp.task('sass', () => {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass())
		.pipe(minifyCss({ zindex: false }))
		// .pipe(rename({suffix: '.min'}))
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest('public/css/'))
		.pipe(livereload());
});

// Compile Our css
gulp.task('css', () => {
	return gulp.src('assets/css/*.css')
		.pipe(minifyCss({ zindex: false }))
		// .pipe(rename({suffix: '.min'}))
		.pipe(concat('plugin.min.css'))
		.pipe(gulp.dest('public/css/'))
		.pipe(livereload());
});

// Compile Our javascript
gulp.task('js', () => {
	return gulp.src(['assets/script/**/*.js'])
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js/'))
		.pipe(livereload());
});

// Compile Our react
gulp.task('react', () => {
	return gulp.src('assets/react/**/*.js')
		.pipe(reactmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js/'))
		.pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(['assets/scss/**/*.scss'], ['sass']);
	gulp.watch(['assets/css/**/*.css'], ['css']);
	gulp.watch(['assets/script/**/*.js'], ['js']);
	gulp.watch(['assets/react/**/*.js'], ['react']);
});