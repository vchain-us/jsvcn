import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: './index.js',
	output: [
		{
			file: 'dist/jsvcn.cjs.js',
			format: 'cjs'
		},
		{
			file: 'dist/jsvcn.esm.js',
			format: 'esm'
		},
		{
			file: 'dist/jsvcn.umd.js',
			format: 'umd',
			name: 'Jsvcn'
		},
	],
	plugins: [
		babel({
			// runtimeHelpers: true
		}),
		resolve({browser: true}),
		commonjs(),
		json({
			compact: true
		})
	]
}