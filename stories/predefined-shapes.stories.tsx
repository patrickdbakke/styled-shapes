import React from 'react';
import { Shape, ShapeProps } from '../src/shape';
import * as predefinedShapes from '../src/predefined-shapes';

const shapes = Object.keys(predefinedShapes).filter(
    (k) => typeof predefinedShapes[k] === 'string',
);
export default {
    title: 'Predefined Shapes',
    component: Shape,
    argTypes: {
        path: {
            control: {
                type: 'select',
                options: shapes,
            },
            defaultValue: shapes[Math.floor(Math.random() * shapes.length)],
        },
    },
};

export const PredefinedShapes = ({ path, ...args }: ShapeProps) => {
    return (
        <Shape
            path={predefinedShapes[path]}
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,.5)"
            overflow="hidden"
            background="conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
            boxShadow="0 0 .25em rgba(0,0,0,.5)"
            {...args}
        >
            Text
        </Shape>
    );
};
