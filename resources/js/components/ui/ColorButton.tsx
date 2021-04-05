import React from 'react';
import Check from "../svg/Check";
import {Button, ButtonProps} from "./Button";
import clsx from "clsx";

type ButtonColors = 'primary' | 'secondary';

const classes: { [id in ButtonColors]: (params: ButtonProps) => string } = {
    primary: () => 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: () => 'bg-secondary-500 hover:bg-secondary-600 text-white',
};

type ColorButtonProps = ButtonProps & {
    selected?: boolean;
    color: ButtonColors
}

export const ColorButton: React.FC<ColorButtonProps> = ({selected, color, ...props}) => {
    return <Button className="w-24 h-24">
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
