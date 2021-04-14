import React from 'react';
import clsx from "clsx";

type Props = {
    sub?: boolean;
}

export const Title: React.FC<Props> = ({sub = false, children}) => {
    return <h1 className={clsx('tracking-tighter font-black', {
        'text-2xl text-gray-800': sub,
        'text-4xl text-gray-900': !sub,
    })}>
        {children}
    </h1>
};
