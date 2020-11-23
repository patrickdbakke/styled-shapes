import './storybook.css';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    options: {
        storySort: {
            order: [
                'Shape',
                'More Examples',
                'Predefined Shapes',
                'Styled System',
            ],
        },
    },
};
