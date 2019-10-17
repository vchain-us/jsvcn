import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: './index.js',
	output: {
		file: './dist/jsvcn.min.js',
		name: 'Jsvcn',
		format: 'iife',
		compact: true,
		external: ['ethers']
	},
	plugins: [
		babel({
			runtimeHelpers: true,
			externalHelpers: true,
		}),
		nodeResolve({
			jsnext: true,
			main: true
		}),
		commonjs({

		}),
		json({
			compact: true
		}),
		minify({
			comments: false
		})
	]
}