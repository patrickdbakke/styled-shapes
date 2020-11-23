export const split = (str = '', splitChar = ','): string[] => {
    const string = str || 'none';
    let nesting = 0;
    let part = '';
    const parts = [];
    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (char === splitChar && nesting === 0) {
            parts.push(part.trim());
            part = '';
            continue;
        }
        if (char === '(') {
            nesting++;
        }
        if (char === ')') {
            nesting--;
        }
        part += char;
    }
    if (part.trim().length > 0) {
        parts.push(part.trim());
    }
    return parts;
};
export const splitCommas = (str = ''): string[] => split(str, ',');
export const splitSpaces = (str = ''): string[] => split(str, ' ');
