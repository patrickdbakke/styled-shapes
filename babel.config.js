const BABEL_ENV = process.env.BABEL_ENV;
const isCommonJS = BABEL_ENV !== undefined && BABEL_ENV === 'cjs';
const isESM = BABEL_ENV !== undefined && BABEL_ENV === 'esm';

module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: ['@babel/plugin-proposal-class-properties'],
};
