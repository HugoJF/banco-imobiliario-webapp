import React from 'react';
import {ChevronRight, Lock} from "react-feather";

export type HorizontalButtonProps = {
    clickable?: boolean;
    locked?: boolean;
}

export const HorizontalButton: React.FC<HorizontalButtonProps> = ({clickable = true, locked = false, children}) => {
    return <div className="duration-150 p-4 flex items-center space-x-6 bg-gray-300 cursor-pointer hover:shadow">
        <div className="flex-grow flex items-center space-x-6">
            {children}
        </div>

        {/* Join button */}
        {clickable && (
            locked
                ?
                <Lock className="flex-shrink-0"/>
                :
                <ChevronRight className="flex-shrink-0"/>
        )}
    </div>
};
