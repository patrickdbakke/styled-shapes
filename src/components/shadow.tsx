import Box from '@chakra-ui/core/dist/Box';
import md5 from 'md5';
import React from 'react';
import { OncePerPage } from './once-per-page';
import { useRef } from '../hooks/use-ref';
import { ShadowType, parseShadow } from '../utils/parse-shadow';

export type SVGShadowProps = {
    shadow?: string | null;
    children: React.ReactNode;
    width?: string;
    height?: string;
};
export const SVGShadow: React.FC<SVGShadowProps> = ({
    children,
    shadow: shadowString,
    ...props
}: SVGShadowProps) => {
    const ref = useRef<HTMLElement>(null);

    const filter = React.useMemo(() => {
        return `url(#filter-${md5(shadowString || '')})`;
    }, [shadowString]);

    const SVG = React.useMemo(() => {
        if (!ref.current || !shadowString) {
            return null;
        }
        const id = `filter-${md5(shadowString || '')}`;
        if (document.querySelectorAll(`#${id}`).length > 1) {
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
        const merge: React.ReactNode[] = [];
        const filters = parseShadow(shadowString).map(
            (shadow: ShadowType, i) => {
                const dx = parseUnits(shadow.xOffset);
                const dy = parseUnits(shadow.yOffset);
                const std = parseUnits(shadow.blur) / 2;
                let spread = parseUnits(shadow.spread);
                let operator = 'dilate';
                if (spread < 0) {
                    operator = 'erode';
                    spread = -spread;
                }

                merge.unshift(
                    <feMergeNode key={shadow.string} in={`filter-${i}`} />,
                );
                if (shadow.type !== 'inset') {
                    return (
                        <React.Fragment key={shadow.string}>
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
                    <React.Fragment key={shadow.string}>
                        <feFlood
                            floodColor={shadow.color}
                            result={`color-${i}`}
                        />
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
            },
        );
        ref.current.removeChild(elem);

        if (filters.length === 0) {
            return null;
        }

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
