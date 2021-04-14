import React from 'react';

export const Error: React.FC = ({children}) => {
    return <div className="flex items-center px-5 py-4 bg-red-500 space-x-4">
        <div className="flex items-center justify-center w-8 h-8 text-2xl text-red-500 font-bold bg-white rounded-full">!</div>
        <div className="text-white">{children}</div>
    </div>
};
