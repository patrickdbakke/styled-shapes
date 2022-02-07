import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex';
import md5 from 'md5';
import React from 'react';
import svgpath from 'svgpath';
import { SVGBorder } from './components/border';
import { OncePerPage } from './components/once-per-page';
import { SVGShadow } from './components/shadow';
import { useRef } from './hooks/use-ref';

export type ShapeProps = {
    path: string;
    border?: string;
    borderLeft?: string;
    borderRight?: string;
    borderTop?: string;
    borderBottom?: string;
    boxShadow?: string;
    key?: string | number;
    style?: {
        [key: string]: unknown;
    };
    shapeProps?: {
        width?: string;
        height?: string;
        style?: ShapeProps['style'];
    };
} & FlexProps &
    React.DOMAttributes<HTMLDivElement>;

type ContentSize = {
    width?: string;
    height?: string;
    marginTop?: string;
    marginLeft?: string;
};
export const Shape: React.FC<ShapeProps> = ({
    path = 'M 0,0,0,1,1,1,1,0 Z',
    children,
    color = 'inherit',
    background = 'inherit',
    backgroundImage,
    backgroundSize,
    backgroundColor,
    backgroundPosition,
    backgroundAttachment,
    backgroundRepeat,
    boxShadow,
    width: w,
    height: h,
    top,
    left,
    right,
    bottom,
    border,
    borderTop = border,
    borderRight = border,
    borderBottom = border,
    borderLeft = border,
    padding,
    paddingTop = padding,
    paddingRight = padding,
    paddingBottom = padding,
    paddingLeft = padding,
    margin,
    marginTop = margin,
    marginRight = margin,
    marginBottom = margin,
    marginLeft = margin,
    overflow = 'hidden',
    display,
    flexDirection,
    flex,
    flexBasis,
    shapeProps: shapeprops,
    ...props
}: ShapeProps) => {
    const pathId = `path-${md5(path)}`;

    const unscaledPath: typeof svgpath = svgpath(path)
        .unshort()
        .unarc()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .abs();
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    unscaledPath.iterate(
        (_segment: unknown, i: number, x: number, y: number) => {
            if (i > 0) {
                minX = Math.min(minX, x);
                maxX = Math.max(maxX, x);
                minY = Math.min(minY, y);
                maxY = Math.max(maxY, y);
            }
        },
    );
    const spanX = maxX - minX;
    const spanY = maxY - minY;
    const maxDist = Math.max(spanX, spanY);
    const offsetX = -minX + (maxDist - spanX) / 2;
    const offsetY = -minY + (maxDist - spanY) / 2;

    const svgPath = unscaledPath
        .translate(offsetX, offsetY)
        .scale(1 / maxDist, 1 / maxDist);
    let width = w;
    let height = h;
    if (typeof width === 'undefined' && typeof height === 'undefined') {
        height = '1em';
        width = `${(1 * spanX) / spanY}em`;
    } else if (typeof width !== 'undefined' && typeof height === 'undefined') {
        height = `calc(${width} * ${spanY / spanX})`;
    } else if (typeof height !== 'undefined' && typeof width === 'undefined') {
        width = `calc(${height} * ${spanX / spanY})`;
    }

    const ref = useRef<HTMLElement>(null);
    const [contentSize, setContentSize] = React.useState<ContentSize>({
        width,
        height,
    } as ContentSize);
    React.useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const currentWidth = parseFloat(style.width);
            const currentHeight = parseFloat(style.height);
            let newSize: number | null = null;
            if (spanX < spanY) {
                newSize = (currentHeight * spanX) / spanY;
            } else if (spanX > spanY) {
                newSize = (currentWidth * spanY) / spanX;
            }
            if (newSize !== null) {
                setContentSize({
                    width: `${newSize}px`,
                    height: `${newSize}px`,
                });
            }
        }
    }, [ref, ref.current]);

    const bg = {
        background,
        backgroundImage,
        backgroundSize,
        backgroundColor,
        backgroundPosition,
        backgroundAttachment,
        backgroundRepeat,
    };
    const b = {
        border,
        borderTop,
        borderLeft,
        borderRight,
        borderBottom,
    };
    const p = {
        padding,
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingBottom,
    };
    const m = {
        margin,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
    };

    const parentProps = {
        position: 'relative' as 'relative',
        display: 'inline-block',
        width,
        height,
        top,
        left,
        right,
        bottom,
        ...m,
    };
    const wrapperProps = {
        background: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: `translateX(-50%) translateY(-50%)`,
        color,
        zIndex: 3,
        margin: 'auto',
        opacity: props.opacity as number | undefined,
        ...props,
        style: {
            ...contentSize,
            clipPath: overflow !== 'visible' ? `url(#${pathId})` : undefined,
        },
    };
    const shapeProps = {
        position: 'absolute' as 'absolute',
        transformOrigin: '50% 50%',
        transform: 'translateX(-50%) translateY(-50%)',
        top: '50%',
        left: '50%',
        height: '100%',
        width: '100%',
        zIndex: 2,
        ...bg,
        ...shapeprops,
        style: {
            ...(shapeprops?.style || {}),
            clipPath: `url(#${pathId})`,
        },
    };
    const contentProps = {
        ...p,
        fontSize: '.5em',
        boxSizing: 'content-box' as 'content-box',
        justifyContent: 'center',
        alignItems: 'center',
        display,
        flexDirection,
        flex,
        flexBasis,
    };
    const borderProps = {
        position: 'absolute' as 'absolute',
        transformOrigin: '50% 50%',
        transform: 'translateX(-50%) translateY(-50%)',
        top: '50%',
        left: '50%',
        path: svgPath,
        ...b,
        ...contentSize,
    };

    return (
        <Flex ref={ref} {...parentProps}>
            <OncePerPage id={pathId}>
                <svg>
                    <clipPath id={pathId} clipPathUnits="objectBoundingBox">
                        <path d={svgPath.toString()} />
                    </clipPath>
                </svg>
            </OncePerPage>
            <Flex position="relative" margin="auto" height="100%" width="100%">
                <Flex {...wrapperProps}>
                    <Flex {...contentProps}>{children}</Flex>
                </Flex>
                <SVGShadow shadow={boxShadow} {...contentSize}>
                    <Flex {...shapeProps} />
                </SVGShadow>
                <SVGBorder {...borderProps} />
            </Flex>
        </Flex>
    );
};
