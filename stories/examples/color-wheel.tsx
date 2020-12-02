import Flex from '@chakra-ui/core/dist/Flex';
import React from 'react';
import { Shape } from '../../src/shape';
import { heptagon } from '../../src/predefined-shapes';
export const ColorWheel: React.FC = () => {
    return (
        <Shape
            path={heptagon}
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,.5)"
            overflow="hidden"
            background="conic-gradient(red, yellow, lime, aqua, blue, magenta, red)"
            boxShadow="0 0 .25em rgba(0,0,0,.5)"
        >
            <Flex textAlign="center" fontSize=".5em">
                Color wheel!
            </Flex>
        </Shape>
    );
};
