import React from 'react';
import {IconProps} from "react-feather";

export type StatProps = {
    icon: React.FC<IconProps>;
}

export const Stat: React.FC<StatProps> = ({children, icon: Icon}) => {
    return <div className="flex space-x-2">
        <Icon className="flex-shrink-0" />
        <div>
            {children}
        </div>
    </div>
};
