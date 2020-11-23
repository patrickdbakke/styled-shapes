module.exports = {
    stories: [
        '../stories/**/*.stories.mdx',
        '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) => true,
        compilerOptions: {
            allowSyntheticDefaultImports: true,
            esModuleInterop: true,
        },
    },
};
