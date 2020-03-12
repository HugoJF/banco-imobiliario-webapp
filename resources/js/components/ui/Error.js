import React from 'react';

export default function ({enabled = true, children}) {
    if (!enabled) {
        return null;
    }

    return <div className="flex justify-center items-center text-sm text-center text-red-600">
        <span className="flex mr-2 items-center justify-center h-6 w-6 font-bold text-lg text-white bg-red-600 rounded-full">!</span>
        {children}
    </div>
}
