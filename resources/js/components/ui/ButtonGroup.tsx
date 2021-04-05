import React from 'react';

export const ButtonGroup: React.FC = ({children}) => {
    return <div className="grid grid-cols-1 gap-2">
        {children}
    </div>
};
