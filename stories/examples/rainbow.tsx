import React from 'react';
import { Shape } from '../../src/shape';
export const Rainbow: React.FC = () => {
    return (
        <Shape
            width="2.5em"
            height="2em"
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
