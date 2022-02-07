import Flex from '@chakra-ui/core/dist/Flex';
import React from 'react';
import * as predefinedShapes from '../src/predefined-shapes';
import { Shape } from '../src/shape';

import { Rainbow } from './examples/rainbow';
import { Moon } from './examples/moon';
import { Stop } from './examples/stop';
import { User } from './examples/user';
import { ColorWheel } from './examples/color-wheel';

export default {
    title: 'More Examples',
    component: Shape,
};

export const MoreExamples = () => {
    return (
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
            <Shape
                path="M1.1547005383792517 0.5L0.8660254037844388 1 0.8660254037844388 1 0.2886751345948129 1 0 0.5 0.2886751345948129 0 0.8660254037844388 0 1.1547005383792517 0.5Z"
                background="radial-gradient(#fff, #ddd, #999, #aaa)"
                border="1px solid black"
                boxShadow=".05em .05em .125em 3px rgba(0,0,0,.5), .125em .125em .5em rgba(0,0,0,.5)"
                margin=".5em"
            />
            <Shape
                path="M0.5 1L0.9330127018922193 0.75 0.9330127018922193 0.75 0.9330127018922193 0.25 0.5 0 0.0669872981077807 0.25 0.0669872981077807 0.75 0.5 1Z"
                background="radial-gradient(#fff, #ddd, #999, #aaa)"
                border="1px solid black"
                boxShadow=".05em .05em .125em 3px rgba(0,0,0,.5), .125em .125em .5em rgba(0,0,0,.5)"
                margin=".5em"
            />
            <Shape
                path="M1 0.34641016151377546L0.8 0.6928203230275509 0.8 0.6928203230275509 0.4 0.6928203230275509 0 0.6928203230275509 0.2 0.34641016151377546 0.4 0 0.6000000000000001 0.34641016151377546 0.8 0 1 0.34641016151377546Z"
                background="#eee"
                border="1px solid black"
                boxShadow="inset .05em .05em .125em 3px rgba(255,0,0,.5), inset -.05em -.05em .125em 3px rgba(0,0,255,.5), 0 0 3px 3px rgba(0,0,0,.5)"
                margin=".5em"
            />
            <Shape
                path={predefinedShapes.star}
                background="blue"
                border="3px solid yellow"
                boxShadow="0 0 4px 2px blue,0 0 4px 6px yellow,0 0 4px 10px blue"
                margin=".5em"
            />
            <Rainbow />
            <Moon />
            <Stop />
            <User />
            <ColorWheel />
        </Flex>
    );
};
