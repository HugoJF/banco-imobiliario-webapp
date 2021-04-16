import React from "react";
import {Triangle, X} from "react-feather";
import {ToastType, ToastTypes} from "../../types/toasts";
import {useDispatch} from "react-redux";
import {Dispatch} from "../../store";
import useTimeout from "use-timeout";
import clsx from "clsx";

export type ToastProps = {
    id: string;
    toast: ToastType;
}

const wrapperClasses: { [id in ToastTypes]: (params: ToastProps) => string } = {
    [ToastTypes.PRIMARY]: () => 'bg-blue-600',
    [ToastTypes.SUCCESS]: () => 'bg-green-600',
    [ToastTypes.ERROR]: () => 'bg-red-600',
    [ToastTypes.WARNING]: () => 'bg-yellow-600',
};

const descriptionClasses: { [id in ToastTypes]: (params: ToastProps) => string } = {
    [ToastTypes.PRIMARY]: () => 'text-blue-100',
    [ToastTypes.SUCCESS]: () => 'text-green-100',
    [ToastTypes.ERROR]: () => 'text-red-100',
    [ToastTypes.WARNING]: () => 'text-yellow-100',
};

export const Toast: React.FC<ToastProps> = (props) => {
    const {id, toast} = props;

    const dispatch = useDispatch<Dispatch>();

    useTimeout(remove, toast.duration);

    function remove() {
        dispatch.toasts.remove(id);
    }

    return <div
        className={clsx(
            'flex items-center justify-between mx-auto px-5 py-4 z-20 shadow-lg',
            wrapperClasses[toast.type](props),
        )}
    >
        {/* Left block */}
        <div className="flex items-center space-x-4">
            <Triangle size={28} strokeWidth={3} className="flex-shrink-0 animate-pulse"/>
            <div className="space-y-2">
                <h2 className="text-lg font-medium">{toast.title}</h2>
                <p
                    className={clsx(
                        'flex items-center text-blue-100 text-sm',
                        descriptionClasses[toast.type](props)
                    )}
                >
                    {toast.description}
                </p>
            </div>
        </div>

        {/* Close button */}
        <X onClick={remove} className="cursor-pointer"/>
    </div>
};
