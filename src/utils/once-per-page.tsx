import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import md5 from 'md5';

type OncePerPageProps = {
    children: React.ReactElement | null;
    root?: HTMLElement;
};

export const addToPageOnce = (
    content: React.ReactElement | null,
    root = document.body,
) => {
    if (!content) {
        return;
    }
    const id = `once-${md5(ReactDOMServer.renderToString(content))}`;
    const shouldAdd = document.querySelectorAll(`#${id}`).length < 1;
    if (shouldAdd) {
        const div = document.createElement('div');
        div.setAttribute('id', id);
        root.appendChild(div);
        ReactDOM.render(content, div);
    }
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
