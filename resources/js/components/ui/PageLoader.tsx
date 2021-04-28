import React from 'react';
import {Loader} from "react-feather";
import clsx from "clsx";

export type UserListProps = {
    loading?: boolean;
    containerClassName?: string;
    wrapperClassName?: string;
}

export const PageLoader: React.FC<UserListProps> = ({loading = false, containerClassName = '', wrapperClassName = '', children}) => {
    return <div className={clsx(containerClassName, 'relative')}>
        <div className={clsx('duration-150 absolute top-0 left-0 w-full flex items-center justify-center z-10', {
            'opacity-0': !loading,
            'h-full opacity-100': loading,
        })}>
            {loading && <Loader className="animate-spin" size={48}/>}
        </div>

        <div
            className={clsx('duration-150 space-y-4', wrapperClassName, {
                'opacity-25': loading,
            })}
        >
            {children}
        </div>
    </div>
};
