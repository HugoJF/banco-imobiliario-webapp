import React from 'react';
import {ChevronRight, Loader, Lock} from "react-feather";
import clsx from "clsx";

export type HorizontalButtonProps = {
    clickable?: boolean;
    onClick?: () => void;
    locked?: boolean;
    loading?: boolean;
}

export const HorizontalButton: React.FC<HorizontalButtonProps> = ({clickable = true, onClick, locked = false, loading = false, children}) => {
    return <div
        onClick={() => !locked && onClick && clickable && onClick()}
        className={clsx(`duration-150 p-4 relative flex items-center space-x-6 bg-gray-300`, {
            'cursor-pointer hover:shadow': !locked,
            'opacity-25': locked || loading,
        })}
    >
        {loading && <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full">
            <Loader size={48} className="animate-spin opacity-100"/>
        </div>}

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
