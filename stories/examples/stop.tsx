import Flex from '@chakra-ui/core/dist/Flex';
import React from 'react';
import { Shape } from '../../src/shape';
import { octagon } from '../../src/predefined-shapes';
export const Stop: React.FC = () => {
    return (
        <Shape
            path={octagon}
            background="#CF242F"
            border="3px solid white"
            fontFamily="sans-serif"
            margin=".5em"
            width="2em"
            height="2em"
            overflow="hidden"
            color="white"
            display="flex"
            flexDirection="column"
            boxShadow="inset 0 0 10px 3px black, 0 0 3px 3px black"
        >
            <Flex>STOP</Flex>
            <Flex fontSize="14px">(this is html)</Flex>
        </Shape>
    );
};
