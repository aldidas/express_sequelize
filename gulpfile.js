'use strict';

const paths = {
	src: {
		sass: './app/client/sass/style.scss',
		allsass: './app/client/sass/**/*.scss',
		js: './app/client/js/app.js',
		img: './app/client/img/**/*',
		partials: './app/client/partials/**/*.html',
		index: './app/client/index.hbs',
		version: {
			js: 'public/js/app.min.js',
			css: 'public/css/style.min.css'
		}
	},
	dest: {
		public: 'public',
		dist: 'public/dist',
		js: 'public/js',
		css: 'public/css',
		img: 'public/img',
		partials: 'public/partials'
	}
};

let fs = require('fs'),
	gulp = require('gulp'),
	browserify = require('browserify'),
	ngannotate = require('gulp-ng-annotate'),
	handlebars = require('gulp-compile-handlebars'),
	jshint = require('gulp-jshint'),
	rev = require('gulp-rev'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	transform = require('vinyl-transform'),
	through2 = require('through2'),
	notify = require('gulp-notify');	

const handlebarOpts = {
	helpers: {
		assetPath: function(path, context) {
			return ['/dist', context.data.root[path]].join('/');
		}
	}
};

gulp.task('style', ['script'], () => {
	return gulp.src(paths.src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass({ 
			style: 'expanded' 
		}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(rename({ 
			suffix: '.min' 
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('../dist'))
		.pipe(gulp.dest(paths.dest.css))
		.pipe(notify({
			message: 'style task completed.'
		}));
});

gulp.task('script', () => {
	return gulp.src(paths.src.js)
		.pipe(through2.obj((file, enc, next) => {
			browserify(file.path)
				.transform('stripify')
				.bundle((err, res) => {
					if(err) {
						console.log(err);
					}
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(jshint())
		.pipe(sourcemaps.init())
		.pipe(rename({ 
			suffix: '.min'
		}))
		.pipe(ngannotate())
		.pipe(uglify())
		.pipe(sourcemaps.write('../dist'))
		.pipe(gulp.dest(paths.dest.js))
		.pipe(notify({
			message: 'script task completed.'
		}));
});

gulp.task('img', () => {
	return gulp.src(paths.src.img)
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(paths.dest.img))
		.pipe(notify({
			message: 'img task completed.'
		}));
});

gulp.task('html', () => {
	return gulp.src(paths.src.partials)
		.pipe(gulp.dest(paths.dest.partials))
		.pipe(notify({
			message: 'html task completed.'
		}));
});

gulp.task('version', ['style', 'script'], () => {
	return gulp.src([paths.src.version.js, paths.src.version.css])
		.pipe(rev())
		.pipe(gulp.dest(paths.dest.dist))
		.pipe(rev.manifest({
			base: paths.dest.public,
			merge: true
		}))
		.pipe(gulp.dest(paths.dest.dist))
		.pipe(notify({
			message: 'version task completed.'
		}));
});

gulp.task('index', ['version'], () => {
	var manifest = JSON.parse(fs.readFileSync('public/rev-manifest.json', 'utf8'));
	return gulp.src(paths.src.index)
		.pipe(handlebars(manifest, handlebarOpts))
		.pipe(rename('index.html'))
		.pipe(gulp.dest(paths.dest.public))
		.pipe(notify({
			message: 'index task completed.'
		}));
});

gulp.task('clean', () => {
	return del(['public/**/*']);
});

gulp.task('default', ['clean'], () => {
	gulp.start('style', 'script', 'img', 'html', 'version', 'index');
});