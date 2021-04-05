import React from 'react';


export const Title: React.FC = ({children}) => {
    return <h1 className="text-4xl font-black tracking-tighter">
        {children}
    </h1>
};
