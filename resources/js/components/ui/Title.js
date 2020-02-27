import React from 'react';

export default function Title({children}) {
    const dashes = () => <div className="flex-grow-1 border-b border-grey-100 border-dashed"/>;

    return <>
        <div className="flex items-center w-full my-4">
            {children && <>
                {dashes()}
                <h2 className="flex-grow-0 mx-2 font-medium text-gray-700 text-2xl tracking-wide uppercase">{children}</h2>
            </>}
            {dashes()}
        </div>
    </>
}
