import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
	input: './cli.js',
	output: {
		file: './dist/cli.js',
		name: 'jsvcn',
		format: 'umd',
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