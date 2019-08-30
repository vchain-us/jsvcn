import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
	input: './index.js',
	output: {
		file: './dist/jsvcn.js',
		name: 'jsvcn',
		format: 'iife',
		compact: true
	},
	plugins: [
		babel({
			runtimeHelpers: true
		}),
		json({
			compact: true
		})
	]
}