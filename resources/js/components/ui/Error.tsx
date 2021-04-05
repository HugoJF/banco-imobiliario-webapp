import React from 'react';
import tailwind from "../helpers/tailwind";

const Error = tailwind.div`
    flex justify-center items-center text-sm text-center text-red-600
`;

const Icon = tailwind.div`
    flex mr-2 items-center justify-center h-6 w-6 font-bold text-lg text-white bg-red-600 rounded-full
`;

export default function ({enabled = true, children}) {
    if (!enabled) {
        return null;
    }

    return <Error>
        <Icon>!</Icon>
        {children}
    </Error>
}
