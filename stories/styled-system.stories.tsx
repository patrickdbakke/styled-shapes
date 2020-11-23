import * as React from 'react';
import { Shape, ShapeProps } from '../src/shape';

export default {
    title: 'Styled System',
    component: Shape,
    argTypes: {
        path: {
            control: 'text',
            defaultValue:
                'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z',
        },
        background: { control: 'text', defaultValue: '#eee' },
        color: { control: 'text', defaultValue: 'pink' },
        top: { control: 'text', defaultValue: '.5em' },
        left: { control: 'text', defaultValue: '1em' },
        width: { control: 'text', defaultValue: '3em' },
        height: { control: 'text', defaultValue: '4em' },
        border: { control: 'text', defaultValue: null },
        borderTop: { control: 'text', defaultValue: '2px solid teal' },
        borderRight: { control: 'text', defaultValue: '2px solid red' },
        borderLeft: { control: 'text', defaultValue: '2px solid yellow' },
        borderBottom: { control: 'text', defaultValue: '2px solid blue' },
        padding: { control: 'text', defaultValue: null },
        paddingTop: { control: 'text', defaultValue: '2px' },
        paddingRight: { control: 'text', defaultValue: '5px' },
        paddingLeft: { control: 'text', defaultValue: '20px' },
        paddingBottom: { control: 'text', defaultValue: '10px' },
        margin: { control: 'text', defaultValue: null },
        marginTop: { control: 'text', defaultValue: '2px' },
        marginRight: { control: 'text', defaultValue: '5px' },
        marginLeft: { control: 'text', defaultValue: '20px' },
        marginBottom: { control: 'text', defaultValue: '10px' },
        overflow: { control: 'text', defaultValue: 'hidden' },
        boxShadow: {
            control: 'text',
            defaultValue:
                'inset 0 0 3px rgba(0,0,0,.5), 5px 5px 5px rgba(0,0,0,.6)',
        },
    },
};

export const StyledSystem = (args: ShapeProps) => {
    return <Shape {...args}>asdf</Shape>;
};
