import Box from '@chakra-ui/core/dist/Box';
import React from 'react';
import svgpath from 'svgpath';
import { useRef } from '../hooks/use-ref';
import { parseBorder, pathToBorder } from '../utils/parse-border';

export type SVGBorderProps = {
    border?: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
    path: typeof svgpath;
};

export const SVGBorder: React.FC<SVGBorderProps> = ({
    path,
    border = 'none',
    borderTop = border,
    borderRight = border,
    borderBottom = border,
    borderLeft = border,
    ...props
}: SVGBorderProps) => {
    const b = {
        border,
        borderTop,
        borderRight,
        borderLeft,
        borderBottom,
    };
    const ref = useRef<HTMLElement>(null);
    const elem = document.createElement('div');
    elem.style.position = 'fixed';
    elem.style.top = '-1000em';
    const parseUnits = (str: string) => {
        elem.style.left = str;
        return parseFloat(window.getComputedStyle(elem).left);
    };

    const paths = React.useMemo(() => {
        if (!ref.current) {
            return [];
        }

        const sides = pathToBorder(path);
        ref.current.appendChild(elem);
        const fs = parseFloat(window.getComputedStyle(elem).fontSize);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const paths: React.ReactNode[] = sides
            .map((side) => {
                const name = `border${side.name}` as keyof typeof b;
                const sideBorder = parseBorder(b[name] || border || '');
                const { size, /* style, */ color } = sideBorder; // todo: border style
                if (
                    !size ||
                    size === 'none' ||
                    (size.indexOf('0') === 0 && size.indexOf('.') !== 1)
                ) {
                    return null;
                }
                const width = parseUnits(sideBorder.size) / fs / 2;
                return (
                    <path
                        key={name}
                        d={side.paths.join(' ')}
                        stroke={color}
                        fill="transparent"
                        strokeWidth={`${width}px`}
                    />
                );
            })
            .filter(Boolean);
        ref.current.removeChild(elem);
        return paths;
    }, [path, border, ref]);

    return (
        <Box
            ref={ref}
            pointerEvents="none"
            margin="auto"
            position="absolute"
            top="50%"
            left="50%"
            transform="translateX(-50%) translateY(-50%)"
            zIndex={3}
            width="100%"
            height="100%"
            {...props}
        >
            {paths.length > 0 && (
                <svg
                    height="100%"
                    width="100%"
                    viewBox="0 0 1 1"
                    fill="transparent"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {paths}
                </svg>
            )}
        </Box>
    );
};
