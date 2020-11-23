import Flex, { FlexProps } from '@chakra-ui/core/dist/Flex';
import md5 from 'md5';
import React from 'react';
import svgpath from 'svgpath';
import { SVGBorder } from './utils/border';
import { WithShadowFilters } from './utils/shadow';
import { useRef } from './utils/use-ref';

const ns = 'http://www.w3.org/2000/svg';
const svgRoot = document.createElementNS(ns, 'svg');
svgRoot.setAttribute('id', 'shapes-path-root');
const defs = document.createElementNS(ns, 'defs');
svgRoot.appendChild(defs);
document.body.appendChild(svgRoot);

export type ShapeProps = FlexProps &
    React.DOMAttributes<HTMLDivElement> & {
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
    };

type ContentSize = {
    width?: string;
    height?: string;
    marginTop?: string;
    marginLeft?: string;
};
export type NamedShapeProps = Omit<ShapeProps, 'path'>;
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
    overflow = 'visible',
    display,
    flexDirection,
    flex,
    flexBasis,
    shapeProps,
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
    unscaledPath.iterate((_segment, _i, x, y) => {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    });
    const spanX = maxX - minX;
    const spanY = maxY - minY;
    const maxDist = Math.max(spanX, spanY);
    const svgPath = unscaledPath.scale(1 / maxDist);
    let width = w;
    let height = h;
    if (typeof width === 'undefined' && typeof height === 'undefined') {
        width = '1em';
        height = '1em';
    } else if (typeof width !== 'undefined' && typeof height === 'undefined') {
        height = `calc(${width} * ${spanY / spanX})`;
    } else if (typeof height !== 'undefined' && typeof width === 'undefined') {
        width = `calc(${height} * ${spanX / spanY})`;
    }
    const [contentSize, setContentSize] = React.useState<ContentSize>({
        width,
        height,
    } as ContentSize);
    const ref = useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (ref.current) {
            const style = window.getComputedStyle(ref.current);
            const currentWidth = parseFloat(style.width);
            const currentHeight = parseFloat(style.height);
            if (currentWidth / currentHeight > spanX / spanY) {
                const newWidth = (currentHeight * spanX) / spanY;
                setContentSize({
                    height: contentSize.height,
                    width: `${newWidth}px`,
                });
            } else if (currentWidth / currentHeight < spanX / spanY) {
                const newHeight = (currentWidth * spanY) / spanX;
                setContentSize({
                    height: `${newHeight}px`,
                    width: contentSize.width,
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
    const shapeprops = {
        zIndex: 2,
        ...bg,
        ...shapeProps,
        transform: `translateX(-50%) translateY(-50%)`,
        style: {
            ...contentSize,
            ...(shapeProps?.style || {}),
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

    if (document.querySelectorAll(`#${pathId}`).length < 1) {
        const clipPath = document.createElementNS(ns, 'clipPath');
        clipPath.setAttribute('id', pathId);
        clipPath.setAttribute('clipPathUnits', 'objectBoundingBox');
        const pathElement = document.createElementNS(ns, 'path');
        pathElement.setAttribute('d', svgPath.toString());
        clipPath.appendChild(pathElement);
        defs.appendChild(clipPath);
    }

    return (
        <Flex ref={ref} {...parentProps}>
            <Flex position="relative" margin="auto" height="100%" width="100%">
                <Flex {...wrapperProps}>
                    <Flex {...contentProps}>{children}</Flex>
                </Flex>
                {contentSize.width && contentSize.height && (
                    <>
                        <WithShadowFilters shadow={boxShadow} {...contentSize}>
                            <Flex
                                position="absolute"
                                transformOrigin="50% 50%"
                                top="50%"
                                left="50%"
                                {...shapeprops}
                            />
                        </WithShadowFilters>
                        <SVGBorder path={svgPath} {...b} {...contentSize} />
                    </>
                )}
            </Flex>
        </Flex>
    );
};
