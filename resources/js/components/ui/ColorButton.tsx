import React from 'react';
import Check from "../svg/Check";
import {Button, ButtonProps} from "./Button";
import clsx from "clsx";

type ButtonColors = 'default' | 'primary' | 'secondary' | 'danger';

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    default: ({enabled, outline}) => `${outline ? 'text-gray-500 border-2 border-gray-500' : 'bg-gray-500 hover:bg-gray-600 text-white'}`,
    primary: ({enabled, outline}) => 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: ({enabled, outline}) => 'bg-secondary-500 hover:bg-secondary-600 text-white',
    danger: ({enabled, outline}) => `${outline ? 'text-red-500 border-2 border-red-500' : 'bg-red-500 hover:bg-red-600 text-white'}`
};

type ColorButtonProps = ButtonProps & {
    selected?: boolean;
    color: ButtonColors
}

export const ColorButton: React.FC<ColorButtonProps> = ({selected, color, ...props}) => {
    return <Button className="w-24 h-24" {...props}>
        <div className="flex items-center justify-center">
            <div
                className={clsx(
                    classes[color],
                    "w-10 h-10"
                )}
            >
                {selected && <Check/>}
            </div>
        </div>
    </Button>
};
