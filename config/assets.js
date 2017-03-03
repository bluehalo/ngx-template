'use strict';

module.exports = {
	// Build related items
	build: {
		js: [ 'gulpfile.js', 'config/assets.js' ]
	},

	// Test files
	tests: {
		js: [ ]
	},

	// Source files and directories
	src: {
		allTs: [ 'src/**/*.ts' ],
		ts: [ 'src/**/*.ts', '!src/demo/**/*.ts' ],
		aot: [ 'aot/**', '!{aot/demo,aot/demo/**}' ]
	},

	// Distribution related items
	dist: {
		dir: 'dist',
		bundleDir: 'dist/bundles'
	}
};
