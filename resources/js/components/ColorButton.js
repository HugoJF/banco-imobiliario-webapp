import React from 'react';
import Check from "./svg/Check";

// We need the entire class name here so PurgeCSS can look them up and keep in the final purged file.
// So I cannot use a template to only replace the color name!
const bgColor = {
    blue: 'bg-blue-600',
    red: 'bg-red-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    gray: 'bg-gray-600',
    purple: 'bg-purple-600',
};
const tColor = {
    blue: 'text-blue-900',
    red: 'text-red-900',
    green: 'text-green-900',
    yellow: 'text-yellow-900',
    gray: 'text-gray-900',
    purple: 'text-purple-900',
};
const bColor = {
    blue: 'border-blue-800',
    red: 'border-red-800',
    green: 'border-green-800',
    yellow: 'border-yellow-800',
    gray: 'border-gray-800',
    purple: 'border-purple-800',
};

export default function ColorButton({color, onSelect, selected}) {
    let textColor = tColor[color];
    let backgroundColor = bgColor[color];
    let border = selected ? 'border-2 border-b-0' : '';
    let borderColor = selected ? bColor[color] : '';
    let shadow = selected ? 'shadow-underline' : 'shadow-underline-none';
    let translate = selected ? '-translate-y-10px' : '';
    let hover = selected ? '' : 'hover:-translate-y-1 hover:shadow';

    return <div
        onClick={onSelect}
        className={`
            transform flex items-center justify-center
            transition-all duration-150 ease-out
            m-4 w-24 h-24 ${textColor} ${backgroundColor} ${border} ${borderColor} cursor-pointer rounded-lg ${shadow} ${translate}
            ${hover}`}
    >
        <div className="w-10 h-10">
            {selected && <Check/>}
        </div>
    </div>
}
