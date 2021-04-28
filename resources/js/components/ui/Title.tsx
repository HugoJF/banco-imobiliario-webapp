import React from 'react';
import clsx from "clsx";

type Props = {
    className?: string;
    sub?: boolean;
    subsub?: boolean;
}

export const Title: React.FC<Props> = ({className = '', sub = false, subsub, children}) => {
    return <h1
        className={clsx('tracking-tighter', className, {
            'text-4xl text-gray-900 font-black': !sub && !subsub,
            'text-2xl text-gray-800 font-black': sub,
            'text-lg text-gray-700 font-medium': subsub,
        })}
    >
        {children}
    </h1>
};
