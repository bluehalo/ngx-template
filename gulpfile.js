'use strict';

let
	chalk = require('chalk'),
	del = require('del'),
	glob = require('glob'),
	gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	merge = require('merge2'),
	path = require('path'),
	ngc = require('gulp-ngc'),
	rollup = require('rollup'),
	runSequence = require('run-sequence'),
	webpack = require('webpack'),
	webpackDevServer = require('webpack-dev-server'),

	plugins = gulpLoadPlugins(),
	pkg = require('./package.json'),
	assets = require('./config/assets');


// Banner to append to generated files
let bannerString = '/*! ' + pkg.name + '-' + pkg.version + ' - ' + pkg.copyright + '*/';

/**
 * ENV Tasks
 */
let BUILD = false;
gulp.task('env:BUILD', () => {
	BUILD = true;
});

let AOT = false;
gulp.task('env:AOT', () => {
	AOT = true;
});

/**
 * Validation Tasks
 */

gulp.task('validate-ts', () => {

	return gulp.src(assets.src.allTs)
		// Lint the Typescript
		.pipe(plugins.tslint({
			formatter: 'prose'
		}))
		.pipe(plugins.tslint.report({
			summarizeFailureOutput: true,
			emitError: BUILD
		}));

});

/**
 * Build
 */

// Clean all
gulp.task('clean', () => {
	return del(['src/**/*.ngfactory.ts', 'src/**/*.ngstyle.ts', 'src/**/*.ngsummary.json', 'build', 'dist', 'aot'])
});

gulp.task('ngc', () => {
	return ngc('tsconfig.json');
});

gulp.task('aot-dist', ['ngc'], () => {
	return gulp.src(assets.src.aot, { base: './aot' })
		.pipe(gulp.dest(assets.dist.dir));
});

// Build JS from the TS source
let tsProject = plugins.typescript.createProject(path.resolve('./tsconfig.json'));
gulp.task('build-ts', () => {

	let tsResult = gulp.src(assets.src.ts, { base: './src' })
		.pipe(plugins.sourcemaps.init())
		.pipe(tsProject());

	return merge([
			tsResult.js
				.pipe(plugins.sourcemaps.write('./'))
				.pipe(gulp.dest(assets.dist.dir)),
			tsResult.dts.pipe(gulp.dest(assets.dist.dir))
		]).on('error', plugins.util.log);

});

// Bundle the generated JS (rollup and then uglify)
gulp.task('build-js', ['rollup-js'], () => {

	// Uglify
	return gulp.src(path.join(assets.dist.bundleDir, (pkg.artifactName + '.js')))
		.pipe(plugins.uglify({ preserveComments: 'license' }))
		.pipe(plugins.rename(pkg.artifactName + '.min.js'))
		.pipe(gulp.dest(assets.dist.bundleDir));

});

// Rollup the generated JS
gulp.task('rollup-js', () => {

	return rollup.rollup({
			entry: path.join(assets.dist.dir, '/index.js'),
			external: [
				'@angular/core'
			],
			onwarn: (warning) => {
				if ('THIS_IS_UNDEFINED' === warning.code) {
					return;
				}
				plugins.util.log(warning.message);
			}
		})
		.then((bundle) => {
			return bundle.write({
				dest: path.join(assets.dist.bundleDir, (pkg.artifactName + '.js')),
				format: 'umd',
				moduleName: 'angular2Template',
				sourceMap: true,
				banner: bannerString,
				globals: {
					'@angular/core': 'ng.core'
				}
			});
		});

});


/**
 * Develop
 */
gulp.task('webpack-dev-aot-server', (done) => {
	// Start a webpack-dev-server
	let webpackConfig = require(path.resolve('./config/webpack.aot.config.js'))();
	let compiler = webpack(webpackConfig);

	new webpackDevServer(compiler, {
		stats: {
			colors: true,
			chunks: false
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
	}).listen(9000, 'localhost', (err) => {
		if(err) throw new plugins.util.PluginError('webpack', err);

		// Server listening
		plugins.util.log('[webpack]', 'http://localhost:9000/webpack-dev-server/index.html');
	});
});


gulp.task('webpack-dev-jit-server', (done) => {
	// Start a webpack-dev-server
	let webpackConfig = require(path.resolve('./config/webpack.jit.config.js'))();
	let compiler = webpack(webpackConfig);

	new webpackDevServer(compiler, {
		stats: {
			colors: true,
			chunks: false
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
	}).listen(9000, 'localhost', (err) => {
		if(err) throw new plugins.util.PluginError('webpack', err);

		// Server listening
		plugins.util.log('[webpack]', 'http://localhost:9000/webpack-dev-server/index.html');
	});
});

gulp.task('watch-ts', () => {
	gulp.watch(assets.src.allTs, ['validate-ts']);
});

/**
 * --------------------------
 * Main Tasks
 * --------------------------
 */

gulp.task('dev', (done) => { runSequence('validate-ts', [ 'webpack-dev-jit-server', 'watch-ts' ], done); } );

gulp.task('dev-aot', (done) => { runSequence('env:AOT', 'clean', 'ngc', [ 'webpack-dev-aot-server', 'watch-ts' ], done); } );

gulp.task('build', (done) => { runSequence('env:BUILD', 'validate-ts', 'build-ts', 'build-js', done); } );

gulp.task('build-aot', (done) => { runSequence('env:BUILD', 'env:AOT', 'clean', 'validate-ts', 'aot-dist', 'build-js', done); });

// Default task builds
gulp.task('default', [ 'build' ]);
