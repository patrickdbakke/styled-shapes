export type Point = { x: number; y: number };
export const polygon = (n: number, offsetAngle = 0): string => {
    let str = 'M';
    for (let i = 0; i < n; i++) {
        const angle = offsetAngle + Math.PI + (-1 * 2.0 * Math.PI * i) / n;
        const x = 0.5 * Math.sin(angle) + 0.5;
        const y = 0.5 * Math.cos(angle) + 0.5;
        str += ` ${x},${y}`;
    }
    str += ' Z';
    return str;
};

export const triangle = polygon(3);
export const square = `M 0,0 1,0, 1,1, 0,1 Z`;
export const diamond = `M .5,0 1,.5, .5,1, 0,.5 Z`;
export const pentagon = polygon(5);
export const hexagon = polygon(6, Math.PI / 6);
export const heptagon = polygon(7);
export const octagon = polygon(8, Math.PI / 8);
export const nonagon = polygon(9);
export const decagon = polygon(12);
export const circle = polygon(100);
export const trapezoid = `M0.25 0.2113248654051872L0.75 0.2113248654051872 1 0.7886751345948129 0 0.7886751345948129Z`;

// don't care about whitespace for these long strings
// prettier-ignore
export const plus = 'M 31.8532,29.8741 31.8532,12.521 42.1488,12.521 42.1488,29.8805 42.1967,29.8806 46.2484,29.8832 59.6052,29.8832 59.6052,40.1789 46.2562,40.1789 42.1493,40.1762 42.1488,40.206 42.1488,58.8513 31.8532,58.8513 31.8532,40.1694 31.7534,40.1693 27.9357,40.1667 14,40.1667 14,29.8711 27.9331,29.8711 31.7687,29.8737 Z';
// prettier-ignore
export const heart = 'M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z';
// prettier-ignore
export const moon = 'M313.283,275.341c-17.198,5.692-35.086,8.574-53.197,8.574c-93.377,0-169.347-75.96-169.347-169.353 c0-37.692,12.157-73.397,35.155-103.234c1.057-1.381,1.087-3.273,0.09-4.69c-1-1.398-2.795-2.011-4.443-1.453 C48.834,29.223,0,96.842,0,173.428C0,271.144,79.498,350.66,177.217,350.66c55.374,0,106.558-25.221,140.413-69.176 c1.075-1.375,1.105-3.267,0.108-4.672C316.735,275.395,314.927,274.789,313.283,275.341z';
// prettier-ignore
export const star = 'm25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z';
// prettier-ignore
export const egg = 'M3170 6659 c-585 -60 -1143 -473 -1582 -1172 -100 -160 -274 -504 -341 -677 -395 -1013 -421 -2054 -70 -2860 217 -501 537 -871 975 -1131 239 -142 477 -229 767 -280 145 -26 451 -36 604 -20 917 93 1661 711 1976 1639 70 204 117 420 146 667 23 189 23 566 1 778 -55 522 -198 1032 -419 1491 -190 394 -392 689 -656 960 -363 371 -735 566 -1158 606 -119 11 -122 11 -243 -1z';
// prettier-ignore
export const rainbow = 'M 0 .75 A .5 .75 0 0 1 1 .75 L .75 .75 A .2 .3 0 1 0 .25 .75';
