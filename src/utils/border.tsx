import Box from '@chakra-ui/core/dist/Box';
import React from 'react';
import svgpath from 'svgpath';
import { splitSpaces } from './split';
import { useRef } from './use-ref';

export type Border = {
    size: string;
    style: string;
    color: string;
};
export type Position = {
    x: number;
    y: number;
};

export const parse = (border: string): Border => {
    if (border === 'none' || border === '') {
        return { size: 'none', style: 'solid', color: 'transparent' };
    }
    let size = '0px';
    let style = 'solid';
    let color = 'black';
    const borderParts = splitSpaces(border);
    switch (borderParts.length) {
        case 1:
            [color] = borderParts;
            break;
        case 2:
            [size, style] = borderParts;
            break;
        default:
        case 3:
            [size, style, color] = borderParts;
            break;
    }
    return { size, style, color };
};

export type SVGBorderProps = {
    border?: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
    path: typeof svgpath;
};

type SegmentArray = [
    string,
    number,
    number | undefined,
    number | undefined,
    number | undefined,
];
type Segment = {
    segment: SegmentArray;
    x: number;
    y: number;
};
type BorderSegment = {
    name: string;
    paths: string[];
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
        const segments: Segment[] = [];
        path.iterate((seg, _i, x, y) => {
            const segment = seg as SegmentArray;
            segments.push({
                segment,
                x,
                y,
            });
        });

        const top: BorderSegment = { name: 'Top', paths: [] };
        const right: BorderSegment = { name: 'Right', paths: [] };
        const bottom: BorderSegment = { name: 'Bottom', paths: [] };
        const left: BorderSegment = { name: 'Left', paths: [] };
        const sides: BorderSegment[] = [top, right, bottom, left];

        ref.current.appendChild(elem);
        const fs = parseFloat(window.getComputedStyle(elem).fontSize);
        let next: Segment | null = null;
        let startIndex: number | null = null;
        for (let i = 0; i < segments.length; i++) {
            const { x, y } = segments[i];
            let { segment } = segments[i];
            const [command] = segment;
            if (command.toLowerCase() === 'm') {
                continue;
            }
            if (command.toLowerCase() === 'z') {
                next = segments[startIndex || 0];
                // eslint-disable-next-line no-sparse-arrays
                segment = ['L', next.x, next.y, , ,];
                startIndex = null;
            } else {
                if (command !== 'M') {
                    next = segments[i + 1];
                }
                if (startIndex === null) {
                    startIndex = i;
                }
            }
            if (next) {
                let θ =
                    (Math.sign(next.y - y) *
                        Math.sign(next.x - x) *
                        Math.atan((y - next.y) / (next.x - x)) *
                        180) /
                    Math.PI;
                let side: BorderSegment;
                if (Number.isNaN(θ) || next.x === x) {
                    θ = 180 * Math.sign(next.y - y);
                }
                switch (true) {
                    case θ < 45 && θ > -45 && next.x > x:
                        side = top;
                        break;
                    case θ < 45 && θ > -45 && next.x <= x:
                        side = bottom;
                        break;
                    case !(θ < 45 && θ > -45) && next.y > y:
                        side = right;
                        break;
                    case !(θ < 45 && θ > -45) && next.y <= y:
                        side = left;
                        break;
                    default:
                        side = bottom;
                }
                side.paths.push(['M', x, y, ...segment].join(' '));
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const paths: React.ReactNode[] = sides
            .map((side) => {
                const name = `border${side.name}` as keyof typeof b;
                const sideBorder = parse(b[name] || border || '');
                const { size, /* style, */ color } = sideBorder;
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
