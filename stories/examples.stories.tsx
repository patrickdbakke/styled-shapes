import Flex from '@chakra-ui/core/dist/Flex';
import React from 'react';
import * as predefinedShapes from '../src/predefined-shapes';
import { Shape } from '../src/shape';

export default {
    title: 'More Examples',
    component: Shape,
};

const Rainbow: React.FC = () => {
    return (
        <Shape
            width="2.5em"
            height="2em"
            // path="M 0,0 0,1 1,1 1,0 Z"
            path="M 0 1 A .5 .75 0 0 1 1 1 L .75 1 A .2 .33 0 1 0 .25 1"
            background="radial-gradient(
        50% 93% at bottom center, 
        red 56%, 
        red 63%, 
        orange 64%, 
        orange 70%, 
        yellow 71%,
        yellow 77%,
        green 78%,
        green 84%,
        blue 85%,
        blue 91%,
        indigo 92%,
        indigo 100%);"
            backgroundSize="100% 100%"
            boxShadow="0 0 5px 3px rgba(0,0,0,.5), 0 0 15px 5px rgba(0,0,0,.25)"
            margin=".1em"
        />
    );
};
const Moon: React.FC = () => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <Shape
            width="2em"
            height="2em"
            path={predefinedShapes.moon}
            background={
                hovered
                    ? 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
                    : 'linear-gradient(to right, #ffefba, #ffffff)'
            }
            boxShadow={
                hovered
                    ? '0 0 10px 3px rgba(155,155,75,.5), 0 0 25px 25px rgba(15, 32, 39, .75)'
                    : '0 0 10px 3px rgba(0,7,15,.25), 0 0 25px 25px rgba(255, 239, 186, 1)'
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
const Stop: React.FC = () => {
    return (
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
    );
};
const Profile: React.FC = () => {
    return (
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
            border="2px solid red"
            boxShadow="0 0 3px 3px rgba(0,0,0,.5)"
        >
            <Flex position="relative" top="50%" fontSize="18px">
                My Name
            </Flex>
        </Shape>
    );
};
const ColorWheel: React.FC = () => {
    return (
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
    );
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
                boxShadow="0 0 3px 3px rgba(0,0,0,.5)"
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
            <Profile />
            <ColorWheel />
        </Flex>
    );
};
