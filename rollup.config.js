import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';

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
        typescript(),
        babel({
            extensions,
            babelHelpers: 'bundled',
            include: ['src/**/*'],
        }),
    ],
    external: ['react', 'react-dom', 'styled-system'],
};

export default config;
