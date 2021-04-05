import React from "react";
import {IconProps, Loader} from "react-feather";
import clsx from 'clsx';

type ButtonColors = 'default' | 'primary';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    className?: string;
    icon?: React.FC<IconProps>;
    enabled?: boolean;
    color?: ButtonColors;
    loading?: boolean;
}

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    primary: () => 'bg-gray-800 hover:bg-gray-900 text-gray-100',
    default: () => 'bg-gray-200 hover:bg-gray-300 text-gray-900',
};

export const Button: React.FC<ButtonProps> = (props) => {
    const {enabled = true, loading = false, color = 'primary', icon: Icon, className, children, ...rest} = props;

    return <button
        disabled={!enabled}
        {...rest}
        className={clsx(
            className,
            classes[color](props),
            'flex justify-center transition-all duration-150 py-3 px-4 text-center border-box', {
                'cursor-not-allowed opacity-50': !enabled
            }
        )}
    >
        {loading ?
            <Loader size={30} className="animate-spin mx-auto block"/>
            :
            <>
                {Icon && <Icon size={20}/>}
                {children}
            </>
        }
    </button>
};
