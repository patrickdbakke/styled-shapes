import React from 'react';
import { Shape } from '../../src/shape';
import { moon } from '../../src/predefined-shapes';
export const Moon: React.FC = () => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <Shape
            width="2em"
            height="2em"
            path={moon}
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
