import { Flex } from '@chakra-ui/core';
import { render } from '@testing-library/react';
import * as React from 'react';
import { octagon } from './predefined-shapes';
import { Shape } from './shape';

const oneTick = () => new Promise((resolve) => setTimeout(resolve));
describe('the svg path', () => {
    describe('shape 1 (stop sign)', () => {
        beforeEach(async () => {
            render(
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
                    data-testid="shape"
                    boxShadow="inset 0 0 10px 3px black, 0 0 3px 3px black"
                >
                    <Flex fontSize="14px">this is html</Flex>
                </Shape>,
            );
            await oneTick();
        });
        it('should match the snapshot', () => {
            expect(document.body).toMatchSnapshot();
        });
    });
    describe('shape 2 (hexagon)', () => {
        beforeEach(async () => {
            render(
                <Shape
                    path="M0.5 1L0.9330127018922193 0.75 0.9330127018922193 0.75 0.9330127018922193 0.25 0.5 0 0.0669872981077807 0.25 0.0669872981077807 0.75 0.5 1Z"
                    background="radial-gradient(#fff, #ddd, #999, #aaa)"
                    border="1px solid black"
                    boxShadow=".05em .05em .125em 3px rgba(0,0,0,.5), .125em .125em .5em rgba(0,0,0,.5)"
                    margin=".5em"
                />,
            );
            await oneTick();
        });
        it('should match the snapshot', () => {
            expect(document.body).toMatchSnapshot();
        });
    });
});
