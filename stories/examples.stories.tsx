import Flex from '@chakra-ui/core/dist/Flex';
import * as React from 'react';
import * as predefinedShapes from '../src/predefined-shapes';
import { Shape } from '../src/shape';

export default {
    title: 'More Examples',
    component: Shape,
};

const Moon = () => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <Shape
            width="2em"
            height="2em"
            path={predefinedShapes.moon}
            background={
                hovered
                    ? 'linear-gradient(to right, #ffefba, #ffffff)'
                    : 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
            }
            boxShadow={
                hovered
                    ? '0 0 10px 3px rgba(0,7,15,.25), 0 0 25px 25px rgba(255, 239, 186, 1)'
                    : '0 0 10px 3px rgba(155,155,75,.5), 0 0 25px 25px rgba(15, 32, 39, .75)'
            }
            margin=".5em"
            onMouseEnter={() => {
                setHovered(true);
            }}
            onMouseLeave={() => {
                setHovered(false);
            }}
        />
    );
};

export const MoreExamples = () => {
    return (
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
            <Shape
                path={predefinedShapes.star}
                background="blue"
                border="3px solid yellow"
                boxShadow="0 0 4px 2px blue,0 0 4px 6px yellow,0 0 4px 10px blue, 0 0 4px 14px yellow"
                margin=".5em"
            />
            <Shape
                width="2.5em"
                height="2em"
                path="M 0 .75 A .5 .75 0 0 1 1 .75 L .75 .75 A .2 .3 0 1 0 .25 .75"
                background="radial-gradient(
                at bottom center, 
                red 35%, 
                red 40%, 
                orange 42%, 
                orange 46%, 
                yellow 48%,
                yellow 52%,
                green 54%,
                green 58%,
                blue 60%,
                blue 64%,
                indigo 66%,
                indigo 70%,
                violet 72%);"
                backgroundSize="2.5em 1.5em"
                boxShadow="0 0 5px 3px rgba(0,0,0,.5), 0 0 15px 5px rgba(0,0,0,.25)"
                margin=".1em"
            />
            <Moon />
            <Shape
                path={predefinedShapes.octagon}
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
            <Shape
                path="M442.272,405.728c-11.136-8.8-24.704-15.136-39.424-18.208l-70.176-14.08  C325.312,372,320,365.408,320,357.76v-18.24c69.92-6.688,80-20.96,80-35.52c0-43.04-28.608-142.976-33.312-159.232  c-0.608-25.12-5.184-39.232-16.672-51.616c-8.128-8.8-20.096-10.848-29.728-12.48c-3.776-0.672-8.992-1.536-10.912-2.592  c-17.056-9.216-33.92-13.696-54.048-14.08c-42.144,1.728-93.952,28.544-111.68,77.568C142.368,146.144,112,254.368,112,304  c0,20.704,23.392,31.616,80,36.608v17.152c0,7.648-5.344,14.24-12.736,15.68l-70.24,14.08c-14.624,3.104-28.192,9.376-39.296,18.176  c-3.456,2.784-5.632,6.848-5.984,11.264s1.12,8.736,4.096,12.032C115.648,481.76,184.224,512,256,512s140.384-30.24,188.16-83.008  c2.976-3.296,4.48-7.648,4.096-12.064C447.904,412.544,445.728,408.48,442.272,405.728z"
                background="#55646E"
                margin=".5em"
                width="2em"
                height="2em"
                overflow="hidden"
                color="white"
                display="flex"
                fontFamily="sans-serif"
                flexDirection="column"
                boxShadow="0 0 3px 3px rgba(0,0,0,.5)"
            >
                <Flex position="relative" top="53px" fontSize="18px">
                    My Name
                </Flex>
            </Shape>
            <Shape
                path={predefinedShapes.heptagon}
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
        </Flex>
    );
};
