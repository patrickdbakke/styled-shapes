import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import md5 from 'md5';

export const addToPageOnce = (
    content: React.ReactElement | null,
    root = document.body,
) => {
    if (!content) {
        return;
    }
    // todo: there's probs a more performant way of checking uniqueness without a prop
    const id = `once-${md5(renderToString(content))}`;
    if (document.querySelectorAll(`#${id}`).length < 1) {
        const div = document.createElement('div');
        div.setAttribute('id', id);
        root.appendChild(div);
        render(content, div);
    }
};
export type OncePerPageProps = {
    children: React.ReactElement | null;
    root?: HTMLElement;
};
export const OncePerPage: React.FC<OncePerPageProps> = ({
    root = document.body,
    children,
}: OncePerPageProps) => {
    React.useEffect(() => {
        setTimeout(() => {
            addToPageOnce(children, root);
        });
    });
    return null;
};
