import svgpath from 'svgpath';
import { splitSpaces } from './split';

export type SegmentArray = [
    string,
    number,
    number | undefined,
    number | undefined,
    number | undefined,
];
export type Segment = {
    segment: SegmentArray;
    x: number;
    y: number;
};
export type BorderSegment = {
    name: string;
    paths: string[];
};
export type BorderSegments = [
    BorderSegment, // top
    BorderSegment, // right
    BorderSegment, // bottom
    BorderSegment, // left
];
export type Border = {
    size: string;
    style: string;
    color: string;
};

export const parseBorder = (border: string): Border => {
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

export const pathToBorder = (path: typeof svgpath): BorderSegments => {
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
    const sides: BorderSegments = [top, right, bottom, left];

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
    return sides;
};
