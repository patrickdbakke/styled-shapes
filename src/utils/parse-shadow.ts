import { splitCommas, splitSpaces } from './split';

export type ShadowType = {
    type: 'inset' | '';
    xOffset: string;
    yOffset: string;
    blur: string;
    spread: string;
    color: string;
    string: string;
};
export const parseShadow = (shadowString = ''): ShadowType[] => {
    return splitCommas(shadowString)
        .map((shadow: string): ShadowType | null => {
            if (shadow === 'none' || shadow === '') {
                return null;
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
                        [
                            typ,
                            xOffset,
                            yOffset,
                            blur,
                            spread,
                            color,
                        ] = shadowParts;
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
                return {
                    type: 'inset',
                    xOffset,
                    yOffset,
                    blur,
                    spread,
                    color,
                    string: shadow,
                };
            }
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
            return {
                type: '',
                xOffset,
                yOffset,
                blur,
                spread,
                color,
                string: shadow,
            };
        })
        .filter(Boolean) as ShadowType[];
};
