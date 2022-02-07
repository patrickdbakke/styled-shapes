import React from 'react';
import { render } from 'react-dom';

export const addToPageOnce = (
    ident: string,
    content: React.ReactElement | null,
    root = document.body,
) => {
    if (!content) {
        return;
    }
    console.log(ident)
    const id = `once-${ident}`;
    if (document.querySelectorAll(`#${id}`).length < 1) {
        const div = document.createElement('div');
        div.setAttribute('id', id);
        root.appendChild(div);
        render(content, div);
    }
};
export type OncePerPageProps = {
    id: string,
    children: React.ReactElement | null;
    root?: HTMLElement;
};
export const OncePerPage: React.FC<OncePerPageProps> = ({
    id,
    root = document.body,
    children,
}: OncePerPageProps) => {
    React.useEffect(() => {
        setTimeout(() => {
            addToPageOnce(id, children, root);
        });
    }, []);
    return null;
};
