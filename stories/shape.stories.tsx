import * as React from 'react';
import { Shape, ShapeProps } from '../src/shape';

export default {
    title: 'Shape',
    component: Shape,
    argTypes: {
        path: {
            control: 'text',
            defaultValue:
                'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z',
        },
    },
};

const ShapeStory = (args: Omit<ShapeProps, 'path'>) => {
    return (
        <Shape
            path="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            background="red"
            {...args}
        />
    );
};
export { ShapeStory as Shape };
