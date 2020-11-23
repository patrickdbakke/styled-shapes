import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const config = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    watch: {
        include: ['src/**'],
        exclude: ['node_modules/**'],
    },
    plugins: [
        resolve({ extensions }),
        commonjs(),
        babel({
            extensions,
            babelHelpers: 'bundled',
            include: ['src/**/*'],
        }),
    ],
};

export default config;
