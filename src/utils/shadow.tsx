import Box from '@chakra-ui/core/dist/Box';
import md5 from 'md5';
import React from 'react';
import { OncePerPage } from './once-per-page';
import { splitCommas, splitSpaces } from './split';
import { useRef } from './use-ref';

type Shadow = {
    type: 'inset' | '';
    xOffset: string;
    yOffset: string;
    blur: string;
    spread: string;
    color: string;
};
export const forEach = (
    shadowString = '',
    callback: (shadow: Shadow, i: number) => unknown,
): void => {
    splitCommas(shadowString).forEach((shadow: string, i: number) => {
        if (shadow === 'none' || shadow === '') {
            return;
        }
        let xOffset = '0px';
        let yOffset = '0px';
        let blur = '0px';
        let spread = '0px';
        let color = 'black';
        const shadowParts = splitSpaces(shadow);
        if (shadowParts[0] === 'inset') {
            let typ;
            switch (shadowParts.length) {
                case 6:
                    [typ, xOffset, yOffset, blur, spread, color] = shadowParts;
                    break;
                case 5:
                    [typ, xOffset, yOffset, blur, color] = shadowParts;
                    break;
                default:
                case 4:
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    [typ, xOffset, yOffset, color] = shadowParts;
                    break;
            }
            callback(
                {
                    type: 'inset',
                    xOffset,
                    yOffset,
                    blur,
                    spread,
                    color,
                },
                i,
            );
        } else {
            switch (shadowParts.length) {
                case 5:
                    [xOffset, yOffset, blur, spread, color] = shadowParts;
                    break;
                case 4:
                    [xOffset, yOffset, blur, color] = shadowParts;
                    break;
                default:
                case 3:
                    [xOffset, yOffset, color] = shadowParts;
                    break;
            }
            callback(
                {
                    type: '',
                    xOffset,
                    yOffset,
                    blur,
                    spread,
                    color,
                },
                i,
            );
        }
    });
};
export const map = (
    shadowString = '',
    callback: (shadow: Shadow, i: number) => unknown,
): unknown[] => {
    const results: unknown[] = [];
    forEach(shadowString, (shadow: Shadow, i: number) => {
        results.push(callback(shadow, i));
    });
    return results;
};
export const mapString = (
    shadowString = '',
    callback: (shadow: Shadow) => unknown,
): string => {
    return map(shadowString, callback).join(', ');
};

export const inset = (shadow = ''): string => {
    return splitCommas(shadow)
        .filter((s: string) => s.indexOf('inset') >= 0)
        .join(', ');
};
export const outset = (shadow = ''): string => {
    return splitCommas(shadow)
        .filter((s: string) => s.indexOf('inset') < 0)
        .join(', ');
};
export type WithFiltersProps = {
    shadow?: string | null;
    children: React.ReactNode;
    width?: string;
    height?: string;
};
export const WithShadowFilters: React.FC<WithFiltersProps> = ({
    children,
    shadow: shadowString,
    ...props
}: WithFiltersProps) => {
    const ref = useRef<HTMLElement>(null);

    const filter = React.useMemo(() => {
        return `url(#filter-${md5(shadowString || '')})`;
    }, [shadowString]);

    const SVG = React.useMemo(() => {
        if (!ref.current || !shadowString) {
            return null;
        }
        const elem = document.createElement('div');
        elem.style.position = 'fixed';
        elem.style.top = '-1000em';
        ref.current.appendChild(elem);
        const parseUnits = (str: string) => {
            elem.style.left = str;
            return parseFloat(window.getComputedStyle(elem).left);
        };
        const id = `filter-${md5(shadowString || '')}`;
        if (document.querySelectorAll(`#${id}`).length > 1) {
            return null;
        }
        const filters = map(shadowString, (shadow: Shadow, i) => {
            const dx = parseUnits(shadow.xOffset);
            const dy = parseUnits(shadow.yOffset);
            const std = parseUnits(shadow.blur) / 2;
            let spread = parseUnits(shadow.spread);
            let operator = 'dilate';
            if (spread < 0) {
                operator = 'erode';
                spread = -spread;
            }

            if (shadow.type !== 'inset') {
                return (
                    <React.Fragment key={i}>
                        <feFlood
                            floodColor={shadow.color}
                            result={`flooded-${i}`}
                        />
                        <feMorphology
                            operator={operator}
                            radius={spread}
                            in="SourceAlpha"
                            result={`dilated-${i}`}
                        />
                        <feOffset
                            in={`dilated-${i}`}
                            dx={dx}
                            dy={dy}
                            result={`offset-${i}`}
                        />
                        <feGaussianBlur
                            stdDeviation={std}
                            in={`offset-${i}`}
                            result={`blurred-${i}`}
                        />
                        <feComposite
                            operator="in"
                            in={`flooded-${i}`}
                            in2={`blurred-${i}`}
                            result={`shadow-${i}`}
                        />
                        <feMerge result={`filter-${i}`}>
                            <feMergeNode in={`shadow-${i}`} />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </React.Fragment>
                );
            }
            return (
                <React.Fragment key={i}>
                    <feFlood floodColor={shadow.color} result={`color-${i}`} />
                    <feComposite
                        operator="out"
                        in={`color-${i}`}
                        in2="SourceGraphic"
                        result={`inverse-${i}`}
                    />
                    <feMorphology
                        operator={operator}
                        radius={spread}
                        in={`filter-${i}`}
                        result={`dilated-${i}`}
                    />
                    <feOffset
                        in={`dilated-${i}`}
                        dx={dx}
                        dy={dy}
                        result={`offsetted-${i}`}
                    />
                    <feGaussianBlur
                        in={`offsetted-${i}`}
                        stdDeviation={std}
                        result={`blurred-${i}`}
                    />
                    <feComposite
                        operator="in"
                        in2="SourceGraphic"
                        in={`blurred-${i}`}
                        result={`shadow-${i}`}
                    />
                    <feComposite
                        operator="atop"
                        in2="SourceGraphic"
                        in={`shadow-${i}`}
                        result={`filter-${i}`}
                    />
                </React.Fragment>
            );
        });
        if (filters.length === 0) {
            return null;
        }
        const merge = map(shadowString, (_shadow: Shadow, i: number) => {
            return <feMergeNode key={i} in={`filter-${i}`} />;
        }).reverse();
        ref.current.removeChild(elem);
        return (
            <svg
                style={{ overflow: 'hidden', height: 0, width: 0, opacity: 0 }}
            >
                <defs>
                    <filter
                        id={id}
                        key={id}
                        colorInterpolationFilters="sRGB"
                        x="-100%"
                        y="-100%"
                        width="300%"
                        height="300%"
                    >
                        {filters}
                        <feMerge>{merge}</feMerge>
                    </filter>
                </defs>
            </svg>
        );
    }, [ref, shadowString]);

    return (
        <Box
            ref={ref}
            style={{ filter: SVG ? filter : undefined }}
            position="absolute"
            transform="translateX(-50%) translateY(-50%)"
            top="50%"
            left="50%"
            zIndex={1}
            {...props}
        >
            {children}
            <OncePerPage>{SVG}</OncePerPage>
        </Box>
    );
};
