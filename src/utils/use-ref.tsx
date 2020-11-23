import React from 'react';

export type RefType<T> = {
    (): () => void;
    current: T | null;
};
export const useRef = <T extends unknown>(defaultValue: T | null) => {
    const [ref, setRef] = React.useState<T | null>(defaultValue);
    const onRefChange = React.useCallback(
        (node: T | null): void => {
            if (ref !== node) {
                setRef(node);
            }
        },
        [ref],
    ) as RefType<T>;
    onRefChange.current = ref;
    return onRefChange;
};
