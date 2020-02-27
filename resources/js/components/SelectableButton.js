import React from 'react';
import Check from "./svg/Check";

export default function ({color, onSelect, selected, hoverable = true, className, children}) {
    let textColor = `text-${color}-900`;
    let backgroundColor = `bg-${color}-600`;
    let border = selected ? 'border-2 border-b-0' : '';
    let borderColor = selected ? `border-${color}-800` : '';
    let shadow = selected ? 'shadow-underline' : 'shadow-underline-none';
    let translate = selected ? '-translate-y-10px' : '';
    let hover = selected || !hoverable ? '' : 'hover:-translate-y-1 hover:shadow';

    return <div
        onClick={onSelect}
        className={`
            ${className} transform flex items-center justify-center box-border
            transition-all duration-150 ease-out
            ${textColor} ${backgroundColor} ${border} ${borderColor} cursor-pointer rounded-lg ${shadow} ${translate}
            ${hover}`}
    >
        {children}
    </div>
}
