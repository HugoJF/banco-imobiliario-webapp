import React from 'react';

// We need the entire class name here so PurgeCSS can look them up and keep in the final purged file.
// So I cannot use a template to only replace the color name!
const bgColorBase = {
    red: 'bg-red-600',
    green: 'bg-green-600',
};
const bgColorBaseHover = {
    red: 'hover:bg-red-700',
    green: 'hover:bg-green-700',
};

export default function Button({color, children, ...rest}) {
    const backgroundColor = bgColorBase[color];
    const backgroundColorHover = bgColorBaseHover[color];

    return <button {...rest} className={`
        mr-2 px-5 py-4
        font-bold text-white
        ${backgroundColor} ${backgroundColorHover}
        cursor-pointer rounded-lg
    `}>{children}</button>
}
