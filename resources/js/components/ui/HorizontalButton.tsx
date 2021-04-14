import React from 'react';
import {ChevronRight, Lock} from "react-feather";
import clsx from "clsx";

export type HorizontalButtonProps = {
    clickable?: boolean;
    onClick?: () => void;
    locked?: boolean;
}

export const HorizontalButton: React.FC<HorizontalButtonProps> = ({clickable = true, onClick, locked = false, children}) => {
    return <div
        onClick={() => !locked && onClick && clickable && onClick()}
        className={clsx(`duration-150 p-4 flex items-center space-x-6 bg-gray-300`, {
            'cursor-pointer hover:shadow': !locked,
            'opacity-25': locked,
        })}
    >
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
