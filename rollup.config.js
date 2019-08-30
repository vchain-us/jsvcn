import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import minify from 'rollup-plugin-babel-minify';

export default {
	input: './index.js',
	output: {
		file: './dist/jsvcn.min.js',
		name: 'jsvcn',
		format: 'iife',
		compact: true,
		external: ['ethers']
	},
	plugins: [
		babel({
			runtimeHelpers: true
		}),
		json({
			compact: true
		}),
		minify({
		})
	]
}